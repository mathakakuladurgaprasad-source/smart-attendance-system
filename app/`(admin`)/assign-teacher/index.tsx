import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
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

  async function assignTeacher() {
    if (!teacherId || !classId || !sectionId) {
      return Alert.alert("Error", "Select all fields");
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

      Alert.alert("Success", data.message || "Assigned successfully");
      router.push("/(admin)/home");
    } catch (err) {
      Alert.alert("Error", "Network issue");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Teacher</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.label}>Select Teacher</Text>
          <Picker
            selectedValue={teacherId}
            style={styles.picker}
            onValueChange={(v) => setTeacherId(v)}
          >
            <Picker.Item label="Choose Teacher" value="" />
            {teachers.map((t: any) => (
              <Picker.Item key={t.id} label={t.username} value={t.id} />
            ))}
          </Picker>

          <Text style={styles.label}>Select Class</Text>
          <Picker
            selectedValue={classId}
            style={styles.picker}
            onValueChange={(v) => setClassId(v)}
          >
            <Picker.Item label="Choose Class" value="" />
            {classes.map((c: any) => (
              <Picker.Item key={c.id} label={c.class} value={c.id} />
            ))}
          </Picker>

          <Text style={styles.label}>Select Section</Text>
          <Picker
            selectedValue={sectionId}
            style={styles.picker}
            onValueChange={(v) => setSectionId(v)}
          >
            <Picker.Item label="Choose Section" value="" />
            {sections.map((s: any) => (
              <Picker.Item key={s.id} label={s.section_name} value={s.id} />
            ))}
          </Picker>

          <TouchableOpacity style={styles.btn} onPress={assignTeacher}>
            <Text style={styles.btnText}>Assign</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>⬅ Back</Text>
          </TouchableOpacity>
        </>
      )}
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
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  label: { marginTop: 10, fontSize: 16, fontWeight: "600" },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
  },
  btn: {
    marginTop: 25,
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { fontSize: 18, fontWeight: "700" },
  backBtn: {
    marginTop: 15,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  backText: { fontSize: 16, fontWeight: "600" },
});
