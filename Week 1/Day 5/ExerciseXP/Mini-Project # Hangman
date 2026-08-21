import random

wordslist = [
    "correction",
    "childish",
    "beach",
    "python",
    "assertive",
    "interference",
    "complete",
    "share",
    "credit card",
    "rush",
    "south",
]
word = random.choice(wordslist)

### YOUR CODE STARTS FROM HERE ###

# Visual stages for the gallows (6 body parts total)
GALLOWS_STAGES = [
    """
   +---+
   |   |
       |
       |
       |
       |
=========""",
    """
   +---+
   |   |
   O   |
       |
       |
       |
=========""",
    """
   +---+
   |   |
   O   |
   |   |
       |
       |
=========""",
    """
   +---+
   |   |
   O   |
  /|   |
       |
       |
=========""",
    """
   +---+
   |   |
   O   |
  /|\\  |
       |
       |
=========""",
    """
   +---+
   |   |
   O   |
  /|\\  |
  /    |
       |
=========""",
    """
   +---+
   |   |
   O   |
  /|\\  |
  / \\  |
       |
=========""",
]

# Set up game display board (* for letters, spaces preserved for multi-word phrases)
display = [" " if char == " " else "*" for char in word]
guessed_letters = set()
wrong_guesses = 0
max_attempts = 6

print("Welcome to Hangman!")

while wrong_guesses < max_attempts and "*" in display:
    print(GALLOWS_STAGES[wrong_guesses])
    print("\nWord: " + "".join(display))
    print(
        f"Guessed letters: {', '.join(sorted(guessed_letters)) if guessed_letters else 'None'}"
    )

    guess = input("Guess a letter: ").lower()

    # Input validation
    if len(guess) != 1 or not guess.isalpha():
        print("Please enter a single valid letter.")
        continue

    if guess in guessed_letters:
        print(f"You already guessed '{guess}'! Try a different letter.")
        continue

    guessed_letters.add(guess)

    if guess in word:
        print(f"Good job! '{guess}' is in the word.")
        # Reveal letter in all correct positions
        for idx, letter in enumerate(word):
            if letter == guess:
                display[idx] = guess
    else:
        print(f"Sorry, '{guess}' is not in the word.")
        wrong_guesses += 1

# Game Over Evaluation
print(GALLOWS_STAGES[wrong_guesses])

if "*" not in display:
    print(f"\n🎉 Congratulations! You guessed the word: '{word}'")
else:
    print(f"\n💀 Game over! You ran out of guesses. The word was: '{word}'")