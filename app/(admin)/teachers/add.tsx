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

export default function AddTeacher() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function createTeacher() {
    if (!username || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          username,
          password,
          role: "teacher",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.error || "Failed to add teacher");
        return;
      }

      Alert.alert("Success", "Teacher added successfully!");
      router.replace("/(admin)/teachers");
    } catch (err) {
      Alert.alert("Error", "Network error");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Teacher</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={createTeacher}>
        <Text style={styles.buttonText}>Create Teacher</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, backgroundColor: "#f6f0da", flex: 1 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { fontSize: 18, fontWeight: "700" },
  backButton: {
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  backText: { fontSize: 16, fontWeight: "600" },
});
