import pandas as pd
df = pd.read_csv('UCSC Amazon purchase data Calendar 2023.csv')
df2 = pd.read_excel('CruzBuyCY23 Tangible Goods.xlsx')

ret = {}

specified_categories = ['Beauty', 'Office Product']
price_column = ''

for column_name in df.columns:
    if 'Price' in column_name or 'Total' in column_name:
        price_column = column_name
        break
print(price_column)

for column_name in df.columns:
    if 'Category' in column_name:
        categoriesNet = df.groupby(column_name)[price_column].sum()
        totalCount = df[column_name].value_counts()
        for cat in specified_categories:
            x = {}
            x[price_column] = categoriesNet[cat]
            x["Count"] = totalCount[cat]
            ret[cat] = x
print(ret)


categoriesNet = df.groupby('Amazon-Internal Product Category')['Item Net Total'].sum()

print(categoriesNet['Beauty'])
#
#category_counts = {category: 0 for category in specified_categories}
#for category in specified_categories:
#     category_counts[category] = df['Amazon-Internal Product Category'].value_counts().get(category, 0)
#
#print(category_counts)
#
#{'Beauty: {Count of Products: , Total Sales: }'}

#for i in x:

