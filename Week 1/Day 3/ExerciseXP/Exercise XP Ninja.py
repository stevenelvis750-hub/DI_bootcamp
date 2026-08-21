# 1. Base String
cars_str = "Audi, Buggatti, Lamborghini, Tesla, Chevrolet"

# 2. Convert to a list using split() and strip whitespace
cars_list = [car.strip() for car in cars_str.split(",")]

# 3. Print count of manufacturers
print(f"There are {len(cars_list)} manufacturers/companies in the list.")

# 4. Print list in descending order (Z-A)
sorted_descending = sorted(cars_list, reverse=True)
print("Manufacturers in Z-A order:", sorted_descending)

# 5. Loops/List Comprehension checks
# - Count manufacturers with 'o' (case-insensitive check)
with_o = sum(1 for car in cars_list if "o" in car.lower())
print(f"Manufacturers with 'o' in their name: {with_o}")

# - Count manufacturers without 'i' (case-insensitive check)
without_i = sum(1 for car in cars_list if "i" not in car.lower())
print(f"Manufacturers without 'i' in their name: {without_i}")

print("-" * 40)

# Bonus 1 & 2: Remove duplicates and format string output
duplicate_list = [
    "Audi",
    "Buggatti",
    "Lamborghini",
    "Rolls Royce",
    "Tesla",
    "Chevrolet",
    "Bentley",
]

# Convert to set to remove duplicates, then convert back to list
unique_cars = list(set(duplicate_list))

# Format as comma-separated string
formatted_cars = ", ".join(unique_cars)

print("Companies without duplicates:", formatted_cars)
print(f"There are now {len(unique_cars)} companies in the list.")

print("-" * 40)

# Bonus 3: Alphabetical order (A-Z) with reversed letters in each name
sorted_ascending = sorted(cars_list)
reversed_names = [car[::-1] for car in sorted_ascending]

print("A-Z sorted list with reversed letters:", reversed_names)