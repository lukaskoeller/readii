import { Card } from "@/components/Card";
import { TextInputField } from "@/components/TextInputField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontSize, Spacing } from "@/constants/Sizes";
import { StyleSheet } from "react-native";

export default function AddCollection() {
  return (
    <ThemedView container>
      <Card style={styles.card}>
        <TextInputField
          label="Title"
          inputProps={{
            inputMode: "text",
            // onChangeText: handleOnChangeText,
            // value: feedUrl,
          }}
        />
      </Card>
      <ThemedText>
        A collection allows you to group multiple feeds together. You can
        further customize which items are shown in your collection by adding
        filters.
      </ThemedText>
      <ThemedText style={{ marginTop: FontSize.size3 }}>
        For example, you could create a collection called &quot;Tech News&quot;
        and add all your tech-related feeds to it. Then, add a filter to show
        only articles containing the word &quot;AI.&quot;
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBlockEnd: Spacing.size3,
  },
});
