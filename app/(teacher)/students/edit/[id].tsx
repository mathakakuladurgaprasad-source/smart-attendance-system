import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function EditStudent() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [cls, setCls] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(true);

  // Load student data
  async function loadStudent() {
    try {
      const res = await fetch(`http://localhost:4000/api/students/${id}`);
      const data = await res.json();

      setName(data.name);
      setRoll(data.roll_no);
      setCls(data.class || "");
      setSection(data.section || "");
    } catch (e) {
      Alert.alert("Error", "Failed to load student details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudent();
  }, []);

  // Save updated student
  async function updateStudent() {
    try {
      const res = await fetch(`http://localhost:4000/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          roll_no: roll,
          class: cls,
          section,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.error || "Update failed");
        return;
      }

      Alert.alert("Success", "Student updated successfully");
      router.back();
    } catch {
      Alert.alert("Network Error", "Could not update student");
    }
  }

  // Delete student
  async function deleteStudent() {
    Alert.alert("Confirm", "Delete this student permanently?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`http://localhost:4000/api/students/${id}`, {
              method: "DELETE",
            });
            Alert.alert("Deleted", "Student removed successfully");
            router.replace("/(teacher)/students");
          } catch {
            Alert.alert("Error", "Could not delete student");
          }
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Student</Text>

      <TextInput
        placeholder="Student Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Roll Number"
        style={styles.input}
        value={roll}
        onChangeText={setRoll}
      />

      <TextInput
        placeholder="Class"
        style={styles.input}
        value={cls}
        onChangeText={setCls}
      />

      <TextInput
        placeholder="Section"
        style={styles.input}
        value={section}
        onChangeText={setSection}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={updateStudent}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={deleteStudent}>
        <Text style={styles.deleteText}>Delete Student</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, backgroundColor: "#f6f0da", flex: 1 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  saveText: { fontSize: 18, fontWeight: "700", color: "#fff" },
  deleteBtn: {
    backgroundColor: "#ff4d4d",
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  deleteText: { fontSize: 18, fontWeight: "700", color: "#fff" },
});
