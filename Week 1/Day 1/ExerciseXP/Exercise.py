#Exercise 1: Hello World
print("Hello world\n" * 4, end="")


#exercise 2: Some Math
print((99 ** 3) * 8)
print("The result of (99 ** 3) * 8 is:", (99 ** 3) * 8)
print("The result of (99 ** 3) * 8 is:", (99 ** 3) * 8, "and the type of the result is:", type((99 ** 3) * 8))


#exercise 3:What is the output
>>> 5 % 3          # Output: 2
>>> 3 == 3         # Output: True
>>> 3 == "3"       # Output: False (integer is not equal to string)
>>> "3" > 3        # Output: TypeError (cannot compare str and int with >)
>>> "Hello" == "hello" # Output: False (case-sensitive string comparison)


#exercise 4: Your computer brand
computer_brand = "Apple"
print(f"I have a {computer_brand} computer.")
print(f"My computer brand is {computer_brand}.")    
print(f"My computer brand is {computer_brand.upper()}.")  # Output: My computer brand is APPLE.


#exercise 5: Your result
name = "Alex"
age = 25
shoe_size = 42
info = f"My name is {name}, I am {age} years old, and my shoe size is {shoe_size}."
print(info)


#exercise 6 (a) and (b)
a = 10
b = 5

if a > b:
    print("Hello World")


#exercise 7
number = int(input("Enter a number: "))

if number % 2 == 0:
    print("The number is even.")
else:
    print("The number is odd.")



#exercise 8
my_name = "Alex"
user_name = input("What is your name? ")

if user_name.strip().capitalize() == my_name:
    print("Great minds think alike! We share the exact same awesome name!")
else:
    print(f"Nice to meet you, {user_name}! Sadly, you don't share my legendary name.")



#exercise 9
height = float(input("Enter your height in cm: "))

if height > 145:
    print("You are tall enough to ride!")
else:
    print("You need to grow some more to ride.")







