// src/utils/format.js
// Pure helper functions (no React, no network).

// 25 -> "#025"
export const formatId = (id) => `#${String(id).padStart(3, "0")}`;

// "pikachu" -> "Pikachu"
export const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

// Spanish labels for the interface
export const STAT_LABELS = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque esp.",
  "special-defense": "Defensa esp.",
  speed: "Velocidad",
};

// One color per type
export const TYPE_COLORS = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};
