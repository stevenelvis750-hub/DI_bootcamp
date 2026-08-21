# Exercise 1: Hello World
print("Hello world\n" * 4, end="")


# Exercise 2: Some Math
print((99 ** 3) * 8)


# Exercise 3: What is the output?
# Predictions: False, True, False, TypeError, False.
print(5 < 3)  # False
print(3 == 3)  # True
print(3 == "3")  # False
try:
    print("3" > 3)  # TypeError
except TypeError:
    print("TypeError")
print("Hello" == "hello")  # False


# Exercise 4: Your computer brand
computer_brand = "Apple"
print(f"I have a {computer_brand} computer.")


# Exercise 5: Your information
name = "Alex"
age = 25
shoe_size = 42
info = f"My name is {name}, I am {age} years old, and my shoe size is {shoe_size}."
print(info)


# Exercise 6: A & B
a = 10
b = 5

if a > b:
    print("Hello World")


# Exercise 7: Odd or Even
number = int(input("Enter a number: "))

if number % 2 == 0:
    print("The number is even.")
else:
    print("The number is odd.")



# Exercise 8: What's your name?
my_name = "Alex"
user_name = input("What is your name? ")

if user_name.strip().capitalize() == my_name:
    print("Great minds think alike! We share the exact same awesome name!")
else:
    print(f"Nice to meet you, {user_name}! Sadly, you don't share my legendary name.")



# Exercise 9: Tall enough to ride
height = float(input("Enter your height in cm: "))

if height > 145:
    print("You are tall enough to ride!")
else:
    print("You need to grow some more to ride.")







