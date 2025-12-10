import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function TeacherHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher Dashboard</Text>
      <Text style={styles.subtitle}>Quick Access Tools</Text>

      {/* Students */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(teacher)/students")}
      >
        <Text style={styles.cardTitle}>🧍‍♂️ Students</Text>
        <Text style={styles.cardSubtitle}>View / Manage Students</Text>
      </TouchableOpacity>

      {/* Attendance */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(teacher)/attendance")}
      >
        <Text style={styles.cardTitle}>📝 Take Attendance</Text>
        <Text style={styles.cardSubtitle}>Manual / Face Scan</Text>
      </TouchableOpacity>

      {/* Reports */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(teacher)/attendance-report")}
      >
        <Text style={styles.cardTitle}>📊 Attendance Reports</Text>
        <Text style={styles.cardSubtitle}>Daily & Monthly Summary</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    padding: 20,
    backgroundColor: "#f6f0da",
    flex: 1,
  },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 5 },
  subtitle: { color: "#777", marginBottom: 25, fontSize: 15 },

  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: { fontSize: 20, fontWeight: "600" },
  cardSubtitle: { color: "#666", marginTop: 4 },
});
