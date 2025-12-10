import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Picker,
} from "react-native";

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
      Alert.alert("Error", "Unable to load data");
    } finally {
      setLoading(false);
    }
  }

  async function assign() {
    if (!teacherId || !classId || !sectionId) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/assign-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacher_id: teacherId,
          class_id: classId,
          section_id: sectionId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.error || "Failed to assign teacher");
        return;
      }

      Alert.alert("Success", "Teacher assigned successfully!");
      setTeacherId("");
      setClassId("");
      setSectionId("");
    } catch (err) {
      Alert.alert("Error", "Network error");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Teacher to Class</Text>

      <Text style={styles.label}>Select Teacher</Text>
      <Picker
        selectedValue={teacherId}
        onValueChange={(val) => setTeacherId(val)}
        style={styles.picker}
      >
        <Picker.Item label="Choose teacher" value="" />
        {teachers.map((t) => (
          <Picker.Item key={t.id} label={t.username} value={t.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Class</Text>
      <Picker
        selectedValue={classId}
        onValueChange={(val) => setClassId(val)}
        style={styles.picker}
      >
        <Picker.Item label="Choose class" value="" />
        {classes.map((c) => (
          <Picker.Item key={c.id} label={c.name} value={c.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Section</Text>
      <Picker
        selectedValue={sectionId}
        onValueChange={(val) => setSectionId(val)}
        style={styles.picker}
      >
        <Picker.Item label="Choose section" value="" />
        {sections.map((s) => (
          <Picker.Item key={s.id} label={s.name} value={s.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.btn} onPress={assign}>
        <Text style={styles.btnText}>Assign Teacher</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, padding: 20, backgroundColor: "#f6f0da", flex: 1 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 25 },
  label: { fontSize: 16, fontWeight: "600", marginTop: 15 },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
  },
  btn: {
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  btnText: { fontSize: 18, fontWeight: "700" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
