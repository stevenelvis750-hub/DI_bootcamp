class GameOfLife:
	"""Run Conway's Game of Life on a fixed-size grid."""

	LIVE = "O"
	DEAD = "."

	def __init__(self, initial_state, max_generations=20):
		if not initial_state or not initial_state[0]:
			raise ValueError("The initial state cannot be empty.")

		self.rows = len(initial_state)
		self.columns = len(initial_state[0])
		self.max_generations = max_generations
		self.grid = self._make_grid(initial_state)

	def _make_grid(self, state):
		if any(len(row) != self.columns for row in state):
			raise ValueError("Every row must have the same number of cells.")

		return [
			[self._normalize_cell(cell) for cell in row]
			for row in state
		]

	def _normalize_cell(self, cell):
		if cell in (self.LIVE, 1, True):
			return self.LIVE
		if cell in (self.DEAD, 0, False):
			return self.DEAD
		raise ValueError("Cells must be 'O', '.', 1, or 0.")

	def display(self, generation):
		print(f"Generation {generation}")
		print("+" + "-" * self.columns + "+")
		for row in self.grid:
			print("|" + "".join(row) + "|")
		print("+" + "-" * self.columns + "+")

	def _live_neighbours(self, row, column):
		live_neighbours = 0

		for row_offset in (-1, 0, 1):
			for column_offset in (-1, 0, 1):
				if row_offset == 0 and column_offset == 0:
					continue

				neighbour_row = row + row_offset
				neighbour_column = column + column_offset
				inside_grid = (
					0 <= neighbour_row < self.rows
					and 0 <= neighbour_column < self.columns
				)
				if inside_grid and self.grid[neighbour_row][neighbour_column] == self.LIVE:
					live_neighbours += 1

		return live_neighbours

	def next_generation(self):
		next_grid = []

		for row in range(self.rows):
			next_row = []
			for column in range(self.columns):
				neighbours = self._live_neighbours(row, column)
				cell_is_alive = self.grid[row][column] == self.LIVE

				survives = cell_is_alive and neighbours in (2, 3)
				is_born = not cell_is_alive and neighbours == 3
				next_row.append(self.LIVE if survives or is_born else self.DEAD)
			next_grid.append(next_row)

		self.grid = next_grid

	def _state(self):
		return tuple(tuple(row) for row in self.grid)

	def is_extinct(self):
		return all(cell == self.DEAD for row in self.grid for cell in row)

	def run(self):
		seen_states = set()

		for generation in range(self.max_generations + 1):
			self.display(generation)
			current_state = self._state()

			if self.is_extinct():
				print("The population is extinct.")
				break
			if current_state in seen_states:
				print("The population has reached a repeating state.")
				break

			seen_states.add(current_state)
			if generation == self.max_generations:
				print("Generation limit reached.")
				break
			self.next_generation()


if __name__ == "__main__":
	blinker = [
		".....",
		".....",
		".OOO.",
		".....",
		".....",
	]

	GameOfLife(blinker, max_generations=6).run()
