import re
import string


class Text:
	def __init__(self, text):
		self.text = text

	def word_frequency(self, word):
		count = self.text.split().count(word)
		return count if count else None

	def most_common_word(self):
		frequencies = {}
		for word in self.text.split():
			frequencies[word] = frequencies.get(word, 0) + 1

		return max(frequencies, key=frequencies.get) if frequencies else None

	def unique_words(self):
		return list(set(self.text.split()))

	@classmethod
	def from_file(cls, file_path):
		with open(file_path, "r", encoding="utf-8") as file:
			return cls(file.read())


class TextModification(Text):
	def remove_punctuation(self):
		translation_table = str.maketrans("", "", string.punctuation)
		self.text = self.text.translate(translation_table)
		return self.text

	def remove_stop_words(self):
		stop_words = {
			"a", "an", "and", "are", "as", "at", "be", "by", "for",
			"from", "has", "he", "in", "is", "it", "its", "of", "on",
			"that", "the", "this", "to", "was", "were", "will", "with",
		}
		self.text = " ".join(
			word for word in self.text.split() if word.lower() not in stop_words
		)
		return self.text

	def remove_special_characters(self):
		self.text = re.sub(r"[^A-Za-z0-9\s]", "", self.text)
		return self.text
