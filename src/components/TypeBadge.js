// src/components/TypeBadge.js
import { StyleSheet, Text, View } from 'react-native';
import { capitalize, TYPE_COLORS } from '../utils/format';

const TYPE_LABELS = {
  fire: 'Fuego', water: 'Agua', grass: 'Planta', electric: 'Eléctrico',
  psychic: 'Psíquico', ice: 'Hielo', dragon: 'Dragón', dark: 'Siniestro',
  fairy: 'Hada', normal: 'Normal', fighting: 'Lucha', flying: 'Volador',
  poison: 'Veneno', ground: 'Tierra', rock: 'Roca', bug: 'Bicho',
  ghost: 'Fantasma', steel: 'Acero',
};

export default function TypeBadge({ type }) {
  return (
    <View style={[styles.badge, { backgroundColor: TYPE_COLORS[type] || '#999' }]}>
      <Text style={styles.text}>{TYPE_LABELS[type] || capitalize(type)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, marginHorizontal: 4 },
  text: { color: '#fff', fontWeight: 'bold' },
});