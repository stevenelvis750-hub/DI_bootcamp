#Exercise 1
student_grades = {
    "Rose": [88, 92, 100],
    "lize": [75, 78, 80],
    "Charlie": [92, 90, 85],
    "Diana": [83, 88, 92],
    "Elvis": [78, 80, 72]
}

# 1. Calculate student averages
student_averages = {}
for name, grades in student_grades.items():
    student_averages[name] = sum(grades) / len(grades)

# 2. Assign letter grades
student_letter_grades = {}
for name, avg in student_averages.items():
    if avg >= 90:
        grade = 'A'
    elif avg >= 80:
        grade = 'B'
    elif avg >= 70:
        grade = 'C'
    elif avg >= 60:
        grade = 'D'
    else:
        grade = 'F'
    student_letter_grades[name] = grade

# 3. Calculate class average
class_average = sum(student_averages.values()) / len(student_averages)
print(f"Class Average: {class_average:.2f}\n")

# 4. Print individual summary reports
print("--- Student Summary Report ---")
for name in student_grades:
    avg = student_averages[name]
    letter = student_letter_grades[name]
    print(f"Student: {name} | Average Grade: {avg:.2f} | Letter Grade: {letter}")


    #Exercise 2
    sales_data = [
    {"customer_id": 1, "product": "Smartphone", "price": 600, "quantity": 1, "date": "2023-04-03"},
    {"customer_id": 2, "product": "Laptop", "price": 1200, "quantity": 1, "date": "2023-04-04"},
    {"customer_id": 1, "product": "Laptop", "price": 1000, "quantity": 1, "date": "2023-04-05"},
    {"customer_id": 2, "product": "Smartphone", "price": 500, "quantity": 2, "date": "2023-04-06"},
    {"customer_id": 3, "product": "Headphones", "price": 150, "quantity": 4, "date": "2023-04-07"},
    {"customer_id": 3, "product": "Smartphone", "price": 550, "quantity": 1, "date": "2023-04-08"},
    {"customer_id": 1, "product": "Headphones", "price": 100, "quantity": 2, "date": "2023-04-09"},
]

# 1. Total Sales Calculation per product category
total_sales = {}
for transaction in sales_data:
    product = transaction["product"]
    revenue = transaction["price"] * transaction["quantity"]
    total_sales[product] = total_sales.get(product, 0) + revenue

print("Total Sales by Product:", total_sales)

# 2. Customer Spending Profile
customer_spending = {}
for transaction in sales_data:
    cust_id = transaction["customer_id"]
    revenue = transaction["price"] * transaction["quantity"]
    customer_spending[cust_id] = customer_spending.get(cust_id, 0) + revenue

print("Customer Spending Profile:", customer_spending)

# 3. Sales Data Enhancement
for transaction in sales_data:
    transaction["total_price"] = transaction["price"] * transaction["quantity"]

# 4. High-Value Transactions (> $500 sorted descending)
high_value_transactions = [t for t in sales_data if t["total_price"] > 500]
high_value_transactions.sort(key=lambda x: x["total_price"], reverse=True)

print("\nHigh-Value Transactions (> $500):", high_value_transactions)

# 5. Customer Loyalty Identification (> 1 purchase)
purchase_counts = {}
for transaction in sales_data:
    cust_id = transaction["customer_id"]
    purchase_counts[cust_id] = purchase_counts.get(cust_id, 0) + 1

loyal_customers = [cust_id for cust_id, count in purchase_counts.items() if count > 1]
print("Loyal Customers (More than 1 purchase):", loyal_customers)

# --- Bonus: Insights and Analysis ---

# Average transaction value for each product category
avg_transaction_value = {}
for product in total_sales:
    count = sum(1 for t in sales_data if t["product"] == product)
    avg_transaction_value[product] = total_sales[product] / count

print("\nAverage Transaction Value by Product:", avg_transaction_value)

# Most popular product based on total quantity sold
product_quantities = {}
for t in sales_data:
    prod = t["product"]
    product_quantities[prod] = product_quantities.get(prod, 0) + t["quantity"]

most_popular = max(product_quantities, key=product_quantities.get)
print("Most Popular Product (by units sold):", most_popular)

# Marketing Strategy Insights
"""
Marketing Strategy Insights:
1. Focus promotions on high-value categories (Laptops/Smartphones) via premium feature highlights or trade-in incentives.
2. Leverage the most popular product (Headphones/Smartphones by volume) for upselling, cross-selling, or bundling with high-ticket items.
3. Target loyal customers (Customer IDs 1 and 2) with exclusive reward programs or tailored discount codes to boost lifetime value.
"""



