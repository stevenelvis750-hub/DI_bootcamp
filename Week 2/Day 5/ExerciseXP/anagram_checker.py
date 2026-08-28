from pathlib import Path


class AnagramChecker:
    def __init__(self, word_list_path=None):
        if word_list_path is None:
            word_list_path = Path(__file__).with_name("sowpods.txt")

        with open(word_list_path, "r", encoding="utf-8") as word_file:
            self.word_list = {
                line.strip().lower()
                for line in word_file
                if line.strip()
            }

    def is_valid_word(self, word):
        return word.strip().lower() in self.word_list

    def is_anagram(self, word1, word2):
        first = word1.strip().lower()
        second = word2.strip().lower()
        return first != second and sorted(first) == sorted(second)

    def get_anagrams(self, word):
        normalized_word = word.strip().lower()
        return sorted(
            candidate
            for candidate in self.word_list
            if self.is_anagram(normalized_word, candidate)
        )
