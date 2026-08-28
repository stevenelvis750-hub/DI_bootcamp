from game import Game


def get_user_menu_choice():
    menu_options = {
        "1": "play",
        "2": "scores",
        "3": "quit",
    }

    while True:
        print("\nRock Paper Scissors")
        print("1. Play a new game")
        print("2. Show scores")
        print("3. Quit")
        choice = input("Choose an option: ").strip().lower()
        if choice in menu_options:
            return menu_options[choice]
        print("Invalid option. Please choose 1, 2, or 3.")


def print_results(results):
    print("\nFinal scores")
    print(f"Wins: {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws: {results['draw']}")
    print("Thanks for playing!")


def main():
    results = {"win": 0, "loss": 0, "draw": 0}

    while True:
        choice = get_user_menu_choice()
        if choice == "play":
            result = Game().play()
            results[result] += 1
        elif choice == "scores":
            print_results(results)
        else:
            print_results(results)
            break


if __name__ == "__main__":
    main()
