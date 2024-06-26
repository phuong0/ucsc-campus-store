import pandas as pd
import numpy as np
import gensim
import os

cwd = os.getcwd()

# Combine the current working directory with the relative file path
model_path = os.path.join(cwd, 'GoogleNews-vectors-negative300.bin')

print(f"Absolute path of the model: {model_path}")

if os.path.exists(model_path):
        model = gensim.models.KeyedVectors.load_word2vec_format(model_path, binary=True)
        print("Model loaded successfully.")
else:
        print("Model file not found.")

def categories(df):
    ret = {}
    for column_name in df.columns:
            if 'Category' in column_name:
                unique_vals = df[column_name].dropna().unique()
                ret[column_name] = unique_vals.tolist()

    return ret

def full_textSummary(files, keywords):
    ret = {}
    price_column = ''
    quantity_column = ''
    y = 0
    rows = pd.DataFrame()
    for df in files:
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
            new_row = pd.DataFrame(filtered_rows)
            rows = pd.concat([rows, new_row])

            # changing column type from str to float to sum values
            filtered_rows[price_column] = filtered_rows[price_column].astype(float)
            netPrice = filtered_rows[price_column].sum()
            
            filtered_rows[quantity_column] = filtered_rows[quantity_column].astype(float)
            quant = filtered_rows[quantity_column].sum()
        
            # adding entries to the results
            x = {}
            x ['Quantity Sold'] = int(quant)
            x[price_column] = netPrice
            x["Number of Orders"] = len(filtered_rows)
            x[f'{price_column} Average'] = format(netPrice / quant, '.2f')

            summary[keyword] = x
        y += 1
        ret[f"file{y}"] = summary
    return ret


def full_text(files, keywords, output_file):
    ret = {}
    price_column = ''
    quantity_column = ''
    y = 0
    rows = pd.DataFrame()
    for df in files:
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
            new_row = pd.DataFrame(filtered_rows)
            rows = pd.concat([rows, new_row])

            # changing column type from str to float to sum values
            filtered_rows[price_column] = filtered_rows[price_column].astype(float)
            netPrice = filtered_rows[price_column].sum()
            
            filtered_rows[quantity_column] = filtered_rows[quantity_column].astype(float)
            quant = filtered_rows[quantity_column].sum()
        
            # adding entries to the results
            x = {}
            x ['Quantity Sold'] = int(quant)
            x[price_column] = netPrice
            x["Number of Orders"] = len(filtered_rows)
            x[f'{price_column} Average'] = format(netPrice / quant, '.2f')

            summary[keyword] = x
        y += 1
        ret[f"file{y}"] = summary

    summaries = pd.DataFrame(ret)
    rows = pd.concat([summaries, rows])
    rows.to_excel(output_file, index=False)
    return ret

def similarity(keyword, words, model):
    # Compute maximum similarity for keyword against all words in the entry
    max_sim = 0
    if keyword in model.key_to_index:
        for word in words:
            if word in model.key_to_index:
                max_sim = max(max_sim, model.similarity(keyword, word))
    # print(max_sim)
    return max_sim

 
def word2vec_Summary(files, keywords):
    ret = {}
    summary = {}
    price_column = ''
    quantity_column = ''
    y = 0 
    rows = pd.DataFrame()
    # print('we are in the summary')
    # Identify specific columns
    for df in files:
        for column_name in df.columns:
            if 'Price' in column_name or 'Total' in column_name and not price_column:
                price_column = column_name
            elif 'Quantity' in column_name and not quantity_column:
                quantity_column = column_name
            if price_column and quantity_column:
                break
    
    # Convert DataFrame to string
        summary = {}
        
        str_df = df.astype(str)
        for keyword in keywords:
            matched_indices = []
            for col in str_df:
                for index, entry in str_df[col].iteritems():
                    words = entry.lower().split()
                    if similarity(keyword, words, model) > 0.6:
                        matched_indices.append(index)
        
            # Aggregate matched data
            matched_rows = df.loc[set(matched_indices)]
            print(matched_rows)
            rows = pd.concat([rows, matched_rows])
            
            matched_rows[price_column] = matched_rows[price_column].astype(str).str.replace(',', '').astype(float)
            matched_rows[quantity_column] = matched_rows[quantity_column].astype(str).str.replace(',', '').astype(float)

            netPrice = matched_rows[price_column].sum()
            quant = matched_rows[quantity_column].sum()

            # Store results
            summary[keyword] = {
                'Quantity Sold': int(quant),
                price_column: netPrice,
                "Number of Orders": len(matched_rows),
                f'{price_column} Average': format(netPrice / quant, '.2f') if quant else '0.00'
            }
        y += 1
        ret[f"file{y}"] = summary
        price_column = ''
        quantity_column = ''
        print(ret)
    return ret

def Word2vec(files, keywords, output_file):
    ret = {}
    summary = {}
    price_column = ''
    quantity_column = ''
    y = 0 
    rows = pd.DataFrame()
    # Identify specific columns
    for df in files:
        for column_name in df.columns:
            if 'Price' in column_name or 'Total' in column_name and not price_column:
                price_column = column_name
            elif 'Quantity' in column_name and not quantity_column:
                quantity_column = column_name
            if price_column and quantity_column:
                break
    
        summary = {}
    # Convert DataFrame to string
        str_df = df.astype(str)
        for keyword in keywords:
            matched_indices = []
            for col in str_df:
                for index, entry in str_df[col].iteritems():
                    words = entry.lower().split()
                    if similarity(keyword, words, model) > 0.6:
                        matched_indices.append(index)
        
            # Aggregate matched data
            if not price_column or not quantity_column:
                raise ValueError("Required columns (Price or Quantity) not found in the DataFrame.")
        
            matched_rows = df.loc[set(matched_indices)]
            print(matched_rows)
            rows = pd.concat([rows, matched_rows])
            
            #print(matched_rows[price_column])
            matched_rows[price_column] = matched_rows[price_column].astype(str).str.replace(',', '').astype(float)
            matched_rows[quantity_column] = matched_rows[quantity_column].astype(str).str.replace(',', '').astype(float)
            
            print(matched_rows[price_column])
            
            netPrice = matched_rows[price_column].sum()
            quant = matched_rows[quantity_column].sum()

            # Store results
            summary[keyword] = {
                'Quantity Sold': int(quant),
                price_column: netPrice,
                "Number of Orders": len(matched_rows),
                f'{price_column} Average': format(netPrice / quant, '.2f') if quant else '0.00'
            }
        y += 1
        ret[f"file{y}"] = summary
        price_column = ''
        quantity_column = ''
    
    summaries = pd.DataFrame(ret)
    rows = pd.concat([summaries, rows])
    rows.to_excel(output_file, index=False)
    return ret
             
  
        
    

def filter_and_save(category_names, dataframes, output_file):
    filtered_data = pd.DataFrame()
    for df in dataframes:
        for column_name in df.columns:
            if 'Category' in column_name:
                for category_name in category_names:
                    filtered_rows = df[df[column_name].str.contains(category_name, na=False, case=False)]
                    filtered_data = pd.concat([filtered_data, filtered_rows])

    filtered_data.to_excel(output_file, index=False)
    