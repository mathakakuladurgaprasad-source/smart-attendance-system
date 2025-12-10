import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";

export default function AddClass() {
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [teacherName, setTeacherName] = useState("");

  async function saveClass() {
    if (!className || !section || !teacherName) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          class: className,
          section,
          class_teacher: teacherName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.error || "Failed to add class");
        return;
      }

      Alert.alert("Success", "Class added successfully");
      router.replace("/(admin)/classes");
    } catch (err) {
      Alert.alert("Error", "Backend not reachable");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Class</Text>

      <TextInput
        placeholder="Class (e.g. 10)"
        style={styles.input}
        value={className}
        onChangeText={setClassName}
      />

      <TextInput
        placeholder="Section (e.g. A)"
        style={styles.input}
        value={section}
        onChangeText={setSection}
      />

      <TextInput
        placeholder="Class Teacher Name"
        style={styles.input}
        value={teacherName}
        onChangeText={setTeacherName}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saveClass}>
        <Text style={styles.saveText}>Save Class</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
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
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { fontSize: 18, fontWeight: "700" },
  backBtn: {
    marginTop: 15,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  backText: { fontSize: 16, fontWeight: "600" },
});
