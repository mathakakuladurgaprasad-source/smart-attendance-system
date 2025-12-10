import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  async function loadStudents() {
    const res = await fetch("http://localhost:4000/api/students");
    const data = await res.json();
    setStudents(data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student List</Text>

      <TextInput
        style={styles.search}
        placeholder="Search by name or roll no..."
        onChangeText={setSearch}
      />

      <FlatList
        data={students.filter(
          s =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.roll_no.toLowerCase().includes(search.toLowerCase())
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.roll}>{item.roll_no}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, backgroundColor: "#fafafa", flex: 1 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  item: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: "600" },
  roll: { fontSize: 14, color: "#777" },
});
