# `@readii/app`

## Todos

- [x] FIX: "thumbnail" in `getFeedData`
- [x] FIX: Update should not override isStarred etc.
- [x] FIX: Texts must be rendered within a `<Text>`c…
- [x] FIX: `<pre>` code block
- [x] FEAT: Handle videos in `<HtmlViewer>` (https://github.com/expo/expo/issues/39100)
- [x] FIX: Handle images correctly (nintendo article)
- [ ] PERF: Move `content` to files instead of in DB
- [x] CHORE: Check out Android App
- [x] FIX: Add App icon
- [x] FEAT: Beautify add screen
- [x] FEAT: Add Read/Unread feature
- [x] FIX: Video source retrieval
- [x] FEAT: Add interaction to **Buttons**
- [x] FEAT: Handle after submit behavior
- [x] FEAT: Delete button for folders
- [-] FEAT: Add simple Profile page
- [x] FEAT: Add wait list via google forms
- [x] FIX: Webview internal links must open in separate browser
- [ ] FEAT: Add option to mark all as read
- [ ] FEAT: Add feed suggestions
- [ ] FEAT: Add language support to suggestions
- [ ] FIX: Over-swipe color
- [ ] FEAT: Add background updates and notifications
- [ ] FEAT: Add feed settings
  - [ ] FEAT: add view options (Open with: Default / Viewer / In-App-Browser / Reader View)
  - [ ] FEAT: Add Feed URL & option to share link
  - [ ] FEAT: Manage Folder participation
- [ ] FEAT: Fetch og data / favicon etc.
- [x] FEAT: Implement `onRefresh` handling
- [ ] FEAT: Add Payment handling
```json
[
  "@stripe/stripe-react-native", {
    "merchantIdentifier": "merchant.com.anonymous.readiiapp",
    "publishableKey": "pk_test_51SC2ksQVrVh1kP5IzIa9JOUuyzygWQ1jyqYErW4bvK4E0cqOCrXr4sLxu634ROmqv6upvuFvt80menpoehqE1NOk00rUeyxUgl",
    "enableGooglePay": true
  }
],
```
- [x] FEAT: Add Folders / Collections
- [ ] FEAT: Open web links in webview
- [ ] FEAT: Fully support bluesky
- [ ] FEAT: Add support for Reddit
- [ ] FEAT: Add support for Newsletter
  - https://orm.drizzle.team/docs/get-started/sqlite-new#step-6---applying-changes-to-the-database
  - https://hono.dev/docs/getting-started/nodejs
  - https://kill-the-newsletter.com/feeds/tvuvsyy0mvhk0yd5x0qc
  - https://kill-the-newsletter.com/feeds/kewz3og88bmsed7avkxz.xml
- [ ] FEAT: Show website in reader mode
  - https://github.com/mozilla/readability
- [ ] FEAT: Add Onboarding Flow!
- [ ] FEAT: Add empty feed UI
- [x] FEAT: Allow deep linking (e.g. suggest cool content on social media and deep link)
  - [x] FEAT: add url param to /add/feed to allow prefill RSS Feeds
- [ ] FEAT: Add "All feeds" tab
- [ ] FEAT: Add support for Podcasts
  - [ ] FEAT: Transcribe Podcast to make it searchable
- [ ] FEAT: Add support for Google Alert
- [ ] FEAT: Add support for YouTube
- [ ] FEAT: Add "Weekly Digest", an AI generated summary of the week's news
  - https://www.youtube.com/watch?v=zReFsPgUdMs&list=WL&index=2

### Backlog

- [ ] FEAT: Search for Feeds
- [ ] FEAT: Transcribe Podcasts
- [ ] FEAT: Add Notifications
- [ ] FEAT: Add "Add to readii" in context menus of the browser

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Issues

- https://discord.com/channels/695411232856997968/1418247937405878273
- Multiple header: https://discord.com/channels/695411232856997968/1268957485037916200/1419422830965293190

## Upgrade Expo

https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/

## Update Expo Packages

```zsh
npx expo install --check
```

## Drizzle Studio (SQLite Client)
1. Run the app via `pnpm app:ios` (root) or `pnpm ios` (`/app` root).
2. Press `Shift + M`. Select `expo-drizzle-studio-plugin`.
3. Drizzle Studio will open in a new browser tab.

More information: [Modern SQLite for React Native apps](https://expo.dev/blog/modern-sqlite-for-react-native-apps)

## References

- https://expo.dev/blog/modern-sqlite-for-react-native-apps

## Toolbar

Generate migrations by running:
```zsh
npx drizzle-kit generate
```

Create development build:
```zsh
pnpm prebuild
```

## Docs

- Expo and SQLite: https://orm.drizzle.team/docs/get-started/expo-new

## Helpful

- Expo Router v7
   - https://www.linkedin.com/posts/betomoedano_the-new-expo-router-v7-header-api-is-so-elegant-activity-7407389196727914496-p-Dh/
   - http://youtube.com/post/UgkxJSwtBkJ5bpMscZmQrDrOXYDsEvcutdo6?si=gAtOS7pfq6xgE3oZ
- Android SDK Location: `/Users/lukas/Library/Android/sdk`
- Debugging Webviews: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Debugging.md
- Expo UI Playground: https://github.com/betomoedano/expo-ui-playground
