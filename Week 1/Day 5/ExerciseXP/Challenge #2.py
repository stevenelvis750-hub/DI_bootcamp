"""Week 1, Day 5 - Exercise XP, Challenge #2"""


# Exercise 1: centered pyramid
for row in range(3):
	spaces = 2 - row
	stars = 2 * row + 1
	print(" " * spaces + "*" * stars)

print()

# Exercise 1: right-aligned increasing triangle
for row in range(1, 6):
	spaces = 5 - row
	print(" " * spaces + "*" * row)

print()

# Exercise 1: increasing triangle followed by a decreasing triangle
for row in range(1, 6):
	print("*" * row)
for row in range(4, 0, -1):
	spaces = 5 - row
	print(" " * spaces + "*" * row)


# Exercise 2: analysis of the program
# my_list starts as [2, 24, 12, 354, 233].
# The program uses selection-sort logic: minimum stores the index of the
# smallest value found for the current position i.

my_list = [2, 24, 12, 354, 233]  # Initial list.
for i in range(len(my_list) - 1):  # i takes the values 0, 1, 2, and 3.
	minimum = i  # Start by assuming my_list[i] is the smallest value.
	for j in range(i + 1, len(my_list)):  # Compare with later values.
		if my_list[j] < my_list[minimum]:  # Check for a new minimum.
			minimum = j  # Store the index of the new minimum.
			if minimum != i:  # Swap it into position i.
				my_list[i], my_list[minimum] = my_list[minimum], my_list[i]

# Trace of variable changes:
# i = 0: minimum changes 0 -> 2; swap indexes 0 and 2:
#        my_list becomes [12, 24, 2, 354, 233].
# i = 1: minimum changes 1 -> 2; swap indexes 1 and 2:
#        my_list becomes [12, 2, 24, 354, 233].
# i = 2: minimum remains 2; no swap occurs.
# i = 3: minimum changes 3 -> 4; swap indexes 3 and 4:
#        my_list becomes [12, 2, 24, 233, 354].
# Final output: [12, 2, 24, 233, 354]
print(my_list)
