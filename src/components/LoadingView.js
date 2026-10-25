// src/components/LoadingView.js
// UI state: LOADING -> spinner + text
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingView({ message = "Cargando..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#E3350D" />
      <Text style={styles.text}>{message}</Text>
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
  text: { marginTop: 12, fontSize: 16, color: "#444" },
});
