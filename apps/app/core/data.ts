import { Alert } from "react-native";

export const getFeed = async (url: string) => {
  try {
    const response = await fetch(url);
    const rawText = await response.text();
    return rawText;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    Alert.alert("Could not fetch RSS feed", errorMessage, [{ text: "OK" }]);
  }
};
