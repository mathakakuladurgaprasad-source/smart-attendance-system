import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function AttendanceReport() {
  const [summary, setSummary] = useState<{ present_count?: number; absent_count?: number }>({});
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/attendance/summary")
      .then((res) => res.json())
      .then(setSummary)
      .catch(() => {});

    fetch("http://localhost:4000/api/attendance")
      .then((res) => res.json())
      .then(setRecords)
      .catch(() => {});
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const todayRecords = records.filter((r) => r.date?.slice(0, 10) === today);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today Attendance Report</Text>
      <View style={styles.row}>
        <View style={[styles.statCard, { backgroundColor: "#B2F2BB" }]}>
          <Text style={styles.statLabel}>Present</Text>
          <Text style={styles.statValue}>{summary.present_count ?? 0}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: "#FFC9C9" }]}>
          <Text style={styles.statLabel}>Absent</Text>
          <Text style={styles.statValue}>{summary.absent_count ?? 0}</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Today Students</Text>

      <FlatList
        data={todayRecords}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>
              {item.name} ({item.roll_no})
            </Text>
            <Text
              style={[
                styles.status,
                item.status === "Present" ? styles.present : styles.absent,
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f0da", padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  statCard: { flex: 1, marginHorizontal: 4, borderRadius: 12, padding: 14 },
  statLabel: { fontSize: 14, color: "#333" },
  statValue: { fontSize: 22, fontWeight: "700", marginTop: 4 },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: { fontSize: 16, fontWeight: "600" },
  status: { fontSize: 14, fontWeight: "700" },
  present: { color: "green" },
  absent: { color: "red" },
});
