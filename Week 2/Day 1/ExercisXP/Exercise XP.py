class Cat:
	def __init__(self, cat_name, cat_age):
		self.name = cat_name
		self.age = cat_age


def find_oldest_cat(cat1, cat2, cat3):
	return max((cat1, cat2, cat3), key=lambda cat: cat.age)


class Dog:
	def __init__(self, name, height):
		self.name = name
		self.height = height

	def bark(self):
		print(f"{self.name} goes woof!")

	def jump(self):
		print(f"{self.name} jumps {self.height * 2} cm high!")


class Song:
	def __init__(self, lyrics):
		self.lyrics = lyrics

	def sing_me_a_song(self):
		for line in self.lyrics:
			print(line)


class Zoo:
	def __init__(self, zoo_name):
		self.zoo_name = zoo_name
		self.animals = []
		self.groups = {}

	def add_animal(self, *new_animals):
		for animal in new_animals:
			if animal not in self.animals:
				self.animals.append(animal)

	def get_animals(self):
		print(self.animals)

	def sell_animal(self, animal_sold):
		if animal_sold in self.animals:
			self.animals.remove(animal_sold)

	def sort_animals(self):
		self.animals.sort()
		self.groups = {}
		for animal in self.animals:
			first_letter = animal[0].upper()
			self.groups.setdefault(first_letter, []).append(animal)
		return self.groups

	def get_groups(self):
		if not self.groups:
			self.sort_animals()
		for letter, animals in self.groups.items():
			print(f"{letter}: {animals}")


if __name__ == "__main__":
	cat1 = Cat("Whiskers", 3)
	cat2 = Cat("Mittens", 7)
	cat3 = Cat("Luna", 5)
	oldest_cat = find_oldest_cat(cat1, cat2, cat3)
	print(f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")

	davids_dog = Dog("Rex", 50)
	sarahs_dog = Dog("Teacup", 20)
	for dog in (davids_dog, sarahs_dog):
		print(f"{dog.name} is {dog.height} cm tall.")
		dog.bark()
		dog.jump()
	if davids_dog.height > sarahs_dog.height:
		print(f"{davids_dog.name} is taller than {sarahs_dog.name}.")
	elif sarahs_dog.height > davids_dog.height:
		print(f"{sarahs_dog.name} is taller than {davids_dog.name}.")
	else:
		print("Both dogs are the same height.")

	stairway = Song([
		"There's a lady who's sure",
		"all that glitters is gold",
		"and she's buying a stairway to heaven",
	])
	stairway.sing_me_a_song()

	brooklyn_safari = Zoo("Brooklyn Safari")
	brooklyn_safari.add_animal("Giraffe", "Bear", "Baboon", "Cat", "Cougar", "Lion", "Zebra")
	brooklyn_safari.get_animals()
	brooklyn_safari.sell_animal("Bear")
	brooklyn_safari.get_animals()
	brooklyn_safari.sort_animals()
	brooklyn_safari.get_groups()
