import random


class Gene:
	def __init__(self, value=None):
		self.value = random.randint(0, 1) if value is None else value
		if self.value not in (0, 1):
			raise ValueError("A gene must be either 0 or 1.")

	def mutate(self):
		self.value = 1 - self.value

	def __repr__(self):
		return str(self.value)


class Chromosome:
	def __init__(self, genes=None):
		self.genes = list(genes) if genes is not None else [Gene() for _ in range(10)]
		if len(self.genes) != 10 or not all(isinstance(gene, Gene) for gene in self.genes):
			raise ValueError("A chromosome must contain exactly 10 genes.")

	def mutate(self):
		for gene in self.genes:
			if random.random() < 0.5:
				gene.mutate()

	def is_all_ones(self):
		return all(gene.value == 1 for gene in self.genes)

	def __repr__(self):
		return "".join(str(gene.value) for gene in self.genes)


class DNA:
	def __init__(self, chromosomes=None):
		self.chromosomes = (
			list(chromosomes)
			if chromosomes is not None
			else [Chromosome() for _ in range(10)]
		)
		if len(self.chromosomes) != 10 or not all(
			isinstance(chromosome, Chromosome)
			for chromosome in self.chromosomes
		):
			raise ValueError("DNA must contain exactly 10 chromosomes.")

	def mutate(self):
		for chromosome in self.chromosomes:
			chromosome.mutate()

	def is_all_ones(self):
		return all(chromosome.is_all_ones() for chromosome in self.chromosomes)

	def __repr__(self):
		return "\n".join(str(chromosome) for chromosome in self.chromosomes)


class Organism:
	def __init__(self, dna, environment):
		if not isinstance(dna, DNA):
			raise TypeError("dna must be a DNA object.")
		if not isinstance(environment, (int, float)) or isinstance(environment, bool):
			raise ValueError("environment must be a probability from 0 to 1.")
		if not 0 <= environment <= 1:
			raise ValueError("environment must be a probability from 0 to 1.")
		self.dna = dna
		self.environment = environment

	def mutate(self):
		if random.random() < self.environment:
			self.dna.mutate()


def run_experiment(population_size=20, environment=0.1, max_generations=10000):
	if population_size <= 0 or max_generations < 0:
		raise ValueError("Population size must be positive and generations cannot be negative.")

	organisms = [Organism(DNA(), environment) for _ in range(population_size)]

	for generation in range(max_generations + 1):
		for organism in organisms:
			if organism.dna.is_all_ones():
				return generation, organism

		for organism in organisms:
			organism.mutate()

	return None, None


def print_research_results(generations, organism):
	print("Biology research results")
	if organism is None:
		print("No organism reached an all-ones DNA sequence within the limit.")
		print(
			"Conclusion: Without selection, random mutation is a random walk. "
			"Reaching 100 ones is possible, but extremely unlikely in a small experiment."
		)
	else:
		print(f"Generations required: {generations}")
		print("Successful DNA:")
		print(organism.dna)
		print(
			"Conclusion: The population reached the target through random mutation. "
			"The number of generations varies between experiments."
		)


if __name__ == "__main__":
	generations, successful_organism = run_experiment()
	print_research_results(generations, successful_organism)
