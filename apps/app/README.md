# Welcome to your Expo app 👋

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

## Create Development Build

```zsh
pnpm prebuild
```

## Drizzle Studio (SQLite Client)
1. Run the app via `pnpm app:ios` (root) or `pnpm ios` (`/app` root).
2. Press `Shift + M`. Select `expo-drizzle-studio-plugin`.
3. Drizzle Studio will open in a new browser tab.

More information: [Modern SQLite for React Native apps](https://expo.dev/blog/modern-sqlite-for-react-native-apps)

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## References

- https://expo.dev/blog/modern-sqlite-for-react-native-apps

## Toolbar

Generate migrations by running:

```zsh
npx drizzle-kit generate
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
