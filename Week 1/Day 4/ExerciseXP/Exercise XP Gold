#Exercise 1
CURRENT_YEAR = 2026
CURRENT_MONTH = 8
CURRENT_DAY = 21


def get_age(year, month, day):
    age = CURRENT_YEAR - year
    # Subtract 1 year if the birthday hasn't occurred yet this year
    if (month, day) > (CURRENT_MONTH, CURRENT_DAY):
        age -= 1
    return age


def can_retire(gender, date_of_birth):
    # Parse year, month, and day from string "YYYY/MM/DD"
    year, month, day = map(int, date_of_birth.split("/"))

    age = get_age(year, month, day)

    if gender.lower() == "m":
        return age >= 67
    elif gender.lower() == "f":
        return age >= 62
    return False


# Main execution for user interaction
gender_input = input("Enter your gender (m/f): ")
dob_input = input("Enter your date of birth (YYYY/MM/DD): ")

if can_retire(gender_input, dob_input):
    print("You are eligible to retire!")
else:
    print("You are not old enough to retire yet.")



#Exercise 2
def calculate_sum(X):
    # Convert integer X to string to generate X, XX, XXX, XXXX
    str_x = str(X)

    # Convert repeated strings back to integers and calculate sum
    result = sum(int(str_x * i) for i in range(1, 5))
    return result


# Test Example (X = 3 outputs 3702)
print(calculate_sum(3))



#Exercise 3
import random


def throw_dice():
    return random.randint(1, 6)


def throw_until_doubles():
    throws = 0
    while True:
        throws += 1
        die1 = throw_dice()
        die2 = throw_dice()
        if die1 == die2:
            break
    return throws


def main():
    # Store throw counts across 100 successful doubles attempts
    throw_counts = []

    for _ in range(100):
        throws_needed = throw_until_doubles()
        throw_counts.append(throws_needed)

    total_throws = sum(throw_counts)
    average_throws = round(total_throws / len(throw_counts), 2)

    print(f"Total throws: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws}")


# Run simulation
main()