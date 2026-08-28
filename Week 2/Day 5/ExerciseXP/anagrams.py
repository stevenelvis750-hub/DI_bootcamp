from anagram_checker import AnagramChecker


def get_user_word():
    while True:
        word = input("Enter a single word: ").strip()
        if not word:
            print("Error: please enter a word.")
        elif len(word.split()) != 1:
            print("Error: only one word is allowed.")
        elif not word.isalpha():
            print("Error: use alphabetic characters only.")
        else:
            return word


def print_word_results(word, checker):
    anagrams = checker.get_anagrams(word)
    print(f'\nYOUR WORD: "{word.upper()}"')
    if checker.is_valid_word(word):
        print("This is a valid English word.")
    else:
        print("This is not a valid English word.")

    if anagrams:
        print(f"Anagrams for your word: {', '.join(anagrams)}.")
    else:
        print("No anagrams were found.")


def main():
    checker = AnagramChecker()

    while True:
        print("\nAnagram Checker")
        print("1. Enter a word")
        print("2. Exit")
        choice = input("Choose an option: ").strip()

        if choice == "1":
            print_word_results(get_user_word(), checker)
        elif choice == "2":
            print("Goodbye!")
            break
        else:
            print("Error: please choose 1 or 2.")


if __name__ == "__main__":
    main()
