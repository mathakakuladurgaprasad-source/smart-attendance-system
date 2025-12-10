import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function AddStudent() {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");

  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState("");

  // Load classes from DB
  async function fetchClasses() {
    try {
      const res = await fetch("http://localhost:4000/api/classes");
      const data = await res.json();
      setClasses(data);
    } catch {
      Alert.alert("Error", "Failed to load classes");
    }
  }

  // Load sections
  async function fetchSections() {
    try {
      const res = await fetch("http://localhost:4000/api/sections");
      const data = await res.json();
      setSections(data);
    } catch {
      Alert.alert("Error", "Failed to load sections");
    }
  }

  useEffect(() => {
    fetchClasses();
    fetchSections();
  }, []);

  async function saveStudent() {
    if (!rollNo || !name || !selectedClassId || !selectedSectionId) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roll_no: rollNo,
          name: name,
          class_id: selectedClassId,
          section_id: selectedSectionId,
          parent_name: parentName,
          parent_phone: parentPhone,
          parent_email: parentEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.error || "Failed to add student");
        return;
      }

      Alert.alert("Success", "Student added successfully");
      router.back();
    } catch (err) {
      Alert.alert("Error", "Network error");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Student</Text>

      <TextInput
        placeholder="Roll Number"
        style={styles.input}
        value={rollNo}
        onChangeText={setRollNo}
      />

      <TextInput
        placeholder="Student Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Select Class</Text>
      <ScrollView horizontal style={styles.horizontal}>
        {classes.map((c: any) => (
          <TouchableOpacity
            key={c.id}
            onPress={() => setSelectedClassId(c.id)}
            style={[
              styles.option,
              selectedClassId === c.id && styles.selected,
            ]}
          >
            <Text style={styles.optionText}>{c.class}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.label}>Select Section</Text>
      <ScrollView horizontal style={styles.horizontal}>
        {sections.map((s: any) => (
          <TouchableOpacity
            key={s.id}
            onPress={() => setSelectedSectionId(s.id)}
            style={[
              styles.option,
              selectedSectionId === s.id && styles.selected,
            ]}
          >
            <Text style={styles.optionText}>{s.section_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TextInput
        placeholder="Parent Name"
        style={styles.input}
        value={parentName}
        onChangeText={setParentName}
      />

      <TextInput
        placeholder="Parent Phone"
        style={styles.input}
        keyboardType="numeric"
        value={parentPhone}
        onChangeText={setParentPhone}
      />

      <TextInput
        placeholder="Parent Email"
        style={styles.input}
        value={parentEmail}
        onChangeText={setParentEmail}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saveStudent}>
        <Text style={styles.saveText}>Save Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, backgroundColor: "#f6f0da" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  label: { fontSize: 16, fontWeight: "700", marginTop: 10, marginBottom: 5 },
  horizontal: { marginBottom: 10 },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginRight: 10,
  },
  selected: {
    backgroundColor: "#f4c542",
  },
  optionText: {
    fontWeight: "700",
  },
  saveBtn: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  saveText: { color: "white", fontSize: 18, fontWeight: "700" },
  backBtn: {
    marginTop: 15,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  backText: { fontSize: 16, fontWeight: "600" },
});
