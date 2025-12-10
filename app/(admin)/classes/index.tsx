import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";

type ClassItem = {
  id: number;
  class: string;
  section: string;
  class_teacher: string;
};

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);

  async function loadClasses() {
    try {
      const res = await fetch("http://localhost:4000/api/classes");
      const data = await res.json();
      setClasses(data);
    } catch (err) {
      Alert.alert("Error", "Unable to load classes");
    }
  }

  useEffect(() => {
    loadClasses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Classes</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/(admin)/classes/add")}
      >
        <Text style={styles.addText}>➕ Add New Class</Text>
      </TouchableOpacity>

      <FlatList
        data={classes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.line}>
              Class: <Text style={styles.bold}>{item.class}</Text>
            </Text>
            <Text style={styles.line}>Section: {item.section}</Text>
            <Text style={styles.line}>Teacher: {item.class_teacher}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, padding: 20, flex: 1, backgroundColor: "#f6f0da" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  addBtn: {
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addText: { fontSize: 18, fontWeight: "700" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  line: { fontSize: 16, marginBottom: 4 },
  bold: { fontWeight: "700" },
});
