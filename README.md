# نقابة أطباء الأسنان فرع اللاذقية

مشروع الواجهة الرسمية (ويب/تطبيق) الخاص بـ **نقابة أطباء الأسنان فرع اللاذقية** مبني باستخدام:

- React
- Vite
- Capacitor

## الهوية المعتمدة

- الاسم: نقابة أطباء الأسنان فرع اللاذقية
- الشعار: مؤقت (Placeholder) إلى حين اعتماد الشعار النهائي
- الألوان: أخضر + ذهبي

## المتطلبات

- Node.js 22+
- npm
- Java 21 (لبناء نسخة أندرويد)

## التثبيت

```bash
npm ci
```

## التشغيل محليًا

```bash
npm run dev
```

## الفحص والبناء

```bash
npm run lint
npm run build
```

## بناء APK للأندرويد

```bash
npm run build
npx cap sync android
cd android
./gradlew assembleRelease
```

مسار ملف الـ APK الناتج:

`android/app/build/outputs/apk/release/app-release.apk`

## GitHub Actions

- `deploy-pages.yml`: بناء ونشر نسخة الويب على GitHub Pages
- `build-android.yml`, `main.yml`, `maein.yml`: بناء إصدار Android على فرع `develop-uat`
