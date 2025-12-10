import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Picker,
} from "react-native";

export default function AssignTeacher() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      setLoading(true);

      const tRes = await fetch("http://localhost:4000/api/teachers");
      const cRes = await fetch("http://localhost:4000/api/classes");
      const sRes = await fetch("http://localhost:4000/api/sections");

      setTeachers(await tRes.json());
      setClasses(await cRes.json());
      setSections(await sRes.json());
    } catch (err) {
      Alert.alert("Error", "Failed loading data");
    } finally {
      setLoading(false);
    }
  }

  async function saveAssignment() {
    if (!selectedTeacher || !selectedClass || !selectedSection) {
      Alert.alert("Error", "Please select teacher, class and section");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/assign-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacher_id: selectedTeacher,
          class_id: selectedClass,
          section_id: selectedSection,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.error || "Failed to assign teacher");
        return;
      }

      Alert.alert("Success", "Teacher assigned successfully");
    } catch (err) {
      Alert.alert("Error", "Network issue");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Teacher to Class</Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      ) : (
        <>
          {/* Teacher Select */}
          <Text style={styles.label}>Select Teacher</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedTeacher}
              onValueChange={(value) => setSelectedTeacher(value)}
            >
              <Picker.Item label="Choose Teacher" value="" />
              {teachers.map((t) => (
                <Picker.Item key={t.id} label={t.username} value={t.id} />
              ))}
            </Picker>
          </View>

          {/* Class Select */}
          <Text style={styles.label}>Select Class</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedClass}
              onValueChange={(value) => setSelectedClass(value)}
            >
              <Picker.Item label="Choose Class" value="" />
              {classes.map((c) => (
                <Picker.Item key={c.id} label={c.class} value={c.id} />
              ))}
            </Picker>
          </View>

          {/* Section Select */}
          <Text style={styles.label}>Select Section</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedSection}
              onValueChange={(value) => setSelectedSection(value)}
            >
              <Picker.Item label="Choose Section" value="" />
              {sections.map((s) => (
                <Picker.Item
                  key={s.id}
                  label={s.section_name}
                  value={s.id}
                />
              ))}
            </Picker>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={saveAssignment}>
            <Text style={styles.saveText}>Assign Teacher</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#f6f0da" },

  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginTop: 10 },

  picker: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },

  saveBtn: {
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  saveText: { fontSize: 18, fontWeight: "700" },
});
