import pandas as pd
df1 = pd.read_csv('UCSC Amazon purchase data Calendar 2023.csv')
df2 = pd.read_excel('CruzBuyCY23 Tangible Goods.xlsx')

specified_categories = ['Beauty', 'Office Product']

def summary(categories, df):
    ret = {}
    price_column = ''

    for column_name in df.columns:
        if 'Price' in column_name or 'Total' in column_name:
            price_column = column_name
            break

    for column_name in df.columns:
        if 'Category' in column_name:
            categoriesNet = df.groupby(column_name)[price_column].sum()
            totalCount = df[column_name].value_counts()
            for cat in categories:
                x = {}
                x[price_column] = categoriesNet[cat]
                x["Volume"] = totalCount[cat]
                ret[cat] = x
    return ret

print(summary(specified_categories, df1))

