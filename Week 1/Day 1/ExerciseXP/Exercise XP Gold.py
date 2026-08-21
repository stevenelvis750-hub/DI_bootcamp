print("Hello world\n" * 4 + "I love python\n" * 4, end="")

month = int(input("Enter a month (1-12): "))

if month in (3, 4, 5):
	print("Spring")
elif month in (6, 7, 8):
	print("Summer")
elif month in (9, 10, 11):
	print("Autumn")
else:
	print("Winter")
