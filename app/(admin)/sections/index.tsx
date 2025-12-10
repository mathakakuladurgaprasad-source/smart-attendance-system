import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";

type Section = {
  id: number;
  section_name: string;
};

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionName, setSectionName] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadSections() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/sections");
      const data = await res.json();
      setSections(data);
    } catch (err) {
      Alert.alert("Error", "Unable to load sections");
    } finally {
      setLoading(false);
    }
  }

  async function addSection() {
    if (!sectionName.trim()) {
      Alert.alert("Error", "Section name required");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section_name: sectionName }),
      });

      if (!res.ok) {
        Alert.alert("Error", "Failed to add section");
        return;
      }

      setSectionName("");
      loadSections();
    } catch (err) {
      Alert.alert("Error", "Network error");
    }
  }

  async function deleteSection(id: number) {
    try {
      const res = await fetch(`http://localhost:4000/api/sections/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        Alert.alert("Error", "Cannot delete section");
        return;
      }

      loadSections();
    } catch (err) {
      Alert.alert("Error", "Network issue");
    }
  }

  useEffect(() => {
    loadSections();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Sections</Text>

      <TextInput
        placeholder="Enter section (A, B, C...)"
        value={sectionName}
        onChangeText={setSectionName}
        style={styles.input}
      />

      <TouchableOpacity style={styles.addBtn} onPress={addSection}>
        <Text style={styles.btnText}>Add Section</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.sectionText}>{item.section_name}</Text>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteSection(item.id)}
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
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addBtn: {
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  btnText: { fontSize: 18, fontWeight: "700" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 3,
  },
  sectionText: { fontSize: 18, fontWeight: "700" },
  deleteBtn: {
    backgroundColor: "#E53935",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteText: { color: "white", fontWeight: "700" },
});
