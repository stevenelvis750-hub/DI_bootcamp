import math
import random


class Circle:
	def __init__(self, radius=1.0):
		self.radius = radius

	def perimeter(self):
		return 2 * math.pi * self.radius

	def area(self):
		return math.pi * self.radius ** 2

	def definition(self):
		print("A circle is a set of points that are all the same distance from a center point.")


class MyList:
	def __init__(self, letters):
		self.letters = letters

	def reverse(self):
		return self.letters[::-1]

	def sort(self):
		return sorted(self.letters)

	def random_numbers(self):
		return [random.randint(1, 100) for _ in self.letters]


if __name__ == "__main__":
	circle = Circle(3)
	print(circle.perimeter())
	print(circle.area())
	circle.definition()

	letters = MyList(["d", "a", "c", "b"])
	print(letters.reverse())
	print(letters.sort())
	print(letters.random_numbers())
