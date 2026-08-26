from datetime import date, datetime
import random
import string


class Currency:
	def __init__(self, currency, amount):
		self.currency = currency
		self.amount = amount

	def __str__(self):
		label = self.currency if self.amount == 1 else f"{self.currency}s"
		return f"{self.amount} {label}"

	def __repr__(self):
		return str(self)

	def __int__(self):
		return int(self.amount)

	def __add__(self, other):
		if isinstance(other, Currency):
			if self.currency != other.currency:
				raise TypeError(
					f"Cannot add between Currency type <{self.currency}> "
					f"and <{other.currency}>"
				)
			return self.amount + other.amount
		if isinstance(other, (int, float)):
			return self.amount + other
		return NotImplemented

	def __iadd__(self, other):
		if isinstance(other, Currency) and self.currency != other.currency:
			raise TypeError(
				f"Cannot add between Currency type <{self.currency}> "
				f"and <{other.currency}>"
			)
		result = self + other
		if result is NotImplemented:
			return NotImplemented
		self.amount = result
		return self


def random_letters(length=5):
	"""Return a random string containing uppercase and lowercase letters."""
	return "".join(random.choice(string.ascii_letters) for _ in range(length))


def display_current_date():
	"""Print and return today's date."""
	current_date = datetime.now().date()
	print(current_date)
	return current_date


def time_until_january_first(now=None):
	"""Print and return the time remaining until January 1 of next year."""
	current_time = now or datetime.now()
	next_new_year = datetime(current_time.year + 1, 1, 1)
	remaining = next_new_year - current_time
	print(f"Time until January 1st: {remaining}")
	return remaining


def minutes_lived(birthdate, now=None):
	"""Print and return the number of minutes elapsed since a birthdate."""
	if isinstance(birthdate, str):
		birthdate = datetime.strptime(birthdate, "%Y-%m-%d")
	current_time = now or datetime.now()
	if birthdate > current_time:
		raise ValueError("birthdate cannot be in the future")
	minutes = int((current_time - birthdate).total_seconds() // 60)
	print(f"You have lived approximately {minutes:,} minutes.")
	return minutes


def generate_fake_users(number_of_users):
	"""Return fake users with a name, address, and language code."""
	try:
		import importlib

		Faker = importlib.import_module("faker").Faker
	except ImportError as error:
		raise ImportError(
			"Install the Faker package with: python -m pip install Faker"
		) from error

	fake = Faker()
	users = []
	for _ in range(number_of_users):
		users.append(
			{
				"name": fake.name(),
				"address": fake.address(),
				"language_code": fake.language_code(),
			}
		)
	return users


if __name__ == "__main__":
	print(Currency("dollar", 5))
	print(random_letters())
	display_current_date()
	time_until_january_first()
