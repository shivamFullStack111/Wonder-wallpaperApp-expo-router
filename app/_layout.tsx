import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ headerShown: false }} name="index" />
      <Stack.Screen options={{ headerShown: false }} name="welcomeScreen" />
    </Stack>
    // </ThemeProvider>
  );
}
