import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

type Teacher = {
  id: number;
  username: string;
};

export default function TeachersList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTeachers() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/teachers");
      const data = await res.json();
      setTeachers(data);
    } catch (err) {
      Alert.alert("Error", "Failed to load teachers");
    } finally {
      setLoading(false);
    }
  }

  async function deleteTeacher(id: number) {
    Alert.alert("Confirm", "Delete this teacher?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            const res = await fetch(
              `http://localhost:4000/api/teachers/${id}`,
              { method: "DELETE" }
            );

            if (!res.ok) {
              Alert.alert("Error", "Failed to delete teacher");
              return;
            }

            loadTeachers();
          } catch (err) {
            Alert.alert("Error", "Network error");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teachers</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/(admin)/teachers/add")}
      >
        <Text style={styles.addText}>➕ Add Teacher</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={teachers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.username}</Text>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteTeacher(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 60, padding: 20, flex: 1, backgroundColor: "#f6f0da" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 15 },
  addBtn: {
    backgroundColor: "#f4c542",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  addText: { fontSize: 18, fontWeight: "700" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: "700" },
  deleteBtn: {
    backgroundColor: "#E53935",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteText: { color: "white", fontWeight: "700" },
});
