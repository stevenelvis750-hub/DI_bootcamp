from googletrans import Translator


FRENCH_WORDS = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]


def translate_french_words(words=None):
	"""Translate French words into English and return a word mapping."""
	words_to_translate = FRENCH_WORDS if words is None else words
	translator = Translator()
	return {
		word: translator.translate(word, src="fr", dest="en").text
		for word in words_to_translate
	}


if __name__ == "__main__":
	print(translate_french_words())
