import re

MATRIX_STR = """
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%"""

# Step 1: Convert matrix_string to a 2D list (matrix)
# Strip leading/trailing newlines and split by line
rows = MATRIX_STR.strip("\n").split("\n")
matrix = [list(row) for row in rows]

num_rows = len(matrix)
num_cols = len(matrix[0])

# Step 2 & 3: Read column-by-column (top to bottom)
raw_column_text = ""
for col in range(num_cols):
    for row in range(num_rows):
        # Handle cases where rows might be shorter than num_cols
        if col < len(matrix[row]):
            raw_column_text += matrix[row][col]

# Step 4: Replace non-alphanumeric/symbol sequences between two alpha characters with a space
# Regex breakdown:
# (?<=[a-zA-Z]) -> lookbehind: preceded by an alpha character
# [^a-zA-Z]+    -> one or more non-alpha characters
# (?=[a-zA-Z])  -> lookahead: followed by an alpha character
decoded_message = re.sub(r"(?<=[a-zA-Z])[^a-zA-Z]+(?=[a-zA-Z])", " ", raw_column_text)

# Step 5: Print the decoded message
print(decoded_message)