import pandas as pd
import numpy as np



def categories(df):
    ret = {}
    for column_name in df.columns:
            if 'Category' in column_name:
                unique_vals = df[column_name].dropna().unique()
                ret[column_name] = unique_vals.tolist()

    return ret


def full_text(df, keywords, file_name):
    ret = {}
    price_column = ''
    quantity_column = ''
    y = 0

    summary = {}
    for column_name in df.columns:
        if price_column and quantity_column:
            break
        if 'Price' in column_name or 'Total' in column_name and not price_column:
            price_column = column_name
        elif 'Quantity' in column_name:
            quantity_column = column_name
        
    # make a string copy of df
    str_df = df.astype(str)
    for keyword in keywords:
        
        # searching through the entire doc to find keyword and returning rows with keyword
        mask = np.column_stack([str_df[col].str.contains(keyword, na=False) for col in str_df])
        filtered_rows = str_df[mask.any(axis=1)]
        # changing column type from str to float to sum values

        filtered_rows[price_column] = filtered_rows[price_column].astype(float)
        netPrice = filtered_rows[price_column].sum()
        
        filtered_rows[quantity_column] = filtered_rows[quantity_column].astype(float)
        quant = filtered_rows[quantity_column].sum()
        #print(quant)

    
        # adding entries to the results
        x = {}
        x ['Quantity Sold'] = int(quant)
        x[price_column] = netPrice
        x["Number of Orders"] = len(filtered_rows)
        x[f'{price_column} Average'] = format(netPrice / quant, '.2f')

        summary[keyword] = x
    y += 1
    ret[file_name] = summary

    return ret



