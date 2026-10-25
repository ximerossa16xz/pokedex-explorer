import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { getPokemonList, getPokemonDetail } from './src/api/pokeApi';

export default function App() {
  useEffect(() => {
    getPokemonList(3, 0).then((list) => console.log('LIST:', list));
    getPokemonDetail('Pikachu ').then((p) => console.log('DETAIL:', p));
    getPokemonDetail('noexiste').catch((e) => console.log('ERROR:', e.message));
  }, []); // empty array: runs only once

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Probando API, mira la terminal</Text>
    </View>
  );
}
