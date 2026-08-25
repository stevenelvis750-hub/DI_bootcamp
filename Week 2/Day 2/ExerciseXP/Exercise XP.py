import random


class Pets:
	def __init__(self, animals):
		self.animals = animals

	def walk(self):
		for animal in self.animals:
			print(animal.walk())


class Cat:
	is_lazy = True

	def __init__(self, name, age):
		self.name = name
		self.age = age

	def walk(self):
		return f"{self.name} is just walking around"


class Bengal(Cat):
	def sing(self, sounds):
		return sounds


class Chartreux(Cat):
	def sing(self, sounds):
		return sounds


class Siamese(Cat):
	pass


class Dog:
	def __init__(self, name, age, weight):
		self.name = name
		self.age = age
		self.weight = weight

	def bark(self):
		return f"{self.name} is barking"

	def run_speed(self):
		return self.weight / self.age * 10

	def fight(self, other_dog):
		own_score = self.run_speed() * self.weight
		other_score = other_dog.run_speed() * other_dog.weight

		if own_score > other_score:
			return f"{self.name} won the fight"
		if other_score > own_score:
			return f"{other_dog.name} won the fight"
		return "The fight is a tie"


class PetDog(Dog):
	tricks = [
		"does a barrel roll",
		"stands on his back legs",
		"shakes your hand",
		"plays dead",
	]

	def __init__(self, name, age, weight):
		super().__init__(name, age, weight)
		self.trained = False

	def train(self):
		print(self.bark())
		self.trained = True

	def play(self, *args):
		dog_names = [self.name]
		dog_names.extend(
			dog.name if isinstance(dog, Dog) else str(dog)
			for dog in args
		)
		print(f"{', '.join(dog_names)} all play together")

	def do_a_trick(self):
		if self.trained:
			print(f"{self.name} {random.choice(self.tricks)}")


class Person:
	def __init__(self, first_name, age):
		self.first_name = first_name
		self.age = age
		self.last_name = ""

	def is_18(self):
		return self.age >= 18


class Family:
	def __init__(self, last_name):
		self.last_name = last_name
		self.members = []

	def born(self, first_name, age):
		person = Person(first_name, age)
		person.last_name = self.last_name
		self.members.append(person)

	def check_majority(self, first_name):
		for member in self.members:
			if member.first_name == first_name:
				if member.is_18():
					print(
						"You are over 18, your parents Jane and John accept "
						"that you will go out with your friends"
					)
				else:
					print("Sorry, you are not allowed to go out with your friends.")
				return

		print(f"No family member named {first_name} was found.")

	def family_presentation(self):
		print(f"Family name: {self.last_name}")
		for member in self.members:
			print(f"{member.first_name}, {member.age}")


if __name__ == "__main__":
	all_cats = [
		Bengal("Luna", 2),
		Chartreux("Milo", 4),
		Siamese("Nala", 1),
	]
	sara_pets = Pets(all_cats)
	sara_pets.walk()

	dog_1 = Dog("Buddy", 3, 20)
	dog_2 = Dog("Max", 5, 18)
	dog_3 = Dog("Rocky", 2, 15)
	print(dog_1.bark())
	print(dog_2.run_speed())
	print(dog_1.fight(dog_2))
	print(dog_3.fight(dog_1))

	pet_dog_1 = PetDog("Fido", 2, 10)
	pet_dog_2 = PetDog("Buddy", 3, 12)
	pet_dog_1.train()
	pet_dog_1.play(pet_dog_2)
	pet_dog_1.do_a_trick()

	family = Family("Smith")
	family.born("Jane", 42)
	family.born("John", 44)
	family.born("Alex", 19)
	family.born("Sam", 15)
	family.check_majority("Alex")
	family.check_majority("Sam")
	family.family_presentation()
