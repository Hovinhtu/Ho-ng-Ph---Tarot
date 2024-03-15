import pandas as pd

# Tạo DataFrame mẫu
data = {
    'name': 'hallo',
    'cc':[
        {
            'name': 'Alice',
            'age': [25, 30],
            'languages': ['Python', 'Java']
        }
    ]
    
}
df = pd.DataFrame(data)

# Chuyển đổi DataFrame thành JSON có cấu trúc lồng nhau bằng cách sử dụng vòng lặp
nested_json = []
for index, row in df.iterrows():
    record = {
    'name': row['name'],
    'cc':[
        {
            'name': 'Alice',
            'age': row['age'],
            'languages': ['Python', 'Java']
        }
    ]
    
}
    nested_json.append(record)

print(nested_json)