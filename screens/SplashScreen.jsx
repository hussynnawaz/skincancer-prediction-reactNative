import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/33440571_8031897.jpg")} style={styles.image} />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Splash2")}
        style={styles.button}
        buttonColor="#FFA500"
        textColor="#4B0082"
        labelStyle={styles.buttonText} 
      >
        Get Started
      </Button>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center" },
  image: { width: "100%", height: "70%", resizeMode: "contain" },
  button: {
    margin: 20,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: "center",
    width: "50%",
    fontSize: 45,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
