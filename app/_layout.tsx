import { Stack } from "expo-router";
import "react-native-reanimated";

import { PaperProvider } from "react-native-paper";
export default function RootLayout() {
  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen options={{ headerShown: false }} name="index" />
        <Stack.Screen options={{ headerShown: false }} name="welcomeScreen" />
      </Stack>
    </PaperProvider>
    // </ThemeProvider>
  );
}
