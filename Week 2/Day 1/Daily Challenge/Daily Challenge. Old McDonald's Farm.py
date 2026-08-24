class Farm:
	def __init__(self, farm_name):
		self.name = farm_name
		self.animals = {}

	def add_animal(self, animal_type=None, count=1, **kwargs):
		animals_to_add = {}
		if animal_type is not None:
			animals_to_add[animal_type] = count
		animals_to_add.update(kwargs)

		for name, quantity in animals_to_add.items():
			self.animals[name] = self.animals.get(name, 0) + quantity

	def get_info(self):
		animal_lines = "\n".join(
			f"{animal:<10}: {count}"
			for animal, count in self.animals.items()
		)
		return f"{self.name}'s farm\n\n{animal_lines}\n\n    E-I-E-I-0!"

	def get_animal_types(self):
		return sorted(self.animals)

	def get_short_info(self):
		animal_types = self.get_animal_types()
		pluralized_animals = [
			animal + "s" if self.animals[animal] > 1 else animal
			for animal in animal_types
		]

		if len(pluralized_animals) == 1:
			animal_list = pluralized_animals[0]
		elif len(pluralized_animals) == 2:
			animal_list = " and ".join(pluralized_animals)
		else:
			animal_list = ", ".join(pluralized_animals[:-1])
			animal_list += f" and {pluralized_animals[-1]}"

		return f"{self.name}'s farm has {animal_list}."


if __name__ == "__main__":
	macdonald = Farm("McDonald")
	macdonald.add_animal("cow", 5)
	macdonald.add_animal("sheep")
	macdonald.add_animal("sheep")
	macdonald.add_animal("goat", 12)
	print(macdonald.get_info())
	print(macdonald.get_animal_types())
	print(macdonald.get_short_info())

	expanded_farm = Farm("Green Valley")
	expanded_farm.add_animal(cow=5, sheep=2, goat=12)
	print(expanded_farm.animals)
