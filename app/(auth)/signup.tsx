import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    alert("Signup clicked!");
  };

  return (
    <View style={styles.container}>
      {/* Top curved background */}
      <View style={styles.topBanner} />

      {/* Signup Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Create Your Account</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email Address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => router.push("/(auth)/index")}
          >
            Login
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
    marginTop: 12,
    fontSize: 14,
  },

  link: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
