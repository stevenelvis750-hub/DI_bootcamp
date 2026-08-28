import json
import random
from datetime import date
from pathlib import Path


# ==================== Exercise 1: Random Sentence Generator ====================

WORDS_FILE = Path(__file__).with_name("words.txt")


def get_words_from_file(file_path):
	with open(file_path, "r", encoding="utf-8") as file:
		return file.read().split()


def get_random_sentence(sentence_length):
	words = get_words_from_file(WORDS_FILE)
	sentence = " ".join(random.choice(words) for _ in range(sentence_length))
	return sentence.lower()


def run_sentence_generator():
	print("This program generates a random sentence from a word list.")
	try:
		sentence_length = int(input("How many words should the sentence contain? "))
	except ValueError:
		print("Please enter an integer between 2 and 20.")
		return

	if not 2 <= sentence_length <= 20:
		print("The sentence length must be between 2 and 20.")
		return
	print(get_random_sentence(sentence_length))


# ==================== Exercise 2: Working with JSON ====================

SAMPLE_JSON = """{
	"company": {
		"employee": {
			"name": "emma",
			"payable": {
				"salary": 7000,
				"bonus": 800
			}
		}
	}
}"""


def update_employee_json(output_file=None):
	data = json.loads(SAMPLE_JSON)
	salary = data["company"]["employee"]["payable"]["salary"]
	print(f"Salary: {salary}")

	employee = data["company"]["employee"]
	employee["birth_date"] = date.today().isoformat()
	output_path = (
		Path(__file__).with_name("employee.json")
		if output_file is None
		else Path(output_file)
	)
	with output_path.open("w", encoding="utf-8") as file:
		json.dump(data, file, indent=4)
	return data


def main():
	choice = input("Choose an exercise (1: sentence, 2: JSON): ").strip()
	if choice == "1":
		run_sentence_generator()
	elif choice == "2":
		update_employee_json()
		print("The modified JSON was saved to employee.json.")
	else:
		print("Invalid exercise choice.")


if __name__ == "__main__":
	main()
