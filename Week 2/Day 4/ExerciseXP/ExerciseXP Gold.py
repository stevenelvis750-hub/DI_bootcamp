import json
from pathlib import Path


class MenuManager:
    def __init__(self, menu_file=None):
        self.menu_file = (
            Path(__file__).with_name("restaurant_menu.json")
            if menu_file is None
            else Path(menu_file)
        )
        with self.menu_file.open("r", encoding="utf-8") as file:
            self.menu = json.load(file)

    def add_item(self, name, price):
        self.menu.setdefault("items", []).append({"name": name, "price": price})

    def remove_item(self, name):
        for index, item in enumerate(self.menu.get("items", [])):
            if item["name"].lower() == name.lower():
                del self.menu["items"][index]
                return True
        return False

    def save_to_file(self):
        with self.menu_file.open("w", encoding="utf-8") as file:
            json.dump(self.menu, file, indent=2)
            file.write("\n")
