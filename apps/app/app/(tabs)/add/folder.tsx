import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card";
import { Collapsible } from "@/components/Collapsible";
import { HelperText } from "@/components/HelperText";
import { ListItemSwitch } from "@/components/ListItemSwitch";
import { TextInputField } from "@/components/TextInputField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing } from "@/constants/Sizes";
import { useFolder, useMediaSource } from "@/hooks/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useForm } from "@tanstack/react-form";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Alert, FlatList, ScrollView, StyleSheet } from "react-native";
import { z } from "zod/mini";

const schema = z.object({
  name: z.string().check(z.minLength(1, "Folder name is required"), z.trim()),
  description: z.nullable(z.string().check(z.trim())),
  mediaSources: z
    .array(z.number())
    .check(z.minLength(1, "Select at least one feed")),
});

export default function AddFolder() {
  const router = useRouter();
  const { readMediaSources } = useMediaSource();
  const { createFolder } = useFolder();
  const { data } = useLiveQuery(readMediaSources());
  const colorBackground = useThemeColor({}, "background");

  const form = useForm({
    defaultValues: {
      name: "",
      mediaSources: [] as number[],
    },
    validators: {
      onDynamic: schema,
      onBlur: schema,
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log("Create folder", value.name);
        await createFolder({
          folderArgs: { name: value.name },
          mediaSourceArgs: Array.from(value.mediaSources).map((id) => ({
            mediaSourceId: id,
          })),
        });
        router.replace("/add");
      } catch (error) {
        console.error("Error creating folder:", error);
        Alert.alert("Could not add folder", "Please try again later.");
      }
    },
  });

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
          <form.Field name="name">
            {(field) => (
              <TextInputField
                label="Folder Name"
                inputProps={{
                  onChangeText: field.handleChange,
                  value: field.state.value,
                  onBlur: field.handleBlur,
                }}
                helper={{
                  text: field.state.meta.errors[0]?.message,
                  status: "error",
                }}
              />
            )}
          </form.Field>
        </Card>
        <Card>
          <form.Field name="mediaSources" mode="array">
            {(field) => {
              return (
                <>
                  <Collapsible
                    title={`Add Feeds (${field.state.value.length})`}
                  >
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
                        id: item.id,
                        label: item.name,
                        icon: (
                          <Image
                            style={styles.thumbnail}
                            source={item.icon?.url}
                            contentFit="cover"
                            transition={500}
                          />
                        ),
                        field,
                      }))}
                      renderItem={({ item, index }) => (
                        <ListItemSwitch
                          checked={new Set(field.state.value).has(item.id)}
                          onChange={(checked) => {
                            const newSelectedFeeds = new Set(field.state.value);
                            if (checked) {
                              newSelectedFeeds.add(item.id);
                            } else {
                              newSelectedFeeds.delete(item.id);
                            }
                            field.handleChange(Array.from(newSelectedFeeds));
                          }}
                          onBlur={field.handleBlur}
                          icon={item.icon}
                          isLastItem={index === data.length - 1}
                          label={item.label}
                          key={item.id}
                        />
                      )}
                    />
                  </Collapsible>
                  {!field.state.meta.isValid && (
                    <HelperText
                      status="error"
                      text={field.state.meta.errors[0]?.message ?? ""}
                    />
                  )}
                </>
              );
            }}
          </form.Field>
        </Card>
        <ThemedView
          style={{
            marginBlockStart: Spacing.size4,
            marginBlockEnd: Spacing.size9,
            marginInline: "auto",
          }}
        >
          <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
              <Button
                loading={isSubmitting}
                onPress={() => {
                  form.validate("submit");
                  form.handleSubmit();
                }}
              >
                Add Folder
              </Button>
            )}
          </form.Subscribe>
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
