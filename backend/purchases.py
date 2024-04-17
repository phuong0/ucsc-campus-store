import pandas as pd

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
            totalCount = df[column_name].value_counts()
            quantitySold = df.groupby(column_name)[quantity_column].sum()
            for cat in categories:
                x = {}
                x[price_column] = float(categoriesNet.get(cat, 0))  # Convert to float
                x["Number of Orders"] = int(totalCount.get(cat, 0))  # Convert to int
                x["Total Quantity Sold"] = int(quantitySold.get(cat, 0))  # Convert to int
                x[f'{price_column} Average'] = format(categoriesNet.get(cat, 0) / totalCount.get(cat, 1), '.2f')  # Convert to float
                ret[cat] = x
    return ret