import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function EditStudent() {
  const { id } = useLocalSearchParams();

  const [roll_no, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [parent_name, setParentName] = useState("");
  const [parent_phone, setParentPhone] = useState("");
  const [parent_email, setParentEmail] = useState("");

  async function loadStudent() {
    try {
      const res = await fetch(`http://localhost:4000/api/students/${id}`);
      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", "Failed to load student");
        return;
      }

      setRollNo(data.roll_no);
      setName(data.name);
      setStudentClass(data.class);
      setSection(data.section);
      setParentName(data.parent_name);
      setParentPhone(data.parent_phone);
      setParentEmail(data.parent_email);
    } catch (err) {
      Alert.alert("Error", "Failed to connect to backend");
    }
  }

  async function updateStudent() {
    try {
      const res = await fetch(`http://localhost:4000/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roll_no,
          name,
          class: studentClass,
          section,
          parent_name,
          parent_phone,
          parent_email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.error || "Failed to update");
        return;
      }

      Alert.alert("Success", "Student updated");
      router.back();
    } catch (err) {
      Alert.alert("Error", "Network error");
    }
  }

  async function deleteStudent() {
    try {
      const res = await fetch(`http://localhost:4000/api/students/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        Alert.alert("Error", "Failed to delete student");
        return;
      }

      Alert.alert("Deleted", "Student removed");
      router.replace("/(admin)/students");
    } catch (err) {
      Alert.alert("Error", "Backend not reachable");
    }
  }

  useEffect(() => {
    loadStudent();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Student</Text>

      <TextInput
        placeholder="Roll No"
        style={styles.input}
        value={roll_no}
        onChangeText={setRollNo}
      />

      <TextInput
        placeholder="Student Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Class"
        style={styles.input}
        value={studentClass}
        onChangeText={setStudentClass}
      />

      <TextInput
        placeholder="Section"
        style={styles.input}
        value={section}
        onChangeText={setSection}
      />

      <TextInput
        placeholder="Parent Name"
        style={styles.input}
        value={parent_name}
        onChangeText={setParentName}
      />

      <TextInput
        placeholder="Parent Phone"
        style={styles.input}
        value={parent_phone}
        onChangeText={setParentPhone}
      />

      <TextInput
        placeholder="Parent Email"
        style={styles.input}
        value={parent_email}
        onChangeText={setParentEmail}
      />

      <TouchableOpacity style={styles.updateBtn} onPress={updateStudent}>
        <Text style={styles.btnText}>Update Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={deleteStudent}>
        <Text style={styles.deleteText}>Delete Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, padding: 20, backgroundColor: "#f6f0da" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  updateBtn: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  deleteBtn: {
    backgroundColor: "#E53935",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { fontSize: 18, color: "white", fontWeight: "700" },
  deleteText: { fontSize: 18, color: "white", fontWeight: "700" },
  backBtn: {
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  backText: { fontSize: 16, fontWeight: "600" },
});
