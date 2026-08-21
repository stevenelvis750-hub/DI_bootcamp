x = int(input("Enter the Number: "))

# Sum all proper divisors (numbers from 1 up to x-1 that divide x evenly)
divisors_sum = sum(i for i in range(1, x) if x % i == 0)

# Print True if the sum equals x, otherwise False
print(divisors_sum == x)