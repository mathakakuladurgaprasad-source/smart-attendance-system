import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

type Student = {
  id: number;
  name: string;
  roll_no: string;
  class?: string;
  section?: string;
};

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadStudents() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (e) {
      console.log("Error loading students:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const filtered = students.filter((s) => {
    const text = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(text) ||
      s.roll_no.toLowerCase().includes(text)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <TextInput
        style={styles.search}
        placeholder="Search by name or roll..."
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/(teacher)/students/add")}
      >
        <Text style={styles.addText}>➕ Add Student</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push(`/ (teacher)/students/edit/${item.id}`.replace(" ", ""))
              }
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.line}>Roll No: {item.roll_no}</Text>
              <Text style={styles.line}>
                Class: {item.class || "-"} | Section: {item.section || "-"}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, padding: 20, flex: 1, backgroundColor: "#f6f0da" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#f4c542",
    padding: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  addText: { fontWeight: "700", fontSize: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: "700" },
  line: { marginTop: 4, color: "#555" },
});
