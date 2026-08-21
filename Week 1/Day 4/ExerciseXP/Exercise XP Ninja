#Exercise 1
def get_full_name(first_name, last_name, middle_name=""):
    if middle_name:
        full_name = f"{first_name} {middle_name} {last_name}"
    else:
        full_name = f"{first_name} {last_name}"
    return full_name.title()


# Test Cases
print(get_full_name(first_name="Steven", middle_name="Elvis", last_name="lee"))
print(get_full_name(first_name="Rose", last_name="Mary"))


#Exercise 2
# Translation mapping dictionary
MORSE_CODE_DICT = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "0": "-----",
}

# Reverse dictionary for decoding
REVERSE_MORSE_DICT = {value: key for key, value in MORSE_CODE_DICT.items()}


def english_to_morse(text):
    words = text.upper().split(" ")
    morse_words = []
    for word in words:
        # Translate each letter and separate with spaces
        morse_letters = [
            MORSE_CODE_DICT[char] for char in word if char in MORSE_CODE_DICT
        ]
        morse_words.append(" ".join(morse_letters))
    # Separate words with a slash
    return " / ".join(morse_words)


def morse_to_english(morse):
    words = morse.split(" / ")
    english_words = []
    for word in words:
        letters = word.split(" ")
        english_letters = [
            REVERSE_MORSE_DICT[code]
            for code in letters
            if code in REVERSE_MORSE_DICT
        ]
        english_words.append("".join(english_letters))
    return " ".join(english_words)


# Example usage
morse_result = english_to_morse("HELLO WORLD")
print("Morse:", morse_result)
print("English:", morse_to_english(morse_result))


#Exercise 3
def box_printer(*args):
    if not args:
        return

    # Find the longest word length to determine frame width
    max_len = max(len(s) for s in args)
    border = "*" * (max_len + 4)

    print(border)
    for word in args:
        print(f"* {word.ljust(max_len)} *")
    print(border)


# Test case
box_printer("Hello", "World", "in", "reallylongword", "a", "frame")