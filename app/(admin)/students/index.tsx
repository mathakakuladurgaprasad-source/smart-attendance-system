import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadStudents() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      Alert.alert("Error", "Failed to load students");
    } finally {
      setLoading(false);
    }
  }

  async function deleteStudent(id: number) {
    Alert.alert("Confirm", "Delete this student?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`http://localhost:4000/api/students/${id}`, {
              method: "DELETE",
            });
            loadStudents();
          } catch (err) {
            Alert.alert("Error", "Failed to delete");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/(admin)/students/add")}
      >
        <Text style={styles.addText}>+ Add Student</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView style={styles.list}>
          {students.map((s: any) => (
            <View key={s.id} style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{s.name}</Text>
                <Text style={styles.subText}>
                  Roll: {s.roll_no} | Class: {s.class}-{s.section}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.editBtn}
                onPress={() =>
                  router.push(`/(admin)/students/edit?id=${s.id}`)
                }
              >
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteStudent(s.id)}
              >
                <Text style={styles.btnText}>Del</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
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
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  addBtn: {
    backgroundColor: "#3b82f6",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  addText: { color: "white", fontSize: 16, fontWeight: "700" },
  list: { marginTop: 10 },
  card: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "white",
    marginBottom: 12,
    alignItems: "center",
    gap: 8,
  },
  name: { fontSize: 18, fontWeight: "700" },
  subText: { color: "#555" },
  editBtn: {
    backgroundColor: "#f4c542",
    padding: 8,
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    padding: 8,
    borderRadius: 8,
  },
  btnText: { color: "white", fontWeight: "700" },
  backBtn: {
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  backText: { fontSize: 16, fontWeight: "600" },
});
