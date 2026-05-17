# Latakia Dental Syndicate Branch

Official web/mobile project for **Latakia Dental Syndicate Branch**, built with **React + Vite + Capacitor**.

## Requirements

- Node.js **22+**
- npm
- Java 21 (for Android build)

## Install

```bash
npm ci
```

## Run locally

```bash
npm run dev
```

## Validate and build

```bash
npm run lint
npm run build
```

## Build Android APK

```bash
npm run build
npx cap sync android
cd android
./gradlew assembleRelease
```

APK output:

`android/app/build/outputs/apk/release/app-release.apk`

## GitHub Actions

- `deploy-pages.yml`: builds and deploys web app to GitHub Pages
- `build-android.yml`, `main.yml`, `maein.yml`: build Android release APK on `develop-uat`
