import { NativeTabs, Label, Icon } from "expo-router/unstable-native-tabs";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export const unstable_settings = {
  initialRouteName: "home",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabSelectedColor = Colors[colorScheme ?? "light"].tabIconSelected;
  const tabDefaultColor = Colors[colorScheme ?? "light"].tabIconDefault;

  return (
    <NativeTabs
      iconColor={tabDefaultColor}
      labelStyle={{ color: tabDefaultColor }}
    >
      <NativeTabs.Trigger name="home">
        <Label
          selectedStyle={{
            color: tabSelectedColor,
          }}
        >
          Feed
        </Label>
        <Icon sf="newspaper" selectedColor={tabSelectedColor} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="index" hidden={true} />

      <NativeTabs.Trigger name="explore">
        <Label
          selectedStyle={{
            color: tabSelectedColor,
          }}
        >
          Profile
        </Label>
        <Icon sf="person.crop.circle" selectedColor={tabSelectedColor} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
