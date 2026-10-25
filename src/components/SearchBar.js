import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchBar({ value, onChangeText, onSearch }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
        placeholder="Busca por nombre o número..."
        placeholderTextColor="#888"
        autoCapitalize="none" // search ignores case, so no auto capital letter
        autoCorrect={false}
        returnKeyType="search"
      />
      <Pressable style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  button: {
    marginLeft: 8,
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#E3350D",
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
