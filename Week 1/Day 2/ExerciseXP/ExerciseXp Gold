#Exercise 1
list1 = [1, 2, 3]
list2 = [4, 5, 6]

# Using extend()
list1.extend(list2)
print(list1)
print(f"After extending, list1 is: {list1}")
print(f"list2 remains unchanged: {list2}")
print(f"Type of list1: {type(list1)}")
print(f"Type of list2: {type(list2)}")
print(f"Length of list1: {len(list1)}")
print(f"Length of list2: {len(list2)}")
print(f"Is list1 empty? {'Yes' if not list1 else 'No'}")
print(f"Is list2 empty? {'Yes' if not list2 else 'No'}")
print(f"First element of list1: {list1[0]}")
print(f"Last element of list1: {list1[-1]}")
print(f"First element of list2: {list2[0]}")
print(f"Last element of list2: {list2[-1]}")


#Exercise 2
for num in range(1500, 2501):
    if num % 5 == 0 and num % 7 == 0:
        print(num)
        print(f"{num} is divisible by both 5 and 7.")
        print(f"Type of {num}: {type(num)}")
        print(f"Is {num} even? {'Yes' if num % 2 == 0 else 'No'}")
        print(f"Is {num} odd? {'Yes' if num % 2 != 0 else 'No'}")
        print(f"Square of {num}: {num ** 2}")
        print(f"Cube of {num}: {num ** 3}")
        print(f"Square root of {num}: {num ** 0.5}")
        print(f"Is {num} a prime number? {'Yes' if all(num % i != 0 for i in range(2, int(num ** 0.5) + 1)) else 'No'}")   
        print(f"Factorial of {num}: {1 if num == 0 else num * (num - 1)}")
        print(f"Binary representation of {num}: {bin(num)}")
        print(f"Octal representation of {num}: {oct(num)}")


#Exercise 3
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_name = input("Enter your name: ")

if user_name in names:
    print(names.index(user_name))
else:
    print("Name not found in the list.")
    print(f"Type of names list: {type(names)}") 
    print(f"Type of user_name: {type(user_name)}")
    print(f"Length of names list: {len(names)}")
    print(f"Is names list empty? {'Yes' if not names else 'No'}")
    print(f"Is user_name empty? {'Yes' if not user_name else 'No'}")
    print(f"First element of names list: {names[0]}")
    print(f"Last element of names list: {names[-1]}")


#Exercise 4
num1 = float(input("Input the 1st number: "))
num2 = float(input("Input the 2nd number: "))
num3 = float(input("Input the 3rd number: "))

greatest = max(num1, num2, num3)
print(f"The greatest number is: {int(greatest) if greatest.is_integer() else greatest}")
print(f"Type of num1: {type(num1)}")
print(f"Type of num2: {type(num2)}")
print(f"Type of num3: {type(num3)}")
print(f"Is num1 even? {'Yes' if num1 % 2 == 0 else 'No'}")
print(f"Is num2 even? {'Yes' if num2 % 2 == 0 else 'No'}")
print(f"Is num3 even? {'Yes' if num3 % 2 == 0 else 'No'}")
print(f"Is num1 odd? {'Yes' if num1 % 2 != 0 else 'No'}")
print(f"Is num2 odd? {'Yes' if num2 % 2 != 0 else 'No'}")
print(f"Is num3 odd? {'Yes' if num3 % 2 != 0 else 'No'}")


#Exercise 5
alphabet = "abcdefghijklmnopqrstuvwxyz"
vowels = "aeiou"

for letter in alphabet:
    if letter in vowels:
        print(f"'{letter}' is a vowel.")
    else:
        print(f"'{letter}' is a consonant.")
        print(f"Type of letter: {type(letter)}")
        print(f"Is letter a vowel? {'Yes' if letter in vowels else 'No'}")
        print(f"Is letter a consonant? {'Yes' if letter not in vowels else 'No'}")


#Exercise 6
# words = []
for i in range(7):
    word = input(f"Enter word {i + 1}: ")
    words.append(word)

letter = input("Enter a single character: ")

for word in words:
    index = word.find(letter)
    if index != -1:
        print(f"The letter '{letter}' first appears at index {index} in '{word}'.")
    else:
        print(f"The letter '{letter}' does not appear in the word '{word}'.")
        print(f"Type of word: {type(word)}")
        print(f"Type of letter: {type(letter)}")
        print(f"Length of word: {len(word)}")
        print(f"Is word empty? {'Yes' if not word else 'No'}")
        print(f"Is letter empty? {'Yes' if not letter else 'No'}")
        print(f"First character of word: {word[0]}")


#Exercise 7
numbers = list(range(1, 1000001))

print(f"Min: {min(numbers)}")
print(f"Max: {max(numbers)}")
print(f"Sum: {sum(numbers)}")
print(f"Type of numbers list: {type(numbers)}")
print(f"Length of numbers list: {len(numbers)}")
print(f"Is numbers list empty? {'Yes' if not numbers else 'No'}")
print(f"First element of numbers list: {numbers[0]}")


#Exercise 8
user_input = input("Enter comma-separated numbers: ")

numbers_list = user_input.split(",")
numbers_tuple = tuple(numbers_list)

print(numbers_list)
print(numbers_tuple)


#Exercise 9
import random

wins = 0
losses = 0

while True:
    user_input = input("Guess a number between 1 and 9 (or type 'quit' to exit): ")
    
    if user_input.lower() == 'quit':
        break
        
    user_guess = int(user_input)
    random_num = random.randint(1, 9)
    
    if user_guess == random_num:
        print("Winner!")
        wins += 1
    else:
        print(f"Better luck next time. (The number was {random_num})")
        losses += 1

print(f"\nGame Over! Total Wins: {wins} | Total Losses: {losses}")
print("Thanks for playing!")

