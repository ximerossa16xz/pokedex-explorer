// src/components/TypeBadge.js
import { StyleSheet, Text, View } from 'react-native';
import { capitalize, TYPE_COLORS } from '../utils/format';

export default function TypeBadge({ type }) {
  return (
    <View style={[styles.badge, { backgroundColor: TYPE_COLORS[type] || '#999' }]}>
      <Text style={styles.text}>{capitalize(type)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, marginHorizontal: 4 },
  text: { color: '#fff', fontWeight: 'bold' },
});