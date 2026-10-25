import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ErrorView({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Reintentar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emoji: { fontSize: 40, marginBottom: 8 },
  message: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#E3350D",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
