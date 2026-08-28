import importlib


MenuManager = importlib.import_module("menu_manager").MenuManager


manager = None


def load_manager():
    global manager
    manager = MenuManager()
    return manager


def show_user_menu():
    while True:
        print("\nRestaurant Menu Manager")
        print("1. Show restaurant menu")
        print("2. Add an item")
        print("3. Delete an item")
        print("4. Exit")
        choice = input("Choose an option: ").strip()

        if choice == "1":
            show_restaurant_menu()
        elif choice == "2":
            add_item_to_menu()
        elif choice == "3":
            remove_item_from_menu()
        elif choice == "4":
            manager.save_to_file()
            print("The menu was saved.")
            return
        else:
            print("Invalid choice.")


def add_item_to_menu():
    name = input("Item name: ").strip()
    price_text = input("Item price: ").strip()
    try:
        price = float(price_text)
    except ValueError:
        print("The price must be a number.")
        return
    manager.add_item(name, price)
    print("item was added successfully")


def remove_item_from_menu():
    name = input("Name of the item to delete: ").strip()
    if manager.remove_item(name):
        print("The item was deleted successfully.")
    else:
        print("There was an error: item not found.")


def show_restaurant_menu():
    print("\nRestaurant menu")
    for item in manager.menu.get("items", []):
        print(f"- {item['name']}: {item['price']}")


if __name__ == "__main__":
    load_manager()
    show_user_menu()
