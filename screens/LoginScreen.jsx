import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  IconButton,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { auth, signInWithEmailAndPassword, db, doc, getDoc } from "../firebaseConfig";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good morning");
    else if (hours < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user's name from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userName = userDoc.exists() ? userDoc.data().name : "User";

      dispatch(setUser({ uid: user.uid, email, name: userName }));

      navigation.navigate("Home", { greeting: `${greeting}, ${userName}!` }); // Pass greeting to Home
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image source={require("../assets/login-bg.jpg")} style={styles.bgImage} />

      <Text style={styles.appName}>DermaGuard</Text>
      <Text style={styles.description}>AI-powered skin health at your fingertips.</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput label="Email" mode="outlined" style={styles.input} value={email} onChangeText={setEmail} />

      {/* Password Field with Hide/Unhide Icon */}
      <View style={styles.passwordContainer}>
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={!passwordVisible}
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
        />
        <IconButton
          icon={passwordVisible ? "eye-off" : "eye"}
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        />
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <Button mode="contained" onPress={handleLogin} style={styles.button} buttonColor="#FFA500" textColor="#fff">
        Log In
      </Button>

      {/* Signup Link */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212", padding: 20 },
  appName: { fontSize: 26, fontWeight: "bold", color: "#FFA500", marginBottom: 10 },
  description: { color: "#ddd", fontSize: 14, marginBottom: 20, textAlign: "center", width: "80%" },
  errorText: { color: "red", marginBottom: 10 },
  input: { width: "90%", marginBottom: 10 },
  passwordContainer: { flexDirection: "row", alignItems: "center", width: "90%" },
  passwordInput: { flex: 1 },
  eyeIcon: { position: "absolute", right: 0 },
  button: { width: "90%", marginTop: 15, paddingVertical: 8 },
  linkText: { color: "#FFA500", marginTop: 15, textAlign: "center", textDecorationLine: "underline" },
  forgotText: { color: "#FFA500", marginTop: 10, textAlign: "center" },
  bgImage: { flex: 1, position: "absolute", width: "100%", height: "100%", resizeMode: "stretch", opacity: 0.2 },
});
