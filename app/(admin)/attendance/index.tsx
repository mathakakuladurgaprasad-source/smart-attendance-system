import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

type Attendance = {
  id: number;
  name: string;
  roll_no: string;
  status: string;
  method: string;
};

export default function AttendanceReport() {
  const [date, setDate] = useState("");
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadByDate() {
    if (!date) {
      alert("Please enter date (YYYY-MM-DD)");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/api/attendance/by-date?date=${date}`
      );
      const data = await res.json();

      setRecords(data);
    } catch (err) {
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Report</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.searchBtn} onPress={loadByDate}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.empty}>No records found</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.line}>Roll: {item.roll_no}</Text>
              <Text style={styles.line}>Status: {item.status}</Text>
              <Text style={styles.line}>Method: {item.method}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, padding: 20, flex: 1, backgroundColor: "#f6f0da" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchBtn: {
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  searchText: { fontWeight: "700", fontSize: 18 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: "700" },
  line: { marginTop: 4, color: "#555" },
  empty: {
    marginTop: 30,
    fontSize: 16,
    textAlign: "center",
    color: "#888",
  },
  backBtn: {
    marginTop: 15,
    backgroundColor: "#ddd",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  backText: { fontSize: 16, fontWeight: "600" },
});
