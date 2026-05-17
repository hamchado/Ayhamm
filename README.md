# Ayhamm

تطبيق مبني بـ **React + Vite + Capacitor** مع بناء تلقائي للويب وAndroid عبر GitHub Actions.

## المتطلبات

- Node.js **22** أو أحدث
- npm
- Java 21 (لبناء Android)

## التثبيت

```bash
npm ci
```

## أوامر المشروع

```bash
# تشغيل محلي
npm run dev

# فحص الكود
npm run lint

# بناء نسخة الإنتاج (ويب)
npm run build
```

## بناء Android محليًا

```bash
npm run build
npx cap sync android
cd android
./gradlew assembleRelease
```

ملف APK الناتج:

`android/app/build/outputs/apk/release/app-release.apk`

## GitHub Actions

- `deploy-pages.yml`: بناء ونشر الموقع على GitHub Pages.
- `build-android.yml` (ومثله `main.yml`, `maein.yml`): بناء APK تلقائيًا على فرع `develop-uat`.

## GitHub Pages

بعد تفعيل Pages في إعدادات المستودع (Build and deployment: **GitHub Actions**) سيُنشر الموقع على:

`https://hamchado.github.io/Ayhamm/`
