// src/screens/DetailScreen.js
import { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getPokemonDetail } from '../api/pokeApi';
import ErrorView from '../components/ErrorView';
import LoadingView from '../components/LoadingView';
import StatBar from '../components/StatBar';
import TypeBadge from '../components/TypeBadge';
import { capitalize, formatId } from '../utils/format';

export default function DetailScreen({ query, onBack }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // null | 'NOT_FOUND' | 'ERROR'
  const [attempt, setAttempt] = useState(0); // changing it re-runs the effect (retry)

  // CONCEPT: useEffect with dependencies -> the request runs only when query or attempt change
  useEffect(() => {
    let cancelled = false; // avoids updating state if the screen changed meanwhile

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonDetail(query);
        if (!cancelled) setPokemon(data);
      } catch (e) {
        if (!cancelled) setError(e.message === 'NOT_FOUND' ? 'NOT_FOUND' : 'ERROR');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true; // cleanup function
    };
  }, [query, attempt]);

  // UI state: loading
  if (loading) return <LoadingView message="Cargando ficha..." />;

  // UI state: no results (name does not exist)
  if (error === 'NOT_FOUND') {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Sin resultados</Text>
        <Text style={styles.message}>No encontramos ningún Pokémon con "{String(query)}".</Text>
        <Button title="Volver a la lista" onPress={onBack} color="#E3350D" />
      </View>
    );
  }

  // UI state: error (message + Reintentar)
  if (error === 'ERROR') {
    return (
      <View style={styles.flex}>
        <ErrorView
          message="No pudimos cargar la ficha. Revisa tu conexión e inténtalo de nuevo."
          onRetry={() => setAttempt((n) => n + 1)}
        />
        <View style={styles.backWrapper}>
          <Button title="Volver a la lista" onPress={onBack} color="#555" />
        </View>
      </View>
    );
  }

  // UI state: success
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Remote image: explicit width and height */}
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.id}>{formatId(pokemon.id)}</Text>
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

      <View style={styles.types}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </View>

      <Text style={styles.measure}>Altura: {pokemon.height} m</Text>
      <Text style={styles.measure}>Peso: {pokemon.weight} kg</Text>

      <Text style={styles.section}>Estadísticas base</Text>
      <View style={styles.stats}>
        {pokemon.stats.map((stat) => (
          <StatBar key={stat.name} name={stat.name} value={stat.value} />
        ))}
      </View>

      <Button title="Volver a la lista" onPress={onBack} color="#E3350D" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  message: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 16 },
  backWrapper: { padding: 16 },
  content: { alignItems: 'center', padding: 20 },
  image: { width: 240, height: 240 },
  id: { color: '#888', fontWeight: '600', marginTop: 4 },
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  types: { flexDirection: 'row', marginBottom: 12 },
  measure: { fontSize: 16, marginVertical: 2 },
  section: { fontSize: 20, fontWeight: 'bold', marginTop: 16, alignSelf: 'flex-start' },
  stats: { alignSelf: 'stretch', marginVertical: 10 },
});