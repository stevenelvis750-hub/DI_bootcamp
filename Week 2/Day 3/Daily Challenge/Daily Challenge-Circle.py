from functools import wraps
from math import pi


def accepts_radius_or_diameter(initializer):
	"""Allow Circle construction with either radius or diameter."""
	@wraps(initializer)
	def wrapper(self, radius=None, diameter=None):
		if (radius is None) == (diameter is None):
			raise TypeError("Provide exactly one of radius or diameter")
		value = radius if radius is not None else diameter / 2
		initializer(self, value)

	return wrapper


class Circle:
	@accepts_radius_or_diameter
	def __init__(self, radius):
		if radius <= 0:
			raise ValueError("radius must be greater than zero")
		self.radius = float(radius)

	@property
	def diameter(self):
		return self.radius * 2

	def area(self):
		return pi * self.radius ** 2

	def __str__(self):
		return f"Circle(radius={self.radius:g}, diameter={self.diameter:g})"

	__repr__ = __str__

	def __add__(self, other):
		if not isinstance(other, Circle):
			return NotImplemented
		return Circle(radius=self.radius + other.radius)

	def __gt__(self, other):
		if not isinstance(other, Circle):
			return NotImplemented
		return self.radius > other.radius

	def __eq__(self, other):
		if not isinstance(other, Circle):
			return NotImplemented
		return self.radius == other.radius

	def __lt__(self, other):
		if not isinstance(other, Circle):
			return NotImplemented
		return self.radius < other.radius


if __name__ == "__main__":
	circles = [Circle(radius=3), Circle(diameter=10), Circle(radius=2)]
	print(sorted(circles))
	print(circles[0] + circles[1])
