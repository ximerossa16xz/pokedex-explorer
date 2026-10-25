import { Image, Pressable, StyleSheet, Text } from "react-native";
import { capitalize, formatId } from "../utils/format";

export default function PokemonCard({ pokemon, onPress }) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(pokemon.id)}>
      {/* CONCEPT: remote Image needs explicit width and height */}
      <Image
        source={{ uri: pokemon.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.id}>{formatId(pokemon.id)}</Text>
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "46%",
    margin: "2%",
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: 110, height: 110 },
  id: { marginTop: 6, color: "#888", fontSize: 13 },
  name: { fontSize: 17, fontWeight: "bold", marginTop: 2 },
});
