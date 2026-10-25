// src/api/pokeApi.js
// Network layer: the ONLY place where fetch is used.
// Screens and components never call the API directly.

const BASE_URL = 'https://pokeapi.co/api/v2';
const ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

// CONCEPT: async/await + fetch to consume a REST API
export async function getPokemonList(limit = 20, offset = 0) {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  // CONCEPT: check response.ok before calling response.json()
  if (!response.ok) {
    throw new Error('LIST_ERROR');
  }

  const data = await response.json();

  // The list only returns name and url, so the id is extracted from the end of the url
  return data.results.map((item) => {
    const id = Number(item.url.split('/').filter(Boolean).pop());
    return {
      id,
      name: item.name,
      image: `${ARTWORK_URL}/${id}.png`,
    };
  });
}

export async function getPokemonDetail(nameOrId) {
  // The API needs lowercase names without extra spaces
  const query = String(nameOrId).trim().toLowerCase();
  const response = await fetch(`${BASE_URL}/pokemon/${query}`);

  // CONCEPT: a 404 answers with plain text (not JSON), so we stop before response.json()
  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }
  if (!response.ok) {
    throw new Error('DETAIL_ERROR');
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    height: data.height / 10, // decimeters -> meters
    weight: data.weight / 10, // hectograms -> kilograms
    types: data.types.map((t) => t.type.name),
    stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    image: data.sprites.other['official-artwork'].front_default,
  };
}