def create_board():
    """Step 1: Representing the Game Board as a 3x3 grid of spaces."""
    return [[" " for _ in range(3)] for _ in range(3)]


def display_board(board):
    """Step 2: Displaying the Game Board visually."""
    print("\n   1   2   3")
    print("  " + "---+" * 2 + "---")
    for idx, row in enumerate(board):
        row_str = f"{idx + 1}  " + " | ".join(row)
        print(row_str)
        if idx < 2:
            print("  " + "---+" * 2 + "---")
    print()


def player_input(board, player):
    """Step 3: Getting and validating Player Input."""
    while True:
        try:
            user_move = input(
                f"Player {player}, enter row and column (e.g., 1 2 or 1,2): "
            )

            # Standardize input separation for commas or spaces
            clean_input = user_move.replace(",", " ").split()

            if len(clean_input) != 2:
                print(
                    "Invalid format! Please enter two numbers (row and column)."
                )
                continue

            row, col = int(clean_input[0]) - 1, int(clean_input[1]) - 1

            if not (0 <= row <= 2 and 0 <= col <= 2):
                print(
                    "Position out of bounds! Choose numbers between 1 and 3."
                )
            elif board[row][col] != " ":
                print("That square is already occupied! Choose an empty one.")
            else:
                return row, col
        except ValueError:
            print("Invalid input! Please enter numbers only.")


def check_win(board, player):
    """Step 4: Checking for a Winner across rows, columns, and diagonals."""
    # Check rows and columns
    for i in range(3):
        if all(board[i][j] == player for j in range(3)):  # Row check
            return True
        if all(board[j][i] == player for j in range(3)):  # Column check
            return True

    # Check diagonals
    if all(board[i][i] == player for i in range(3)):  # Main diagonal
        return True
    if all(board[i][2 - i] == player for i in range(3)):  # Anti-diagonal
        return True

    return False


def check_tie(board):
    """Step 5: Checking for a Tie when the board is full with no winner."""
    return all(cell != " " for row in board for cell in row)


def play():
    """Step 6: The Main Game Loop."""
    board = create_board()
    current_player = "X"

    print("Welcome to Tic Tac Toe!")

    while True:
        display_board(board)

        # Get player move
        row, col = player_input(board, current_player)
        board[row][col] = current_player

        # Check for victory
        if check_win(board, current_player):
            display_board(board)
            print(f"🎉 Player {current_player} wins the game!")
            break

        # Check for tie
        if check_tie(board):
            display_board(board)
            print("🤝 It's a tie! The board is full.")
            break

        # Switch player
        current_player = "O" if current_player == "X" else "X"


# Start the game
if __name__ == "__main__":
    play()


    