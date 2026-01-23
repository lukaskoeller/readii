import { ThemedView } from "@/components/ThemedView";
import { Radius, Spacing } from "@/constants/Sizes";
import { useReadMediaItem, useUpdateMediaItem } from "@/hooks/queries";
import { ActivityIndicator, Dimensions, Share } from "react-native";
import { Icon, Label, Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import WebView from "react-native-webview";
import { Fragment, useEffect } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { openBrowserAsync } from "expo-web-browser";

export default function Article() {
  const data = useReadMediaItem();
  const { updateMediaItem } = useUpdateMediaItem();

  const windowHeight = Dimensions.get("window").height;
  const headerHeight = useHeaderHeight();

  const backgroundColor = useThemeColor({}, "background");
  const backgroundColor2 = useThemeColor({}, "background2");
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  const isStarred = Boolean(data?.isStarred);
  const isReadLater = Boolean(data?.isReadLater);
  const isRead = Boolean(data?.isRead);
  const url = data?.url;

  useEffect(() => {
    updateMediaItem({ isRead: true });
  }, []);

  return (
    <Fragment>
      <Stack.Screen.Title>{""}</Stack.Screen.Title>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          onPress={async () => {
            if (!url) return;
            await Share.share({
              message: `I found this article interesting:\n${url}\n\nFound via readii app!\nhttps://readii.de`,
              url: url,
            });
          }}
          icon={"square.and.arrow.up"}
        />
        <Stack.Toolbar.Menu icon="ellipsis">
          <Stack.Toolbar.MenuAction
            onPress={async () => updateMediaItem({ isStarred: !isStarred })}
          >
            <Label>{isStarred ? "Unstar" : "Star"}</Label>
            <Icon sf={isStarred ? "star.fill" : "star"} />
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction
            onPress={async () => updateMediaItem({ isReadLater: !isReadLater })}
          >
            <Label>
              {isReadLater ? "Remove from Read Later" : "Add to Read Later"}
            </Label>
            <Icon sf={isReadLater ? "clock.badge.fill" : "clock.badge"} />
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction
            onPress={() => updateMediaItem({ isRead: !isRead })}
          >
            <Label>{isRead ? "Mark Unread" : "Mark Read"}</Label>
            <Icon sf="app.badge" md="mark_chat_unread" />
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction
            onPress={async () => {
              if (!url) return;
              await openBrowserAsync(url);
            }}
          >
            <Label>Open Original</Label>
            <Icon sf="arrow.up.forward.app" md="open_in_new" />
          </Stack.Toolbar.MenuAction>
        </Stack.Toolbar.Menu>
      </Stack.Toolbar>
      <ThemedView style={{ height: "100%" }}>
        <WebView
          cacheEnabled
          originWhitelist={["*"]}
          textZoom={100.0}
          webviewDebuggingEnabled
          decelerationRate="normal"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor,
            paddingInline: Spacing.size4,
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <ThemedView
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: windowHeight,
              }}
            >
              <ActivityIndicator size="large" color={textColor} />
            </ThemedView>
          )}
          setSupportMultipleWindows={false}
          onShouldStartLoadWithRequest={(event) => {
            // Only intercept navigation for anchor clicks (not initial load)
            if (
              event.navigationType === "click" || // iOS only
              (event.url !== data?.url && event.url !== "about:blank")
            ) {
              void openBrowserAsync(event.url);
              return false; // Prevent WebView navigation
            }
            return true; // Allow WebView navigation for initial load
          }}
          source={{
            baseUrl: data?.url,
            html: `
                <html>
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <base href="${data?.url}">
                    <title>${data?.title}</title>
                    <link rel="canonical" href="${data?.url}">
                    <style>
                      * {
                        box-sizing: border-box;
                      }

                      html {
                        font-family: system-ui;
                        overflow-x: hidden;
                        inline-size: 100%;
                        padding: 0px;
                        padding-block-start: ${headerHeight}px;
                        padding-block-end: ${Spacing.size12}px;
                        background: ${backgroundColor};
                        color: ${textColor};
                        line-height: 1.6;
                      }

                      body {
                        margin: 0;
                        inline-size: 100%;
                      }
  
                      a {
                        color: ${primaryColor};
                      }
  
                      :is(img,svg,video,iframe) {
                        max-inline-size: 100%;
                        block-size: auto;
                      }

                      pre {
                        background: ${backgroundColor2};
                        border-radius: ${Radius.size3}px;
                        padding: ${Spacing.size1}px;
                        max-inline-size: 100%;
                        block-size: auto;
                        overflow-x: auto;
                      }
                    </style>
                  </head>
                  <body>
                    <h1>${data?.title}</h1>
                    ${data?.content}
                  </body>
                </html>
              `,
          }}
        />
      </ThemedView>
    </Fragment>
  );
}
