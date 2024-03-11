import pandas as pd

df = pd.read_csv('UCSC Amazon purchase data Calendar 2023.csv')
df2 = pd.read_excel('CruzBuyCY23 Tangible Goods.xlsx')

ret = {}

for column_name in df2.columns:
    if 'Category' in column_name:
        ret[column_name] = df2[column_name].dropna().unique()

print(ret)
