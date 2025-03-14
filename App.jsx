import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import SplashScreen from "./screens/SplashScreen";
import Splash2 from "./screens/Splash2";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Splash2" component={Splash2} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
