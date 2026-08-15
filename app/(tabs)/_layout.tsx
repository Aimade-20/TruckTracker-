import { Tabs } from "expo-router";
import { View} from "react-native";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,

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
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: 4,
          },
        },

        tabBarItemStyle: {
          paddingTop: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },

        tabBarActiveTintColor: "#159451",
        tabBarInactiveTintColor: "#737B86",
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
                backgroundColor: focused
                  ? "#159451"
                  : "#D9DEE7",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="arret"
        options={{
          title: "À l'arrêt",
        }}
      />
      <Tabs.Screen
        name="maintenance"
        options={{
          title: "Maintenance",
        }}
      />
    </Tabs>
  );
}