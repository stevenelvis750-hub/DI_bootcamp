import random

# 1. Ask for User Input
user_input = input("Please enter a string of exactly 10 characters: ")

# 2. Check the Length of the String
if len(user_input) < 10:
    print("String not long enough.")
elif len(user_input) > 10:
    print("String too long.")
else:
    print("Perfect string")
 
    # 3. Print the First and Last Characters
    print(f"First character: {user_input[0]}")
    print(f"Last character: {user_input[-1]}")
    
    # 4. Build the String Character by Character
    print("\n--- Progressive Output ---")
    current_string = ""
    for char in user_input:
        current_string += char
        print(current_string)
        
    # 5. Bonus: Jumble the String
    print("\n--- Jumbled Output ---")
    char_list = list(user_input)
    random.shuffle(char_list)
    jumbled_string = "".join(char_list)
    print(f"Jumbled string: {jumbled_string}")