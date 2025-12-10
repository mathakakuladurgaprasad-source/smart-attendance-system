import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function AssignClass() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/teachers", {
        headers: { Authorization: "Bearer " + token },
      });

      const data = await res.json();
      setTeachers(data);
    } catch (err) {
      Alert.alert("Error", "Unable to load teachers.");
    }
  }

  async function assignClass() {
    if (!selectedTeacher || !className || !sectionName) {
      Alert.alert("Missing Info", "All fields are required.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/assign-class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          teacher_id: selectedTeacher,
          className,
          sectionName,
        }),
      });

      const data = await res.json();

      if (!res.ok) return Alert.alert("Error", data.error);

      Alert.alert("Success", "Class assigned successfully!");
      router.back();
    } catch (err) {
      Alert.alert("Network Error", "Failed to assign class.");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Assign Teacher to Class</Text>
      <Text style={styles.subtitle}>Choose teacher & set class section</Text>

      <Text style={styles.label}>Select Teacher</Text>
      {teachers.map((t) => (
        <TouchableOpacity
          key={t.id}
          style={[
            styles.teacherCard,
            selectedTeacher === t.id && styles.selectedCard,
          ]}
          onPress={() => setSelectedTeacher(t.id)}
        >
          <Text style={styles.teacherName}>{t.name}</Text>
          <Text style={styles.teacherUser}>({t.username})</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Class</Text>
      <TextInput
        placeholder="e.g. 5th, 8th, 10th"
        style={styles.input}
        value={className}
        onChangeText={setClassName}
      />

      <Text style={styles.label}>Section</Text>
      <TextInput
        placeholder="e.g. A, B, Red, Blue"
        style={styles.input}
        value={sectionName}
        onChangeText={setSectionName}
      />

      <TouchableOpacity style={styles.button} onPress={assignClass}>
        <Text style={styles.buttonText}>Assign</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f4f2ee", flex: 1 },
  title: { fontSize: 26, fontWeight: "700" },
  subtitle: { color: "#777", marginBottom: 15 },

  label: { fontWeight: "600", marginTop: 15, marginBottom: 5 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },

  teacherCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  selectedCard: { borderColor: "#4b9dfc", borderWidth: 2 },
  teacherName: { fontSize: 16, fontWeight: "600" },
  teacherUser: { color: "#777" },

  button: {
    backgroundColor: "#4b9dfc",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: { color: "white", fontWeight: "700", fontSize: 17 },
});
