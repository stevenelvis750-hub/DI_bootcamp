my_list = [10, 20, 30, 40]
item = 25
index = 2

# Using list insert method
my_list.insert(index, item)
print(my_list)  # [10, 20, 25, 30, 40]


#Exercise 2
text = "Hello world welcome to Python"
space_count = text.count(" ")
print("Number of spaces:", space_count)



#Exercise 3
text = "Hello World!"

upper_count = sum(1 for char in text if char.isupper())
lower_count = sum(1 for char in text if char.islower())

print(f"Uppercase: {upper_count}, Lowercase: {lower_count}")


#Exercise 4
def my_sum(arr):
    total = 0
    for num in arr:
        total += num
    return total


print(my_sum([1, 5, 4, 2]))  # 12


#Exercise 5
def find_max(arr):
    if not arr:
        return None
    max_val = arr[0]
    for num in arr[1:]:
        if num > max_val:
            max_val = num
    return max_val


print(find_max([0, 1, 3, 50]))  # 50



#Exercise 6
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result


print(factorial(4))  # 24



#Exercise 7
def list_count(arr, target):
    count = 0
    for item in arr:
        if item == target:
            count += 1
    return count


print(list_count(["a", "a", "t", "o"], "a"))  # 2


#Exercise 8
import math


def norm(arr):
    # Euclidean norm: square root of the sum of squares
    squares_sum = sum(x**2 for x in arr)
    return int(math.sqrt(squares_sum))


print(norm([1, 2, 2]))  # 3


#Exercise 9
def is_mono(arr):
    increasing = True
    decreasing = True

    for i in range(len(arr) - 1):
        if arr[i] > arr[i + 1]:
            increasing = False
        if arr[i] < arr[i + 1]:
            decreasing = False

    return increasing or decreasing


print(is_mono([7, 6, 5, 5, 2, 0]))  # True
print(is_mono([2, 3, 3, 3]))  # True
print(is_mono([1, 2, 0, 4]))  # False


#Exercise 10
def print_longest_word(words):
    if not words:
        return
    longest = max(words, key=len)
    print("Longest word:", longest)


print_longest_word(["apple", "banana", "refrigerator", "cat"])


#Exercise 11
mixed_list = [10, "apple", 20, "banana", 30, "cherry"]

integers = [x for x in mixed_list if isinstance(x, int)]
strings = [x for x in mixed_list if isinstance(x, str)]

print("Integers:", integers)
print("Strings:", strings)


#Exercise 12
def is_palindrome(text):
    clean_text = text.lower()
    return clean_text == clean_text[::-1]


print(is_palindrome("radar"))  # True
print(is_palindrome("John"))  # False


#Exercise 13
def sum_over_k(sentence, k):
    words = sentence.split()
    return sum(1 for word in words if len(word) > k)


sentence = "Do or do not there is no try"
k = 2
print(sum_over_k(sentence, k))  # 3


#Exercise 14
def dict_avg(d):
    if not d:
        return 0
    return sum(d.values()) / len(d)


print(int(dict_avg({"a": 1, "b": 2, "c": 8, "d": 1})))  # 3


#Exercise 15
def common_div(a, b):
    # Excludes 1 based on example output [2, 5, 10]
    divisors = []
    min_val = min(a, b)
    for i in range(2, min_val + 1):
        if a % i == 0 and b % i == 0:
            divisors.append(i)
    return divisors


print(common_div(10, 20))  # [2, 5, 10]


#Exercise 16
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True


print(is_prime(11))  # True


#Exercise 17
def weird_print(arr):
    result = [val for idx, val in enumerate(arr) if idx % 2 == 0 and val % 2 == 0]
    print(result)


weird_print([1, 2, 2, 3, 4, 5])  # [2, 4]


#Exercise 18
def type_count(**kwargs):
    counts = {}
    for val in kwargs.values():
        val_type = type(val).__name__
        counts[val_type] = counts.get(val_type, 0) + 1

    formatted = ", ".join(f"{k}: {v}" for k, v in counts.items())
    return formatted


print(type_count(a=1, b="string", c=1.0, d=True, e=False))
# int: 1, str: 1, float: 1, bool: 2



#Exercise 19
def custom_split(text, delimiter=None):
    result = []
    current_chunk = ""

    if delimiter is None:
        # Default whitespace splitting behavior
        for char in text:
            if char.isspace():
                if current_chunk:
                    result.append(current_chunk)
                    current_chunk = ""
            else:
                current_chunk += char
        if current_chunk:
            result.append(current_chunk)
    else:
        # Custom delimiter splitting logic
        for char in text:
            if char == delimiter:
                result.append(current_chunk)
                current_chunk = ""
            else:
                current_chunk += char
        result.append(current_chunk)

    return result


print(custom_split("hello world python"))  # ['hello', 'world', 'python']
print(custom_split("apple,banana,cherry", ","))  # ['apple', 'banana', 'cherry']


#Exercise 20
def format_password(password):
    return "*" * len(password)


print(format_password("mypassword"))  # ***********