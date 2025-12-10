import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function AdminHome() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Manage Everything Easily</Text>

      <View style={styles.cardContainer}>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>👨‍🏫 Teachers</Text>
          <Text style={styles.cardSubtitle}>Manage teachers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>🧑‍🎓 Students</Text>
          <Text style={styles.cardSubtitle}>Manage students</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>📝 Attendance</Text>
          <Text style={styles.cardSubtitle}>View daily reports</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>⚙ Settings</Text>
          <Text style={styles.cardSubtitle}>Customize school</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f7f7f7",
    minHeight: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  cardContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  cardSubtitle: {
    marginTop: 5,
    color: "#777",
  },
});
