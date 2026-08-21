from collections import defaultdict


# Challenge 1: Letter Index Dictionary
word = input("Enter a word: ")
letter_indices = defaultdict(list)

for index, letter in enumerate(word):
	letter_indices[letter].append(index)

print(dict(letter_indices))


# Challenge 2: Affordable Items
def price_as_integer(price):
	return int(price.replace("$", "").replace(",", ""))


def affordable_items(items_purchase, wallet):
	remaining_money = price_as_integer(wallet)
	basket = []

	for item, price in items_purchase.items():
		item_price = price_as_integer(price)
		if item_price <= remaining_money:
			basket.append(item)
			remaining_money -= item_price

	return sorted(basket) if basket else "Nothing"


items_purchase = {
	"Water": "$1",
	"Bread": "$3",
	"TV": "$1,000",
	"Fertilizer": "$20",
}
wallet = "$300"
print(affordable_items(items_purchase, wallet))
