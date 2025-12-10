import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function TeacherAttendanceHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>
      <Text style={styles.subtitle}>Choose how you want to manage attendance</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(teacher)/attendance/manual")}
      >
        <Text style={styles.cardTitle}>📝 Manual Attendance</Text>
        <Text style={styles.cardSubtitle}>Mark Present / Absent / Late</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(teacher)/attendance/summary")}
      >
        <Text style={styles.cardTitle}>📊 Today Summary</Text>
        <Text style={styles.cardSubtitle}>Present vs Absent overview</Text>
      </TouchableOpacity>

      {/* Later we can add: by-date screen */}
      {/* <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(teacher)/attendance/by-date")}
      >
        <Text style={styles.cardTitle}>📅 By Date</Text>
        <Text style={styles.cardSubtitle}>View past day attendance</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back to Dashboard</Text>
      </TouchableOpacity>
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
  title: { fontSize: 26, fontWeight: "700", marginBottom: 5 },
  subtitle: { fontSize: 15, color: "#666", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: "700" },
  cardSubtitle: { marginTop: 4, color: "#555" },
  backBtn: {
    marginTop: 20,
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
