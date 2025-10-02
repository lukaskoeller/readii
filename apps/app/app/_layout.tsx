import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CustomDarkTheme, CustomLightTheme } from "@/constants/Colors";
import { DATABASE_NAME } from "@/core/database.config";
import migrations from "@/drizzle/migrations";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";

const queryClient = new QueryClient();
const expoDb = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDb);

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  if (error) {
    return (
      <ThemedView>
        <ThemedText>Migration error: {error.message}</ThemedText>
      </ThemedView>
    );
  }
  if (!success) {
    return (
      <ThemedView>
        <ThemedText>Migration is in progress...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <QueryClientProvider client={queryClient}>
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          options={{ enableChangeListener: true }}
          useSuspense
        >
          <ThemeProvider
            value={colorScheme === "dark" ? CustomDarkTheme : CustomLightTheme}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </SQLiteProvider>
      </QueryClientProvider>
    </Suspense>
  );
}
