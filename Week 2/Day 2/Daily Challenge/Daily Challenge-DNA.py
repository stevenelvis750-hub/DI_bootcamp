import random


class Gene:
	def __init__(self, value=None):
		self.value = random.randint(0, 1) if value is None else value

	def mutate(self):
		self.value = 1 - self.value

	def __repr__(self):
		return str(self.value)


class Chromosome:
	def __init__(self, genes=None):
		self.genes = genes if genes is not None else [Gene() for _ in range(10)]

	def mutate(self):
		for gene in self.genes:
			if random.choice((True, False)):
				gene.mutate()

	def is_all_ones(self):
		return all(gene.value == 1 for gene in self.genes)

	def __repr__(self):
		return "".join(str(gene.value) for gene in self.genes)


class DNA:
	def __init__(self, chromosomes=None):
		self.chromosomes = (
			chromosomes
			if chromosomes is not None
			else [Chromosome() for _ in range(10)]
		)

	def mutate(self):
		for chromosome in self.chromosomes:
			chromosome.mutate()

	def is_all_ones(self):
		return all(chromosome.is_all_ones() for chromosome in self.chromosomes)

	def __repr__(self):
		return "\n".join(str(chromosome) for chromosome in self.chromosomes)


class Organism:
	def __init__(self, dna, environment):
		self.dna = dna
		self.environment = environment

	def mutate(self):
		if random.random() < self.environment:
			self.dna.mutate()


def run_experiment(population_size=20, environment=0.1, max_generations=10000):
	organisms = [Organism(DNA(), environment) for _ in range(population_size)]

	for generation in range(max_generations + 1):
		for organism in organisms:
			if organism.dna.is_all_ones():
				return generation, organism
		for organism in organisms:
			organism.mutate()

	return None, None


if __name__ == "__main__":
	generations, successful_organism = run_experiment()

	print("Biology research results")
	if successful_organism is None:
		print("No organism reached an all-ones DNA sequence within the limit.")
	else:
		print(f"Generations required: {generations}")
		print("Successful DNA:")
		print(successful_organism.dna)
		print("Conclusion: Random mutation can produce the target DNA, but the process is unlikely and can require many generations.")
