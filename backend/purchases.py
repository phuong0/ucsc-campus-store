import pandas as pd
df1 = pd.read_csv('UCSC Amazon purchase data Calendar 2023.csv')
df2 = pd.read_excel('CruzBuyCY23 Tangible Goods.xlsx')

specified_categories = ['Beauty', 'Office Product']

def summary(categories, df):
    ret = {}
    price_column = ''
    quantity_column = ''

    for column_name in df.columns:
        if price_column and quantity_column:
            break
        if 'Price' in column_name or 'Total' in column_name and not price_column:
            price_column = column_name
        elif 'Quantity' in column_name:
            quantity_column = column_name


    for column_name in df.columns:
        if 'Category' in column_name:
            categoriesNet = df.groupby(column_name)[price_column].sum()
            totalCount = df[column_name].value_counts()#
            quantitySold = df.groupby(column_name)[quantity_column].sum()
            for cat in categories:
                x = {}
                x[price_column] = categoriesNet[cat]
                x["Number of Orders"] = totalCount[cat]#
                x["Total Quantity Sold"] = quantitySold[cat]
                x[f'{price_column} Average'] = format(categoriesNet[cat] / totalCount[cat], '.2f')
                ret[cat] = x
    return ret

print(summary(specified_categories, df1))