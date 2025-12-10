import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

type SummaryResponse = {
  present_count: number;
  absent_count: number;
};

export default function AttendanceSummary() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadSummary() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/attendance/summary");
      const data = await res.json();
      setSummary(data);
    } catch (e) {
      console.log("Error loading summary:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Attendance Summary</Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <View style={styles.cardBox}>
          <View style={[styles.card, { backgroundColor: "#4CAF50" }]}>
            <Text style={styles.number}>{summary?.present_count}</Text>
            <Text style={styles.label}>Present</Text>
          </View>

          <View style={[styles.card, { backgroundColor: "#E53935" }]}>
            <Text style={styles.number}>{summary?.absent_count}</Text>
            <Text style={styles.label}>Absent</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.refreshBtn}
        onPress={loadSummary}
      >
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 20,
    flex: 1,
    backgroundColor: "#f6f0da",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 25,
  },

  cardBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: "47%",
    padding: 30,
    borderRadius: 15,
    elevation: 6,
    alignItems: "center",
  },

  number: {
    fontSize: 40,
    fontWeight: "800",
    color: "white",
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginTop: 8,
  },

  refreshBtn: {
    backgroundColor: "#f4c542",
    marginTop: 30,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  refreshText: {
    fontSize: 18,
    fontWeight: "700",
  },

  backBtn: {
    marginTop: 15,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#ddd",
    alignItems: "center",
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
