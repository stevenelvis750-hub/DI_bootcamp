import json
import random
import re
from pathlib import Path


CONNECTION_WORDS = {
	"a", "an", "and", "as", "at", "by", "for", "from", "in", "of",
	"on", "or", "the", "to", "with",
}


class RestaurantMenuManager:
	def __init__(self, menu_file=None):
		self.menu_file = (
			Path(__file__).with_name("restaurant_menu.json")
			if menu_file is None
			else Path(menu_file)
		)
		if not self.menu_file.exists():
			self._save_menu({"valentine_items": []})

	def _load_menu(self):
		with self.menu_file.open("r", encoding="utf-8") as file:
			return json.load(file)

	def _save_menu(self, menu):
		with self.menu_file.open("w", encoding="utf-8") as file:
			json.dump(menu, file, indent=2)
			file.write("\n")

	@staticmethod
	def valid_name(name):
		words = name.split()
		if not words or sum(character.lower() == "e" for character in name) < 2:
			return False
		if any(character.isdigit() for character in name):
			return False

		for index, word in enumerate(words):
			parts = word.split("-")
			if not all(re.fullmatch(r"[A-Za-z]+", part) for part in parts):
				return False
			if index == 0:
				if not word.startswith("V"):
					return False
			elif word.lower() in CONNECTION_WORDS:
				if word != word.lower():
					return False
			elif not word[0].isupper():
				return False
		return True

	@staticmethod
	def valid_price(price):
		return re.fullmatch(r"\d{2},14", price) is not None

	def add_item(self, name, price):
		if not self.valid_name(name):
			raise ValueError("The item name does not follow the required format.")
		if not self.valid_price(price):
			raise ValueError("The price must match the format XX,14.")

		menu = self._load_menu()
		menu.setdefault("valentine_items", []).append({"name": name, "price": price})
		self._save_menu(menu)

	@staticmethod
	def display_heart():
		print("  **   **")
		print(" *********")
		print("***********")
		print(" *********")
		print("  *******")
		print("   *****")
		print("    ***")
		print("     *")

	def show_menu(self):
		self.display_heart()
		menu = self._load_menu()
		print("Valentine's Menu")
		for item in menu.get("valentine_items", []):
			print(f"- {item['name']}: {item['price']}")

	def prompt_for_item(self):
		name = input("Enter the Valentine item name: ")
		price = input("Enter the price (XX,14): ")
		try:
			self.add_item(name, price)
		except ValueError as error:
			print(error)
		else:
			print("Item added.")


class Character:
	ABILITIES = (
		"strength", "dexterity", "constitution",
		"intelligence", "wisdom", "charisma",
	)

	def __init__(self, name, age):
		self.name = name
		self.age = age
		self.attributes = {ability: self._roll_ability() for ability in self.ABILITIES}

	@staticmethod
	def _roll_ability():
		dice = [random.randint(1, 6) for _ in range(4)]
		return sum(sorted(dice)[-3:])

	def to_dict(self):
		return {
			"name": self.name,
			"age": self.age,
			"attributes": self.attributes,
		}


class Game:
	def __init__(self):
		self.characters = []

	def create_characters(self, player_count):
		for player_number in range(1, player_count + 1):
			print(f"Player {player_number}")
			name = input("Character name: ")
			age = int(input("Character age: "))
			self.characters.append(Character(name, age))
		return self.characters

	def export_json(self, file_path="characters.json"):
		with open(file_path, "w", encoding="utf-8") as file:
			json.dump([character.to_dict() for character in self.characters], file, indent=2)
			file.write("\n")

	def export_txt(self, file_path="characters.txt"):
		with open(file_path, "w", encoding="utf-8") as file:
			for character in self.characters:
				file.write(f"Name: {character.name}\n")
				file.write(f"Age: {character.age}\n")
				for ability, score in character.attributes.items():
					file.write(f"{ability.title()}: {score}\n")
				file.write("\n")

	def run(self):
		player_count = int(input("How many players are playing? "))
		self.create_characters(player_count)
		self.export_json()
		self.export_txt()
		print("Characters exported to characters.json and characters.txt.")


def main():
	choice = input("Choose an exercise (1: menu, 2: D&D): ")
	if choice == "1":
		manager = RestaurantMenuManager()
		manager.prompt_for_item()
		manager.show_menu()
	elif choice == "2":
		Game().run()


if __name__ == "__main__":
	main()

{
  "valentine_items": []
}
