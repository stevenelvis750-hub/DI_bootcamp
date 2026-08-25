class BankAccount:
	def __init__(self, balance=0, username="", password=""):
		self._validate_amount(balance, allow_zero=True)
		self.balance = balance
		self.username = username
		self.password = password
		self.authenticated = False

	@staticmethod
	def _validate_amount(amount, allow_zero=False):
		valid_type = type(amount) is int
		valid_value = amount >= 0 if allow_zero else amount > 0
		if not valid_type or not valid_value:
			raise Exception("Amount must be a positive integer.")

	def authenticate(self, username, password):
		if username == self.username and password == self.password:
			self.authenticated = True
			return True
		return False

	def _require_authentication(self):
		if not self.authenticated:
			raise Exception("Please authenticate before using the account.")

	def deposit(self, amount):
		self._require_authentication()
		self._validate_amount(amount)
		self.balance += amount

	def withdraw(self, amount):
		self._require_authentication()
		self._validate_amount(amount)
		if amount > self.balance:
			raise Exception("Insufficient funds.")
		self.balance -= amount


class MinimumBalanceAccount(BankAccount):
	def __init__(self, balance=0, minimum_balance=0, username="", password=""):
		self._validate_amount(minimum_balance, allow_zero=True)
		super().__init__(balance, username, password)
		if balance < minimum_balance:
			raise Exception("The balance cannot be below the minimum balance.")
		self.minimum_balance = minimum_balance

	def withdraw(self, amount):
		self._require_authentication()
		self._validate_amount(amount)
		if self.balance - amount <= self.minimum_balance:
			raise Exception("The minimum balance must remain in the account.")
		self.balance -= amount


class ATM:
	def __init__(self, account_list, try_limit, start_menu=True):
		if not isinstance(account_list, list):
			raise Exception("account_list must be a list.")
		if not all(isinstance(account, BankAccount) for account in account_list):
			raise Exception("account_list must contain bank accounts.")

		self.account_list = account_list
		self.try_limit = self._set_try_limit(try_limit)
		self.current_tries = 0
		self.running = True

		if start_menu:
			self.show_main_menu()

	@staticmethod
	def _set_try_limit(try_limit):
		if isinstance(try_limit, (int, float)) and not isinstance(try_limit, bool) and try_limit > 0:
			return try_limit
		print("Invalid try limit. The try limit has been set to 2.")
		return 2

	def show_main_menu(self):
		while self.running:
			print("\nMain menu")
			print("1. Log in")
			print("2. Exit")
			choice = input("Choose an option: ").strip()

			if choice == "1":
				username = input("Username: ")
				password = input("Password: ")
				self.log_in(username, password)
			elif choice == "2":
				self.running = False
				print("Goodbye.")
			else:
				print("Invalid option.")

	def log_in(self, username, password):
		while self.current_tries < self.try_limit:
			for account in self.account_list:
				if account.authenticate(username, password):
					self.current_tries = 0
					print(f"Welcome, {account.username}.")
					self.show_account_menu(account)
					return account

			self.current_tries += 1
			remaining = self.try_limit - self.current_tries
			if remaining <= 0:
				self.running = False
				print("You reached the maximum number of tries.")
				return None

			print(f"Invalid credentials. Attempts remaining: {remaining}.")
			username = input("Username: ")
			password = input("Password: ")

		return None

	def show_account_menu(self, account):
		while self.running and account.authenticated:
			print(f"\nBalance: {account.balance}")
			print("1. Deposit")
			print("2. Withdraw")
			print("3. Exit")
			choice = input("Choose an option: ").strip()

			if choice == "1":
				self._perform_transaction(account, "deposit")
			elif choice == "2":
				self._perform_transaction(account, "withdraw")
			elif choice == "3":
				account.authenticated = False
				print("You have been logged out.")
			else:
				print("Invalid option.")

	@staticmethod
	def _perform_transaction(account, action):
		try:
			amount = int(input("Amount: "))
			getattr(account, action)(amount)
			print(f"New balance: {account.balance}")
		except Exception as error:
			print(error)


if __name__ == "__main__":
	account = BankAccount(100, "alice", "python")
	account.authenticate("alice", "python")
	account.deposit(50)
	print(f"Example balance: {account.balance}")
