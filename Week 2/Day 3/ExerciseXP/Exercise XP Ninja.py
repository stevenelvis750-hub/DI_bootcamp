from __future__ import annotations

import random
from abc import ABC, abstractmethod
from typing import Optional


class Temperature(ABC):
	"""Base class for temperatures represented internally in Celsius."""

	def __init__(self, value: float) -> None:
		self.value = float(value)

	@property
	@abstractmethod
	def celsius(self) -> float:
		"""Return this temperature in Celsius."""

	@classmethod
	@abstractmethod
	def from_celsius(cls, value: float) -> Temperature:
		"""Create an instance from a Celsius value."""

	def convert_to(self, target: type[Temperature]) -> Temperature:
		if not issubclass(target, Temperature):
			raise TypeError("target must be a Temperature subclass")
		return target.from_celsius(self.celsius)

	def __repr__(self) -> str:
		return f"{type(self).__name__}({self.value:g})"


class Celsius(Temperature):
	@property
	def celsius(self) -> float:
		return self.value

	@classmethod
	def from_celsius(cls, value: float) -> Celsius:
		return cls(value)


class Kelvin(Temperature):
	@property
	def celsius(self) -> float:
		return self.value - 273.15

	@classmethod
	def from_celsius(cls, value: float) -> Kelvin:
		return cls(value + 273.15)


class Fahrenheit(Temperature):
	@property
	def celsius(self) -> float:
		return (self.value - 32) * 5 / 9

	@classmethod
	def from_celsius(cls, value: float) -> Fahrenheit:
		return cls(value * 9 / 5 + 32)


class QuantumParticle:
	def __init__(
		self,
		x: Optional[int] = None,
		y: Optional[float] = None,
		p: Optional[float] = None,
	) -> None:
		self._position = x if x is not None else random.randint(1, 10_000)
		self._momentum = y if y is not None else random.random()
		self._spin = p if p in (0.5, -0.5) else random.choice((0.5, -0.5))
		self._entangled_particle: Optional[QuantumParticle] = None

	def _disturb(self) -> None:
		self._position = random.randint(1, 10_000)
		self._momentum = random.random()
		print("Quantum Interferences!!")

	def position(self) -> int:
		self._position = random.randint(1, 10_000)
		self._disturb()
		return self._position

	def momentum(self) -> float:
		self._momentum = random.random()
		self._disturb()
		return self._momentum

	def spin(self) -> float:
		self._spin = random.choice((0.5, -0.5))
		if self._entangled_particle is not None:
			self._entangled_particle._spin = -self._spin
		self._disturb()
		return self._spin

	def entangle(self, other: QuantumParticle) -> None:
		if not isinstance(other, QuantumParticle):
			raise TypeError("A particle can only be entangled with another QuantumParticle")
		if other is self:
			raise ValueError("A particle cannot be entangled with itself")
		self._entangled_particle = other
		other._entangled_particle = self
		print("Spooky Action at a Distance !!")

	def __repr__(self) -> str:
		return (
			f"QuantumParticle(position={self._position}, "
			f"momentum={self._momentum:.3f}, spin={self._spin:+.1f})"
		)
