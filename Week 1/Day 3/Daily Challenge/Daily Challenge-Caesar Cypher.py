def caesar_cipher(text, shift):
	result = ""

	for character in text:
		if character.isalpha() and character.isascii():
			alphabet_start = ord("A") if character.isupper() else ord("a")
			shifted_character = chr(
				(ord(character) - alphabet_start + shift) % 26 + alphabet_start
			)
			result += shifted_character
		else:
			result += character

	return result


while True:
	choice = input("Do you want to encrypt or decrypt? ").strip().lower()
	if choice in ("encrypt", "decrypt"):
		break
	print("Please enter 'encrypt' or 'decrypt'.")

message = input("Enter your message: ")
shift = int(input("Enter the shift: "))

if choice == "decrypt":
	shift = -shift

print("Result:", caesar_cipher(message, shift))
