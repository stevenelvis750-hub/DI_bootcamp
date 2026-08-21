import math
import random
import re


# Exercise 1: Formula
C = 50
H = 30
values = input("Enter comma-separated values for D: ").split(",")
results = [round(math.sqrt((2 * C * int(value.strip())) / H)) for value in values]
print(",".join(str(result) for result in results))


# Exercise 2: List of integers
numbers = [3, 47, 99, -80, 22, 97, 54, -23, 5, 7]
print("Numbers:", numbers)
print("Descending:", sorted(numbers, reverse=True))
print("Sum:", sum(numbers))
print("First and last:", [numbers[0], numbers[-1]])
print("Greater than 50:", [number for number in numbers if number > 50])
print("Smaller than 10:", [number for number in numbers if number < 10])
print("Squared:", [number ** 2 for number in numbers])

unique_numbers = list(dict.fromkeys(numbers))
print("Without duplicates:", unique_numbers)
print("Number of unique values:", len(unique_numbers))
print("Average:", sum(numbers) / len(numbers))
print("Largest:", max(numbers))
print("Smallest:", min(numbers))

manual_sum = 0
manual_largest = numbers[0]
manual_smallest = numbers[0]
for number in numbers:
	manual_sum += number
	if number > manual_largest:
		manual_largest = number
	if number < manual_smallest:
		manual_smallest = number
print("Manual sum:", manual_sum)
print("Manual average:", manual_sum / len(numbers))
print("Manual largest:", manual_largest)
print("Manual smallest:", manual_smallest)

random_count = random.randint(50, 100)
random_numbers = [random.randint(-100, 100) for _ in range(random_count)]
print(f"Generated {len(random_numbers)} random integers.")
print("Random sum:", sum(random_numbers))
print("Random average:", sum(random_numbers) / len(random_numbers))
print("Random largest:", max(random_numbers))
print("Random smallest:", min(random_numbers))


# Exercise 3: Working on a paragraph
paragraph = (
	"Learning to program is a practical way to turn ideas into useful tools. "
	"Each small exercise builds confidence, because every error provides a clue "
	"about how the computer understands our instructions. With regular practice, "
	"complex problems become a series of manageable decisions."
)
sentences = [sentence for sentence in re.split(r"(?<=[.!?])\s+", paragraph) if sentence]
words = re.findall(r"\b[\w']+\b", paragraph.lower())
unique_words = set(words)
print("Paragraph characters:", len(paragraph))
print("Paragraph sentences:", len(sentences))
print("Paragraph words:", len(words))
print("Unique words:", len(unique_words))
print("Non-whitespace characters:", len("".join(paragraph.split())))
print("Average words per sentence:", len(words) / len(sentences))
print("Non-unique words:", len(words) - len(unique_words))


# Exercise 4: Frequency of the words
text = "New to Python or choosing between Python 2 and Python 3? Read Python 2 or Python 3."
word_frequencies = {}
for word in text.split():
	word_frequencies[word] = word_frequencies.get(word, 0) + 1

for word in sorted(word_frequencies):
	print(f"{word}:{word_frequencies[word]}")
