import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabSelectedColor = Colors[colorScheme ?? "light"].tabIconSelected;
  const tabDefaultColor = Colors[colorScheme ?? "light"].tabIconDefault;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabSelectedColor,
        tabBarInactiveTintColor: tabDefaultColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={28}
              name="house.fill"
              color={focused ? tabSelectedColor : tabDefaultColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={28}
              name="newspaper"
              color={focused ? tabSelectedColor : tabDefaultColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={28}
              name="person.crop.circle"
              color={focused ? tabSelectedColor : tabDefaultColor}
            />
          ),
        }}
      />
    </Tabs>
  );
}
