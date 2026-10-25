// App.js
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DetailScreen from "./src/screens/DetailScreen";
import ListScreen from "./src/screens/ListScreen";

export default function App() {
  // CONCEPT: useState to switch between the two views (no navigation library)
  const [view, setView] = useState("list"); // 'list' | 'detail'
  const [query, setQuery] = useState(null); // id or name to show in the detail

  const openDetail = (value) => {
    setQuery(value);
    setView("detail");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <StatusBar style="dark" />

        {/* The list stays mounted (only hidden) so it keeps its scroll and loaded pages */}
        <View style={{ flex: 1, display: view === "list" ? "flex" : "none" }}>
          <ListScreen
            onSelectPokemon={(pokemon) => openDetail(pokemon.id)}
            onSearch={openDetail}
          />
        </View>

        {view === "detail" && (
          <DetailScreen query={query} onBack={() => setView("list")} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
