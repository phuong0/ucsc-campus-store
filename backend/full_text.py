import pandas as pd
import numpy as np

df = pd.read_csv('UCSC Amazon purchase data Calendar 2023.csv')
df2 = pd.read_excel('CruzBuyCY23 Tangible Goods.xlsx')

files = [df, df2]
# keyword given by the user
specified_keywords = ['beauty', 'Beauty']

def full_text(files, keywords):
    ret = {}
    price_column = ''
    y = 0
    # loop through multiple files
    for df in files:
        summary = {}
        # finding the total prices not individual prices
        for column_name in df.columns:
            if ('Price' in column_name and 'Unit' not in column_name) or 'Total' in column_name:
                price_column = column_name
                break

        # make a string copy of df
        str_df = df.astype(str)

        for keyword in keywords:
            # searching through the entire doc to find keyword and returning rows with keyword
            mask = np.column_stack([str_df[col].str.contains(keyword, na=False) for col in str_df])
            filtered_rows = str_df[mask.any(axis=1)]

            # changing column type from str to float to sum values
            filtered_rows[price_column] = filtered_rows[price_column].astype(float)
            netPrice = filtered_rows[price_column].sum()

            # adding entries to the results
            x = {}
            x[price_column] = netPrice
            x["Count"] = len(filtered_rows)
            summary[keyword] = x
        y += 1
        ret[f"file{y}"] = summary
    return ret


answer = (full_text(files, specified_keywords))
for key, value in answer.items():
    print(f"{key}: {value}")
