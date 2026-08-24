class Phone:
	def __init__(self, phone_number):
		self.phone_number = phone_number
		self.call_history = []
		self.messages = []

	def call(self, other_phone):
		call_record = f"{self.phone_number} called {other_phone.phone_number}"
		print(call_record)
		self.call_history.append(call_record)

	def show_call_history(self):
		print(self.call_history)

	def send_message(self, other_phone, content):
		message = {
			"to": other_phone.phone_number,
			"from": self.phone_number,
			"content": content,
		}
		self.messages.append(message)
		other_phone.messages.append(message)

	def show_outgoing_messages(self):
		outgoing_messages = [
			message for message in self.messages
			if message["from"] == self.phone_number
		]
		print(outgoing_messages)

	def show_incoming_messages(self):
		incoming_messages = [
			message for message in self.messages
			if message["to"] == self.phone_number
		]
		print(incoming_messages)

	def show_messages_from(self, phone_number):
		messages = [
			message for message in self.messages
			if message["from"] == phone_number
		]
		print(messages)


if __name__ == "__main__":
	phone_a = Phone("111-1111")
	phone_b = Phone("222-2222")

	phone_a.call(phone_b)
	phone_a.show_call_history()

	phone_a.send_message(phone_b, "Hello from phone A")
	phone_b.send_message(phone_a, "Hello from phone B")

	phone_a.show_outgoing_messages()
	phone_a.show_incoming_messages()
	phone_a.show_messages_from(phone_b.phone_number)
