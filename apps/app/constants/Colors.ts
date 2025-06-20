/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

export const colors = [
  '#f9f7f5', // hsl(31.21 25% 97%)
  '#f8f5f2', // hsl(31.23 32% 96%)
  '#ebe6e0', // hsl(31.25 23% 90%)
  '#d0cac3', // hsl(31.27 12% 79%)
  '#c5bdb4', // hsl(31.3 13% 74%)
  '#a99f93', // hsl(31.34 11% 62%)
  '#998f85', // hsl(31.36 9% 56%)
  '#83786d', // hsl(31.4 9% 47%)
  '#72695f', // hsl(31.41 9% 41%)
  '#685f55', // hsl(31.42 10% 37%)
  '#554d44', // hsl(31.43 11% 30%)
  '#3f3831', // hsl(31.45 12% 22%)
  '#2c2721', // hsl(31.46 14% 15%)
  '#181511', // hsl(31.46 17% 8%)
  '#0f0d0a', // hsl(31.47 21% 5%)
  '#030302', // hsl(29.16 26% 1%)
];

export const colorsPrimary = {
  light: '#ffa600', // hsl(39.04 100% 50%)
  main: '#e68a00', // hsl(36.16, 100%, 45%)
  dark: '#ad6600', // hsl(35.25 100% 34%)
}

const tintColorLight = colors[6];
const tintColorDark = colors[4];

export const Colors = {
  light: {
    primary: colorsPrimary.main,
    text: colors[12],
    text2: colors[10],
    border: colors[3],
    background: colors[1],
    background2: colors[0],
    tint: tintColorLight,
    icon: colors[12],
    tabIconDefault: colors[8],
    tabIconSelected: colorsPrimary.main,
  },
  dark: {
    primary: colorsPrimary.main,
    text: colors[3],
    text2: colors[5],
    border: colors[12],
    background: colors[15],
    background2: colors[13],
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: colors[4],
    tabIconSelected: colorsPrimary.main,
  },
};

export const CustomLightTheme: Theme = {
  dark: false,
  colors: {
    primary: colorsPrimary.main,
    background: colors[1],
    card: colors[0],
    text: colors[12],
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
  fonts: DefaultTheme.fonts,
};

export const CustomDarkTheme: Theme = {
  dark: true,
  colors: {
    primary: colorsPrimary.main,
    background: colors[15],
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts: DarkTheme.fonts,
};
