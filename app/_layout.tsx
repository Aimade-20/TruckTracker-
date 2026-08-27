import { Stack } from "expo-router";
import { TruckProvider } from "../context/TrucksContext";

export default function RootLayout() {
  return (
    <TruckProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </TruckProvider>
  );
}
