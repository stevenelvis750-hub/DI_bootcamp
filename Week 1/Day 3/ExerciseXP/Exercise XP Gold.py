#Exercise 1
# 1 & 2. Create dictionary with 5 birthdays
birthdays = {
    "Rose": "1995/04/12",
    "Bob": "1990/08/23",
    "Charlie": "1988/12/05",
    "Diana": "2001/01/15",
    "Elvis": "1997/06/30"
}

# 3. Welcome message
print("Welcome to the Birthday Lookup App!")
print("You can look up the birthdays of the people in the list!")

# 4. Ask for user input
name = input("Enter a person's name: ")

# 5 & 6. Get and print birthday
birthday = birthdays.get(name)
print(f"{name}'s birthday is on {birthday}.")


#Exercise 2
birthdays = {
    "Rose": "1995/04/12",
    "Lize": "1990/08/23",
    "Charlie": "1988/12/05",
    "Diana": "2001/01/15",
    "Elvis": "1997/06/30"
}

print("Welcome to the Birthday Lookup App!")
print("You can look up the birthdays of the people in the list!")

# Print all names in the dictionary
print("\nPeople in the list:")
for person in birthdays.keys():
    print(f"- {person}")

name = input("\nEnter a person's name: ")

# Check if person exists in dictionary
if name in birthdays:
    print(f"{name}'s birthday is on {birthdays[name]}.")
else:
    print(f"Sorry, we don't have the birthday information for {name}.")


#Exercise 3
birthdays = {
    "Rose": "1995/04/12",
    "Lize": "1990/08/23",
    "Ian": "1988/12/05",
    "Diana": "2001/01/15",
    "Elvis": "1997/06/30"
}

print("Welcome to the Birthday Lookup App!\n")

# Add a new birthday
new_name = input("Add a person's name: ")
new_bday = input("Add their birthday (YYYY/MM/DD): ")
birthdays[new_name] = new_bday

print("\nYou can look up the birthdays of the people in the list!")
for person in birthdays.keys():
    print(f"- {person}")

# Search for a birthday
search_name = input("\nEnter a person's name to look up: ")

if search_name in birthdays:
    print(f"{search_name}'s birthday is on {birthdays[search_name]}.")
else:
    print(f"Sorry, we don't have the birthday information for {search_name}.")    


#Exercise 4
# Part 1: Print items and prices in a sentence
items_simple = {
    "banana": 4,
    "apple": 2,
    "orange": 1.5,
    "pear": 3
}

for item, price in items_simple.items():
    print(f"A {item} costs ${price}.")

print("\n" + "="*30 + "\n")

# Part 2: Calculate total cost of everything in stock
items_stock = {
    "banana": {"price": 4, "stock": 10},
    "apple": {"price": 2, "stock": 5},
    "orange": {"price": 1.5, "stock": 24},
    "pear": {"price": 3, "stock": 1}
}

total_cost = 0
for item, info in items_stock.items():
    item_total = info["price"] * info["stock"]
    total_cost += item_total

print(f"The total cost to buy everything in stock is: ${total_cost}")

