import pandas as pd



def categories(df):
    ret = {}
    for column_name in df.columns:
            if 'Category' in column_name:
                unique_vals = df[column_name].dropna().unique()
                ret[column_name] = unique_vals.tolist()
    print(ret)
    return ret

# print(categories(df1))
