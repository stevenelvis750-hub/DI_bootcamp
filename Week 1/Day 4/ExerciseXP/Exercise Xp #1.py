#exercise 1
def display_message():
    print("I am learning about functions in Python.")


# Call the function
display_message()


#Exercise 2
def favorite_book(title):
    print(f"One of my favorite books is {title}.")


# Call the function with an argument
favorite_book("Alice in Wonderland")


#Exercise 3
def describe_city(city, country="Unknown"):
    print(f"{city} is in {country}.")


# Calling with both arguments
describe_city("Reykjavik", "Iceland")

# Calling with the default country value
describe_city("Paris")


#Exercise 4
import random


def compare_random_number(user_number):
    random_num = random.randint(1, 100)

    if user_number == random_num:
        print("Success!")
    else:
        print(f"Fail! Your number: {user_number}, Random number: {random_num}")


# Call the function
compare_random_number(50)



#Exercise 5
def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}.")


# Large shirt with default message
make_shirt()

# Medium shirt with default message
make_shirt(size="medium")

# Custom size and custom message (Positional arguments)
make_shirt("small", "Custom message")

# Bonus: Keyword Arguments
make_shirt(text="Hello!", size="small")



#Exercise 6
magician_names = ["Harry Houdini", "David Blaine", "Criss Angel"]


def show_magicians(magicians):
    for magician in magicians:
        print(magician)


def make_great(magicians):
    for i in range(len(magicians)):
        magicians[i] = f"{magicians[i]} the Great"


# Modify the list and display results
make_great(magician_names)
show_magicians(magician_names)


#Exercise 7
import random


def get_random_temp(season=None):
    # Bonus: Generate floating-point temperatures tailored to seasons
    if season == "winter":
        return round(random.uniform(-10.0, 10.0), 1)
    elif season == "spring":
        return round(random.uniform(10.0, 20.0), 1)
    elif season == "summer":
        return round(random.uniform(24.0, 40.0), 1)
    elif season == "autumn":
        return round(random.uniform(5.0, 18.0), 1)
    else:
        # Standard range default
        return round(random.uniform(-10.0, 40.0), 1)


def get_season_from_month(month):
    if month in [12, 1, 2]:
        return "winter"
    elif month in [3, 4, 5]:
        return "spring"
    elif month in [6, 7, 8]:
        return "summer"
    elif month in [9, 10, 11]:
        return "autumn"
    return None


def main():
    # Bonus: Ask for month to dictate the season
    month_input = input("Enter the number of the current month (1-12): ")
    season = None

    if month_input.isdigit():
        month = int(month_input)
        if 1 <= month <= 12:
            season = get_season_from_month(month)

    temp = get_random_temp(season)
    print(f"The temperature right now is {temp} degrees Celsius.")

    # Temperature Advice Logic
    if temp < 0:
        print("Brrr, that's freezing! Wear some extra layers today.")
    elif 0 <= temp <= 16:
        print("Quite chilly! Don't forget your coat.")
    elif 16 < temp <= 23:
        print("Nice weather.")
    elif 23 < temp <= 32:
        print("A bit warm, stay hydrated.")
    else:
        print("It's really hot! Stay cool.")


# Execute program
main()