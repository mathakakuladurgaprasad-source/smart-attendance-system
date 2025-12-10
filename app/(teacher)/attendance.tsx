import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function Attendance() {
  const [students, setStudents] = useState([]);

  async function load() {
    const res = await fetch("http://localhost:4000/api/students");
    const data = await res.json();
    setStudents(data);
  }

  async function markPresent(id) {
    await fetch("http://localhost:4000/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: id,
        date: new Date().toISOString().slice(0, 10),
        status: "present",
        method: "manual",
      }),
    });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>

      <FlatList
        data={students}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>

            <TouchableOpacity style={styles.btn} onPress={() => markPresent(item.id)}>
              <Text style={styles.btnText}>Present</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 70, padding: 20, flex: 1, backgroundColor: "#fafafa" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  row: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 18 },
  btn: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  btnText: { color: "white", fontWeight: "700" },
});
