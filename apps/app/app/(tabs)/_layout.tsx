import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Label, Icon } from "expo-router";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin/build/useDrizzleStudio";

export const unstable_settings = {
  initialRouteName: "home",
};

export default function TabLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const backgroundColor2 = useThemeColor({}, "background2");
  const dbContext = useSQLiteContext();
  useDrizzleStudio(dbContext);
  const tabSelectedColor = useThemeColor({}, "tabIconSelected");
  const tabDefaultColor = useThemeColor({}, "tabIconDefault");

  return (
    <NativeTabs
      labelStyle={{ color: tabDefaultColor }}
      backgroundColor={backgroundColor}
      tintColor={backgroundColor}
      indicatorColor={backgroundColor2}
      rippleColor={tabSelectedColor}
      shadowColor={backgroundColor2}
      iconColor={tabDefaultColor}
      minimizeBehavior="onScrollDown"
    >
      <NativeTabs.Trigger name="home">
        <Label
          selectedStyle={{
            color: tabSelectedColor,
          }}
        >
          Home
        </Label>
        <Icon sf="house" md="home" selectedColor={tabSelectedColor} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="add">
        <Label
          selectedStyle={{
            color: tabSelectedColor,
          }}
        >
          Add
        </Label>
        <Icon sf="plus" md="add" selectedColor={tabSelectedColor} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="discover">
        <Label
          selectedStyle={{
            color: tabSelectedColor,
          }}
        >
          Discover
        </Label>
        <Icon sf="safari" md="explore" selectedColor={tabSelectedColor} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
