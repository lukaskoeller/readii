import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card";
import { Collapsible } from "@/components/Collapsible";
import { ListItemSwitch } from "@/components/ListItemSwitch";
import { TextInputField } from "@/components/TextInputField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useFolder, useMediaSource } from "@/hooks/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";

export default function AddFolder() {
  const [folderName, setFolderName] = useState<string>("");
  const [selectedFeeds, setSelectedFeeds] = useState<Set<string>>(new Set());
  const { readMediaSources } = useMediaSource();
  const { createFolder } = useFolder();
  const { data } = useLiveQuery(readMediaSources());
  const colorBackground = useThemeColor({}, "background");

  return (
    <ScrollView
      style={{
        paddingBlockStart: Spacing.size4,
        backgroundColor: colorBackground,
      }}
    >
      <ThemedView container style={styles.stack}>
        <Card style={styles.stack}>
          <ThemedText color="text3">
            Add a folder to group a set of feeds and view them in a combined
            feed.
          </ThemedText>
          <TextInputField
            label="Folder Name"
            inputProps={{
              onChangeText: setFolderName,
              value: folderName,
            }}
          />
        </Card>
        <Card>
          <Collapsible title="Add Feeds (optional)">
            <FlatList
              scrollEnabled={false}
              data={data.map((item) => ({
                href: {
                  pathname: "/home/feed",
                  params: {
                    mediaSourceId: item.id,
                    feedTitle: item.name,
                    feedUrl: item.feedUrl,
                  },
                },
                id: String(item.id),
                label: item.name,
                icon: (
                  <Image
                    style={styles.thumbnail}
                    source={item.icon?.url}
                    contentFit="cover"
                    transition={500}
                  />
                ),
              }))}
              renderItem={({ item, index }) => (
                <ListItemSwitch
                  checked={selectedFeeds.has(item.id)}
                  onChange={(value) => {
                    const newSelectedFeeds = selectedFeeds;
                    if (value) {
                      newSelectedFeeds.add(item.id);
                    } else {
                      newSelectedFeeds.delete(item.id);
                    }
                    setSelectedFeeds(new Set(newSelectedFeeds));

                  }}
                  icon={item.icon}
                  isLastItem={index === data.length - 1}
                  label={item.label}
                  key={item.id}
                />
              )}
            />
          </Collapsible>
        </Card>
        <ThemedView
          style={{ marginBlockStart: Spacing.size4, marginInline: "auto" }}
        >
          <Button
            onPress={async () => {
              try {
                console.log("Create folder", folderName);
                await createFolder({ folderArgs: { name: folderName } });
              } catch (error) {
                console.error("Error creating folder:", error);
              }
            }}
          >
            Add Folder
          </Button>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.size4,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
});
