import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username & password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Login Failed", data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      // Store in localStorage (works for Expo Web + Expo Go)
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Route based on user role
      if (data.role === "admin") {
        router.replace("/(admin)/home");
      } else {
        router.replace("/(teacher)/home");
      }

    } catch (err) {
      Alert.alert("Network Error", "Could not connect to server");
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {/* Top curved theme */}
      <View style={styles.topBanner} />

      <View style={styles.card}>
        <Text style={styles.title}>Let the Journey Begin!</Text>

        <TextInput
          placeholder="Email Address"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{loading ? "Please wait..." : "Login"}</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => router.push("/(auth)/signup")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f0da",
  },

  topBanner: {
    height: 180,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    elevation: 5,
  },

  card: {
    backgroundColor: "#ffffff",
    width: "90%",
    alignSelf: "center",
    top: -40,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#f4c542",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  footerText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },

  link: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
