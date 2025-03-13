import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Splash2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/background.jpg")} style={styles.image} />
      <Text style={styles.appName}>DermaGuard</Text>
        <Text style={styles.description}>AI-powered skin cancer detection for early diagnosis and better care.</Text>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => navigation.goBack()} buttonColor="#4B0082" textColor="#FFA500">
          Back
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("Home")} buttonColor="#FFA500" textColor="#4B0082">
          Next
        </Button>
      </View>
    </View>
  );
};

export default Splash2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  image: { width: 350, height: 350, resizeMode: "contain", marginBottom: 20 },
  appName: { fontSize: 24, color: "#FFF", fontWeight: "bold", marginBottom: 20 },
  buttonContainer: { flexDirection: "row", gap: 15 },
  description: { fontSize: 16, color: "#AAA", textAlign: "center", marginHorizontal: 20, marginBottom: 20 },
})
