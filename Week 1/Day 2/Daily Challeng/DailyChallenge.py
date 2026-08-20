# Ask user for inputs
number = int(input("Enter a number: "))
length = int(input("Enter length: "))

# Generate list of multiples
multiples = []
for i in range(1, length + 1):
    multiples.append(number * i)

# Print final list
print(multiples)
print(f"The list of the first {length} multiples of {number} is: {multiples}")


# Ask user for a string
user_word = input("Enter a word: ")

# Remove consecutive duplicates
result = ""
for char in user_word:
    if not result or char != result[-1]:
        result += char

# Print modified string
print(f"The word with consecutive duplicates removed is: {result}")
