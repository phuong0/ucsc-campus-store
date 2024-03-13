import pandas as pd

df1 = pd.read_csv('UCSC Amazon purchase data Calendar 2023.csv')
df2 = pd.read_excel('CruzBuyCY23 Tangible Goods.xlsx')




def categories(df):
    ret = {}
    for column_name in df.columns:
        if 'Category' in column_name:
            ret[column_name] = df[column_name].dropna().unique()
    return ret

print(categories(df1))
