from datetime import date
import re
import secrets
import string


def next_upcoming_holiday(today: date | None = None) -> tuple[str, int]:
	"""Return the name and number of days until the next recurring holiday."""
	current_date = today or date.today()
	holidays = (
		("New Year's Day", 1, 1),
		("Valentine's Day", 2, 14),
		("April Fool's Day", 4, 1),
		("Independence Day", 7, 4),
		("Halloween", 10, 31),
		("Christmas Day", 12, 25),
	)

	upcoming = []
	for name, month, day in holidays:
		holiday_date = date(current_date.year, month, day)
		if holiday_date >= current_date:
			upcoming.append((holiday_date, name))
	if not upcoming:
		holiday_date = date(current_date.year + 1, 1, 1)
		return "New Year's Day", (holiday_date - current_date).days
	holiday_date, name = min(upcoming)
	return name, (holiday_date - current_date).days


def display_upcoming_holiday(today: date | None = None) -> str:
	"""Display today's date and the next holiday, then return the message."""
	current_date = today or date.today()
	holiday_name, days_left = next_upcoming_holiday(current_date)
	message = (
		f"Today is {current_date.strftime('%B')} {current_date.day}, "
		f"{current_date.year}. The next holiday is {holiday_name} in "
		f"{days_left} days."
	)
	print(message)
	return message


def planet_ages(age_in_seconds: int | float) -> dict[str, float]:
	"""Return an age in Earth years for each planet."""
	if age_in_seconds < 0:
		raise ValueError("age_in_seconds must not be negative")
	earth_year = 31_557_600
	orbital_periods = {
		"Earth": 1,
		"Mercury": 0.2408467,
		"Venus": 0.61519726,
		"Mars": 1.8808158,
		"Jupiter": 11.862615,
		"Saturn": 29.447498,
		"Uranus": 84.016846,
		"Neptune": 164.79132,
	}
	earth_years = age_in_seconds / earth_year
	return {
		planet: round(earth_years / orbital_period, 2)
		for planet, orbital_period in orbital_periods.items()
	}


def return_numbers(text: str) -> str:
	"""Extract all digits from text in their original order."""
	return "".join(re.findall(r"\d", text))


def is_valid_full_name(name: str) -> bool:
	"""Check for two title-cased, alphabetic names separated by one space."""
	return bool(re.fullmatch(r"[A-Z][a-z]* [A-Z][a-z]*", name))


def get_valid_full_name() -> str:
	"""Keep asking until the user enters a valid full name."""
	while True:
		name = input("Enter your first and last name: ")
		if is_valid_full_name(name):
			return name
		print("Enter two names using letters only, with one space and capitals.")


PASSWORD_CHARACTERS = {
	"digit": string.digits,
	"lowercase": string.ascii_lowercase,
	"uppercase": string.ascii_uppercase,
	"special": "!@#$%^_&*()-+=",
}


def generate_password(length: int) -> str:
	"""Generate a password containing every required character category."""
	if not 6 <= length <= 30:
		raise ValueError("password length must be between 6 and 30")
	required = [secrets.choice(characters) for characters in PASSWORD_CHARACTERS.values()]
	all_characters = "".join(PASSWORD_CHARACTERS.values())
	password = required + [secrets.choice(all_characters) for _ in range(length - 4)]
	secrets.SystemRandom().shuffle(password)
	return "".join(password)


def is_strong_password(password: str) -> bool:
	"""Return whether a password meets the four character requirements."""
	return (
		6 <= len(password) <= 30
		and any(character.isdigit() for character in password)
		and any(character.islower() for character in password)
		and any(character.isupper() for character in password)
		and any(character in PASSWORD_CHARACTERS["special"] for character in password)
	)


def test_password_generator(iterations: int = 100) -> None:
	"""Generate and validate passwords at varied lengths."""
	for _ in range(iterations):
		length = secrets.randbelow(25) + 6
		password = generate_password(length)
		assert len(password) == length
		assert is_strong_password(password)


def run_password_generator() -> str:
	"""Prompt for a valid length, generate a password, and display it."""
	while True:
		try:
			length = int(input("Choose a password length (6-30): "))
			if 6 <= length <= 30:
				break
		except ValueError:
			pass
		print("Please enter a whole number from 6 to 30.")
	password = generate_password(length)
	print(f"Your password is: {password}. Keep it in a safe place!")
	return password
