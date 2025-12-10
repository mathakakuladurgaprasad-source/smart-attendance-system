import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";

export default function StudentDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [student, setStudent] = useState(null);

  async function loadStudent() {
    try {
      const res = await fetch(`http://localhost:4000/api/students/${id}`);
      const data = await res.json();
      setStudent(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteStudent() {
    Alert.alert("Confirm", "Are you sure you want to delete?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await fetch(
              `http://localhost:4000/api/students/${id}`,
              { method: "DELETE" }
            );
            if (res.ok) {
              Alert.alert("Deleted", "Student removed");
              router.back();
            }
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  }

  useEffect(() => {
    loadStudent();
  }, []);

  if (!student) return <Text style={{ marginTop: 50, textAlign: "center" }}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Student Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{student.name}</Text>

        <Text style={styles.label}>Roll No:</Text>
        <Text style={styles.value}>{student.roll_no}</Text>

        <Text style={styles.label}>Class:</Text>
        <Text style={styles.value}>{student.class}</Text>

        <Text style={styles.label}>Section:</Text>
        <Text style={styles.value}>{student.section}</Text>

        <Text style={styles.label}>Parent Name:</Text>
        <Text style={styles.value}>{student.parent_name}</Text>

        <Text style={styles.label}>Parent Phone:</Text>
        <Text style={styles.value}>{student.parent_phone}</Text>

        <Text style={styles.label}>Parent Email:</Text>
        <Text style={styles.value}>{student.parent_email}</Text>
      </View>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => router.push(`/ (teacher)/students/edit/${id}`)}
      >
        <Text style={styles.btnText}>✏️ Edit Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={deleteStudent}>
        <Text style={styles.btnText}>🗑️ Delete Student</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f6f0da", flex: 1 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 20,
  },
  label: { fontWeight: "bold", marginTop: 10 },
  value: { color: "#444", fontSize: 16 },

  editBtn: {
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  deleteBtn: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
