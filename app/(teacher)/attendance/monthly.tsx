import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

type MonthlyRow = {
  student_id: number;
  name: string;
  roll_no: string;
  present_days: number;
  absent_days: number;
  late_days: number;
};

export default function MonthlyReport() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<MonthlyRow[]>([]);

  async function loadMonthly() {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/api/attendance/monthly?month=${month}`
      );
      const data = await res.json();
      setRecords(data);
    } catch (e) {
      console.log("Monthly error:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMonthly();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Attendance</Text>

      {/* Month Input */}
      <TextInput
        style={styles.monthBox}
        value={month}
        onChangeText={setMonth}
        placeholder="YYYY-MM"
      />

      <TouchableOpacity style={styles.loadBtn} onPress={loadMonthly}>
        <Text style={styles.loadText}>Load Report</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.student_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>Roll: {item.roll_no}</Text>

              <View style={styles.row}>
                <View style={[styles.box, { backgroundColor: "#4CAF50" }]}>
                  <Text style={styles.boxNum}>{item.present_days}</Text>
                  <Text style={styles.boxLabel}>Present</Text>
                </View>

                <View style={[styles.box, { backgroundColor: "#E53935" }]}>
                  <Text style={styles.boxNum}>{item.absent_days}</Text>
                  <Text style={styles.boxLabel}>Absent</Text>
                </View>

                <View style={[styles.box, { backgroundColor: "#FFA000" }]}>
                  <Text style={styles.boxNum}>{item.late_days}</Text>
                  <Text style={styles.boxLabel}>Late</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
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

  title: { fontSize: 26, fontWeight: "700", marginBottom: 12 },

  monthBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
  },

  loadBtn: {
    backgroundColor: "#f4c542",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  loadText: { fontWeight: "700", fontSize: 16 },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4,
  },

  name: { fontSize: 20, fontWeight: "700" },
  sub: { marginTop: 4, color: "#555" },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  box: {
    width: "31%",
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: "center",
  },

  boxNum: { color: "white", fontSize: 22, fontWeight: "800" },
  boxLabel: { color: "white", marginTop: 5, fontWeight: "600" },
});
