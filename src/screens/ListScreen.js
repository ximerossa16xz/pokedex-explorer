// src/screens/ListScreen.js
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getPokemonList } from "../api/pokeApi";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

const PAGE_SIZE = 20;

export default function ListScreen({ onSelectPokemon, onSearch }) {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true); // first load
  const [loadingMore, setLoadingMore] = useState(false); // infinite scroll
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");

  // CONCEPT: async/await with loading, success and error handling
  const loadPage = useCallback(async (pageOffset) => {
    try {
      setError(null);
      if (pageOffset === 0) setLoading(true);
      else setLoadingMore(true);

      const data = await getPokemonList(PAGE_SIZE, pageOffset);

      setPokemon((prev) => (pageOffset === 0 ? data : [...prev, ...data]));
      setOffset(pageOffset + PAGE_SIZE);
      if (data.length < PAGE_SIZE) setHasMore(false);
    } catch (e) {
      setError(
        "No pudimos cargar los Pokémon. Revisa tu conexión e inténtalo de nuevo.",
      );
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // CONCEPT: useEffect with an empty dependency array -> runs only once, on mount
  useEffect(() => {
    loadPage(0);
  }, [loadPage]);

  // CONCEPT: onEndReached -> infinite scroll
  const handleEndReached = () => {
    if (loading || loadingMore || !hasMore || error) return;
    loadPage(offset);
  };

  const handleSearch = () => {
    const text = query.trim();
    if (text === "") return;
    onSearch(text);
  };

  if (loading) return <LoadingView message="Cargando Pokémon..." />;

  if (error && pokemon.length === 0) {
    return <ErrorView message={error} onRetry={() => loadPage(0)} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokéDex Explorer</Text>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSearch={handleSearch}
      />

      {/* CONCEPT: FlatList (numColumns, keyExtractor, onEndReached) instead of ScrollView + map */}
      <FlatList
        data={pokemon}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} onPress={onSelectPokemon} />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="large"
              color="#E3350D"
              style={styles.footer}
            />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  list: { paddingHorizontal: 6, paddingBottom: 16 },
  footer: { marginVertical: 16 },
});
