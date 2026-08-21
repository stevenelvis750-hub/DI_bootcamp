import random


list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
target_number = 3728

seen = set()
pairs = set()

for number in list_of_numbers:
	complement = target_number - number

	if complement in seen:
		pairs.add(tuple(sorted((number, complement))))

	seen.add(number)

for first_number, second_number in sorted(pairs):
	print(f"{first_number} and {second_number} sums to the target_number {target_number}")

