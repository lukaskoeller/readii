import { NativeTabs, Label, Icon } from "expo-router/unstable-native-tabs";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin/build/useDrizzleStudio";

export const unstable_settings = {
  initialRouteName: "home",
};

export default function TabLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const colorScheme = useColorScheme();
  const dbContext = useSQLiteContext();
    useDrizzleStudio(dbContext);
  const tabSelectedColor = Colors[colorScheme ?? "light"].tabIconSelected;
  const tabDefaultColor = Colors[colorScheme ?? "light"].tabIconDefault;

  return (
    <NativeTabs
      iconColor={tabDefaultColor}
      labelStyle={{ color: tabDefaultColor }}
      backgroundColor={backgroundColor}  
      tintColor={backgroundColor}
    >
      <NativeTabs.Trigger name="home">
        <Label
          selectedStyle={{
            color: tabSelectedColor,
          }}
        >
          Home
        </Label>
        <Icon sf="house" selectedColor={tabSelectedColor} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="add">
        <Label
          selectedStyle={{
            color: tabSelectedColor,
          }}
        >
          Add
        </Label>
        <Icon sf="plus" selectedColor={tabSelectedColor} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="index" hidden={true} />

      <NativeTabs.Trigger name="profile">
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
