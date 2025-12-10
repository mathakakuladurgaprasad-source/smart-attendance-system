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

export default function AddStudent() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [cls, setCls] = useState("");
  const [section, setSection] = useState("");

  async function saveStudent() {
    if (!name || !roll) {
      Alert.alert("Error", "Name and Roll Number are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/students", {
        method: "POST",
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
        Alert.alert("Error", data.error || "Something went wrong");
        return;
      }

      Alert.alert("Success", "Student Added Successfully");
      router.back();
    } catch (e) {
      Alert.alert("Network Error", "Unable to save student");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student</Text>

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

      <TouchableOpacity style={styles.btn} onPress={saveStudent}>
        <Text style={styles.btnText}>Save Student</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, backgroundColor: "#f6f0da", flex: 1 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#f4c542",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: { fontSize: 18, fontWeight: "700" },
});
