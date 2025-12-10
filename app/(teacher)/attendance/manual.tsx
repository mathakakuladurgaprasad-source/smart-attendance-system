import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";

type Student = {
  id: number;
  name: string;
  roll_no: string;
};

export default function ManualAttendance() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<{ [key: number]: string }>({});

  async function loadStudents() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (e) {
      console.log("Error loading students:", e);
    } finally {
      setLoading(false);
    }
  }

  const mark = (id: number, status: string) => {
    setSelected((prev) => ({ ...prev, [id]: status }));
  };

  async function submitAttendance() {
    const today = new Date().toISOString().split("T")[0];

    try {
      for (const id in selected) {
        await fetch("http://localhost:4000/api/attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: Number(id),
            date: today,
            status: selected[id], // already lowercase
            method: "manual",
          }),
        });
      }

      Alert.alert("Success", "Attendance saved successfully!");
      router.back();
    } catch (e) {
      Alert.alert("Error", "Failed to save attendance.");
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manual Attendance</Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>
                {item.name} ({item.roll_no})
              </Text>

              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      backgroundColor:
                        selected[item.id] === "present" ? "#4CAF50" : "#ddd",
                    },
                  ]}
                  onPress={() => mark(item.id, "present")}
                >
                  <Text style={styles.btnText}>Present</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      backgroundColor:
                        selected[item.id] === "absent" ? "#E53935" : "#ddd",
                    },
                  ]}
                  onPress={() => mark(item.id, "absent")}
                >
                  <Text style={styles.btnText}>Absent</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      backgroundColor:
                        selected[item.id] === "late" ? "#FFA000" : "#ddd",
                    },
                  ]}
                  onPress={() => mark(item.id, "late")}
                >
                  <Text style={styles.btnText}>Late</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.submitBtn} onPress={submitAttendance}>
        <Text style={styles.submitText}>Save Attendance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, padding: 20, flex: 1, backgroundColor: "#f6f0da" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 15 },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },

  name: { fontSize: 18, fontWeight: "700", marginBottom: 8 },

  row: { flexDirection: "row", justifyContent: "space-between" },

  btn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  btnText: { fontWeight: "700" },

  submitBtn: {
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  submitText: { fontWeight: "700", fontSize: 18 },
});
