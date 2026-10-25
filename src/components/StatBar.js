// src/components/StatBar.js
import { StyleSheet, Text, View } from 'react-native';
import { STAT_LABELS } from '../utils/format';

const MAX_STAT = 255; // maximum possible base stat

export default function StatBar({ name, value }) {
  const widthPercent = `${(value / MAX_STAT) * 100}%`;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{STAT_LABELS[name] || name}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: widthPercent }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  label: { width: 110, fontWeight: '600' },
  value: { width: 36, textAlign: 'right', marginRight: 8 },
  track: { flex: 1, height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, overflow: 'hidden' },
  fill: { height: 10, backgroundColor: '#E3350D', borderRadius: 5 },
});
