import random


# Exercise 1: OOP quiz
OOP_QUIZ = {
	"class": "A class is a blueprint that defines data and behavior for objects.",
	"instance": "An instance is a specific object created from a class.",
	"encapsulation": "Encapsulation bundles data and methods together and controls access to the data.",
	"abstraction": "Abstraction exposes only the essential details while hiding implementation complexity.",
	"inheritance": "Inheritance lets a child class reuse or extend the attributes and methods of a parent class.",
	"multiple inheritance": "Multiple inheritance lets a class inherit from more than one parent class.",
	"polymorphism": "Polymorphism lets different object types respond to the same method call in their own way.",
	"MRO": "Method resolution order is the order Python follows to find methods in a class hierarchy.",
}


class Card:
	def __init__(self, suit, value):
		self.suit = suit
		self.value = value

	def __str__(self):
		return f"{self.value} of {self.suit}"


class Deck:
	SUITS = ("Hearts", "Diamonds", "Clubs", "Spades")
	VALUES = ("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K")

	def __init__(self):
		self.cards = []
		self.shuffle()

	def shuffle(self):
		"""Restore a complete deck and rearrange it randomly."""
		self.cards = [
			Card(suit, value)
			for suit in self.SUITS
			for value in self.VALUES
		]
		random.shuffle(self.cards)

	def deal(self):
		"""Deal and remove one card, or return None when the deck is empty."""
		if not self.cards:
			return None
		return self.cards.pop()


def main():
	print("OOP Quiz")
	for topic, answer in OOP_QUIZ.items():
		print(f"\n{topic.title()}: {answer}")

	deck = Deck()
	print(f"\nDeck created with {len(deck.cards)} cards.")
	print(f"Dealt card: {deck.deal()}")
	print(f"Cards remaining: {len(deck.cards)}")


if __name__ == "__main__":
	main()
