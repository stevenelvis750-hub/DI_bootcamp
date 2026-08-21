#Exercise 1
import math

C = 50
H = 30

user_input = input("Enter comma-separated values for D: ")
d_values = user_input.split(",")

results = []
for d in d_values:
    D = float(d.strip())
    Q = math.sqrt((2 * C * D) / H)
    results.append(str(round(Q)))

print(",".join(results))


#Exercise 2
import random

# 1. Store the list of numbers in a variable
numbers = [3, 47, 99, -80, 22, 97, 54, -23, 5, 7]

# 2. Print information
print("a. Single line:", numbers)
print("b. Sorted descending:", sorted(numbers, reverse=True))
print("c. Sum:", sum(numbers))

# 3. First and last numbers
print("First and last:", [numbers[0], numbers[-1]])

# 4. Numbers greater than 50
print("Greater than 50:", [x for x in numbers if x > 50])

# 5. Numbers smaller than 10
print("Smaller than 10:", [x for x in numbers if x < 10])

# 6. Numbers squared
squared = [x**2 for x in numbers]
print("Squared numbers:", " ".join(map(str, squared)))

# 7. Without duplicates and count
unique_numbers = list(set(numbers))
print(f"Unique numbers: {unique_numbers} (Count: {len(unique_numbers)})")

# 8. Average
print("Average:", sum(numbers) / len(numbers))

# 9 & 10. Largest and smallest
print("Largest:", max(numbers))
print("Smallest:", min(numbers))

# --- Bonuses ---

# Bonus 11: Without built-in functions
total_sum = 0
count = 0
largest = numbers[0]
smallest = numbers[0]

for num in numbers:
    total_sum += num
    count += 1
    if num > largest:
        largest = num
    if num < smallest:
        smallest = num

avg = total_sum / count
print(f"Manual stats - Sum: {total_sum}, Avg: {avg}, Max: {largest}, Min: {smallest}")

# Bonus 12: User input version
# user_numbers = []
# for i in range(10):
#     user_numbers.append(int(input(f"Enter number {i+1} (-100 to 100): ")))

# Bonus 13: Random 10 integers
random_10 = [random.randint(-100, 100) for _ in range(10)]

# Bonus 14: Random amount (>= 50) of random integers
random_count = random.randint(50, 100)
random_dynamic = [random.randint(-100, 100) for _ in range(random_count)]

# Bonus 15: Answer
# Yes, the code will work regardless of list size because iteration (loops) 
# and Python functions dynamically adjust to list length!


#Exercise 3
import re

paragraph = """Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected. It supports multiple programming paradigms."""

total_chars = len(paragraph)
sentences = [s for s in re.split(r'[.!?]', paragraph) if s.strip()]
words = paragraph.split()
unique_words = set(words)

# Bonuses
non_whitespace_chars = len(paragraph.replace(" ", "").replace("\n", ""))
words_per_sentence = len(words) / len(sentences) if sentences else 0
non_unique_words_count = len(words) - len(unique_words)

print(f"Characters count: {total_chars}")
print(f"Sentences count: {len(sentences)}")
print(f"Words count: {len(words)}")
print(f"Unique words count: {len(unique_words)}")
print(f"Non-whitespace characters: {non_whitespace_chars}")
print(f"Average words per sentence: {words_per_sentence:.2f}")
print(f"Non-unique words count: {non_unique_words_count}")import re

paragraph = """Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected. It supports multiple programming paradigms."""

total_chars = len(paragraph)
sentences = [s for s in re.split(r'[.!?]', paragraph) if s.strip()]
words = paragraph.split()
unique_words = set(words)


non_whitespace_chars = len(paragraph.replace(" ", "").replace("\n", ""))
words_per_sentence = len(words) / len(sentences) if sentences else 0
non_unique_words_count = len(words) - len(unique_words)

print(f"Characters count: {total_chars}")
print(f"Sentences count: {len(sentences)}")
print(f"Words count: {len(words)}")
print(f"Unique words count: {len(unique_words)}")
print(f"Non-whitespace characters: {non_whitespace_chars}")
print(f"Average words per sentence: {words_per_sentence:.2f}")
print(f"Non-unique words count: {non_unique_words_count}")