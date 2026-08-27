import { Tabs, useRouter } from "expo-router";
import { View } from "react-native";
import AddButton from "../../components/AddButton";

export default function TabsLayout() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 16,
            height: 90,
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            borderTopWidth: 0,
            elevation: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "En service",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: focused ? "#159451" : "#D9DEE7",
                }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="arret"
          options={{
            title: "À l'arrêt",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: focused ? "#F2941F" : "#D9DEE7",
                }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="maintenance"
          options={{
            title: "Maintenance",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: focused ? "#DB3838" : "#D9DEE7",
                }}
              />
            ),
          }}
        />
      </Tabs>

      <AddButton onPress={() => router.push("/add")} />
    </View>
  );
}
