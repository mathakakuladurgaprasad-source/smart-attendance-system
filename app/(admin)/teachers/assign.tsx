import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Picker,
} from "react-native";
import { router } from "expo-router";

export default function AssignTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  const [teacherId, setTeacherId] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");

  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      setLoading(true);

      const t = await fetch("http://localhost:4000/api/teachers");
      const c = await fetch("http://localhost:4000/api/classes");
      const s = await fetch("http://localhost:4000/api/sections");

      setTeachers(await t.json());
      setClasses(await c.json());
      setSections(await s.json());
    } catch (err) {
      Alert.alert("Error", "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function assignNow() {
    if (!teacherId || !classId || !sectionId) {
      Alert.alert("Error", "Please select all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/assign-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacher_id: teacherId, class_id: classId, section_id: sectionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.error || "Assignment failed");
        return;
      }

      Alert.alert("Success", "Teacher Assigned Successfully!");
      router.back();
    } catch (err) {
      Alert.alert("Error", "Server not reachable");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Teacher</Text>

      {/* Teacher Dropdown */}
      <Text style={styles.label}>Select Teacher</Text>
      <Picker
        selectedValue={teacherId}
        style={styles.dropdown}
        onValueChange={(value) => setTeacherId(value)}
      >
        <Picker.Item label="-- Choose Teacher --" value="" />
        {teachers.map((t) => (
          <Picker.Item key={t.id} label={t.username} value={t.id} />
        ))}
      </Picker>

      {/* Class Dropdown */}
      <Text style={styles.label}>Select Class</Text>
      <Picker
        selectedValue={classId}
        style={styles.dropdown}
        onValueChange={(value) => setClassId(value)}
      >
        <Picker.Item label="-- Choose Class --" value="" />
        {classes.map((c) => (
          <Picker.Item key={c.id} label={c.name} value={c.id} />
        ))}
      </Picker>

      {/* Section Dropdown */}
      <Text style={styles.label}>Select Section</Text>
      <Picker
        selectedValue={sectionId}
        style={styles.dropdown}
        onValueChange={(value) => setSectionId(value)}
      >
        <Picker.Item label="-- Choose Section --" value="" />
        {sections.map((s) => (
          <Picker.Item key={s.id} label={s.name} value={s.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.btn} onPress={assignNow}>
        <Text style={styles.btnText}>Assign Teacher</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  container: {
    paddingTop: 60,
    padding: 20,
    flex: 1,
    backgroundColor: "#f6f0da",
  },

  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },

  label: { fontWeight: "600", marginTop: 10, marginBottom: 5 },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },

  btn: {
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  btnText: { fontSize: 18, fontWeight: "700" },

  backBtn: {
    marginTop: 15,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#ddd",
    alignItems: "center",
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
