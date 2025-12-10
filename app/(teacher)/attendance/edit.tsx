import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

type AttendanceRow = {
  id: number;
  student_id: number;
  name: string;
  roll_no: string;
  status: string;
};

export default function EditAttendance() {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // YYYY-MM-DD
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<AttendanceRow[]>([]);

  async function loadAttendance() {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/api/attendance/by-date?date=${date}`
      );
      const data = await res.json();
      setRecords(data);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    await fetch("http://localhost:4000/api/attendance/update-status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attendance_id: id, status }),
    });

    loadAttendance();
  }

  useEffect(() => {
    loadAttendance();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Attendance</Text>

      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      <TouchableOpacity style={styles.btn} onPress={loadAttendance}>
        <Text style={styles.btnText}>Load Records</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>
                {item.name} ({item.roll_no})
              </Text>

              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.statusBtn,
                    { backgroundColor: item.status === "Present" ? "#4CAF50" : "#ddd" },
                  ]}
                  onPress={() => updateStatus(item.id, "Present")}
                >
                  <Text style={styles.sText}>Present</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.statusBtn,
                    { backgroundColor: item.status === "Absent" ? "#E53935" : "#ddd" },
                  ]}
                  onPress={() => updateStatus(item.id, "Absent")}
                >
                  <Text style={styles.sText}>Absent</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.statusBtn,
                    { backgroundColor: item.status === "Late" ? "#FFA000" : "#ddd" },
                  ]}
                  onPress={() => updateStatus(item.id, "Late")}
                >
                  <Text style={styles.sText}>Late</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, padding: 20, backgroundColor: "#f6f0da", flex: 1 },

  title: { fontSize: 26, fontWeight: "700", marginBottom: 15 },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  btn: {
    padding: 14,
    backgroundColor: "#f4c542",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  btnText: { fontWeight: "700", fontSize: 18 },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 10,
  },

  name: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  row: { flexDirection: "row", justifyContent: "space-between" },

  statusBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },

  sText: { fontWeight: "700" },
});
