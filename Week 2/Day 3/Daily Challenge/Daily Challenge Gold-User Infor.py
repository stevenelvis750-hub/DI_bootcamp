def collect_users(number_of_users=5, input_function=input):
	"""Collect and return user records as (name, age, score) tuples."""
	users = []
	for user_number in range(1, number_of_users + 1):
		name = input_function(f"Name for user {user_number}: ")
		while True:
			try:
				age = int(input_function(f"Age for user {user_number}: "))
				score = int(input_function(f"Score for user {user_number}: "))
				break
			except ValueError:
				print("Age and score must be integers. Please try this user again.")
		users.append((name, str(age), str(score)))
	return users


def sort_users(users):
	"""Sort records by name, then age, then score."""
	return sorted(users, key=lambda user: (user[0], int(user[1]), int(user[2])))


def main():
	print(sort_users(collect_users()))


if __name__ == "__main__":
	main()
