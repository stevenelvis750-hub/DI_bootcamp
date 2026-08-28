import random


class Game:
    ITEMS = ("rock", "paper", "scissors")
    WINNING_MATCHUPS = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper",
    }

    def get_user_item(self):
        while True:
            choice = input("Choose rock, paper, or scissors: ").strip().lower()
            if choice in self.ITEMS:
                return choice
            if choice in {"1", "2", "3"}:
                return self.ITEMS[int(choice) - 1]
            print("Invalid choice. Please choose rock, paper, or scissors.")

    def get_computer_item(self):
        return random.choice(self.ITEMS)

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        if self.WINNING_MATCHUPS[user_item] == computer_item:
            return "win"
        return "loss"

    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)

        print(f"\nYou chose: {user_item}")
        print(f"Computer chose: {computer_item}")
        print(f"Result: {result.title()}!")
        return result
