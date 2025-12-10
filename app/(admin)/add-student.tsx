import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [rollNo, setRoll] = useState("");

  async function save() {
    if (!name || !rollNo) return Alert.alert("Error", "All fields required");

    const res = await fetch("http://localhost:4000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, roll_no: rollNo }),
    });

    const data = await res.json();
    Alert.alert("Success", data.message);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student</Text>

      <TextInput placeholder="Name" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Roll No" style={styles.input} onChangeText={setRoll} />

      <TouchableOpacity style={styles.btn} onPress={save}>
        <Text style={styles.btnText}>Save Student</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 70, padding: 20, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "white", fontSize: 18, fontWeight: "600" },
});
