@echo off
chcp 65001 > nul
echo ========================================================
echo        AGS & ÖABT ASİSTANI - GITHUB & APK YÜKLEYİCİ
echo ========================================================
echo.
echo Bu araç projenizi GitHub'a yükleyecek ve GitHub Actions
echo üzerinden otomatik APK derlemesini başlatacaktır.
echo.
set /p REPO_URL="GitHub Repository URL'inizi yapıştırın (Örn: https://github.com/kullanici/ags-asistani.git): "

if "%REPO_URL%"=="" (
    echo [HATA] Bir URL girmediniz! Lütfen tekrar deneyin.
    pause
    exit /b
)

echo.
echo [1/3] Git remote ayarlanıyor...
git remote remove origin > nul 2>&1
git remote add origin %REPO_URL%

echo [2/3] Değişiklikler GitHub main dalına gönderiliyor...
git branch -M main
git push -u origin main --force

echo.
echo ========================================================
echo [BAŞARILI] Kodlar GitHub'a yüklendi!
echo.
echo Şimdi GitHub'da reponuzun "Actions" sekmesine gidin.
echo "Build AGS Asistani Android APK" işlemi otomatik başladı.
echo 3-4 dakika sonra APK hazır olup "Artifacts" bölümünden indirilebilir olacak!
echo ========================================================
pause
