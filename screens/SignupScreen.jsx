import React, { useState } from "react";
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
import { auth, db, createUserWithEmailAndPassword, collection, addDoc } from "../firebaseConfig";

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill all fields.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Send email verification
      await sendEmailVerification(user);
  
      // Save user data in Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: new Date(),
      });
  
      dispatch(setUser({ uid: user.uid, email, name }));
      setSuccessVisible(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  
  const sendEmailVerification = async (user) => {
    try {
      await user.sendEmailVerification();
    } catch (error) {
      console.error("Error sending email verification:", error);
    }
  }  

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image source={require("../assets/login-bg.jpg")} style={styles.bgImage} />

      <Text style={styles.appName}>DermaGuard</Text>
      <Text style={styles.description}>AI-powered skin health at your fingertips.</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput label="Full Name" mode="outlined" style={styles.input} value={name} onChangeText={setName} />
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

      {/* Confirm Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          label="Confirm Password"
          mode="outlined"
          secureTextEntry={!confirmPasswordVisible}
          style={styles.passwordInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <IconButton
          icon={confirmPasswordVisible ? "eye-off" : "eye"}
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          style={styles.eyeIcon}
        />
      </View>

      {/* Signup Button */}
      <Button mode="contained" onPress={handleSignup} style={styles.button} buttonColor="#FFA500" textColor="#fff">
        Sign Up
      </Button>

      {/* Login Text */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>

      {/* Success Popup */}
      <Portal>
        <Dialog visible={successVisible} onDismiss={() => setSuccessVisible(false)}>
          <Dialog.Title>Success</Dialog.Title>
          <Dialog.Content>
            <Text>Account created! A verification link has been sent to your email.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => navigation.navigate("LoginScreen")}>LOGIN</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  bgImage: { flex: 1, position: "absolute", width: "100%", height: "100%", resizeMode: "stretch", opacity: 0.2 },
});

