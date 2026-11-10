# -*- coding: utf-8 -*-
"""
Automated Builder & Publisher for Universal Mobile Inspector (Android & iOS) v6.3.0
Сборка монолитного EXE v6.3.0 через PyInstaller и выгрузка релиза на GitHub.
"""
import os
import sys
import subprocess
import shutil
import webbrowser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)

print("=" * 75)
print("   СБОРКА МОНОЛИТНОГО EXE: UNIVERSAL MOBILE INSPECTOR (ANDROID & IOS) v6.3.0")
print(f"   Рабочая папка: {BASE_DIR}")
print("=" * 75)

# 1. Завершение старых процессов
print("\n[1/5] Завершение мешающих процессов...")
if os.name == 'nt':
    subprocess.run("taskkill /f /im Android_Ultimate_Inspector.exe 2>nul", shell=True)
    subprocess.run("taskkill /f /im Android_Ultimate_Inspector_v6.0.0.exe 2>nul", shell=True)
    subprocess.run("taskkill /f /im Android_Ultimate_Inspector_v6.1.0.exe 2>nul", shell=True)
    subprocess.run("taskkill /f /im Android_Ultimate_Inspector_v6.2.0.exe 2>nul", shell=True)
    subprocess.run("taskkill /f /im Android_Ultimate_Inspector_v6.2.1.exe 2>nul", shell=True)
    subprocess.run("taskkill /f /im Android_Ultimate_Inspector_v6.2.2.exe 2>nul", shell=True)
    subprocess.run("taskkill /f /im Android_Ultimate_Inspector_v6.3.0.exe 2>nul", shell=True)
    subprocess.run("taskkill /f /im adb.exe 2>nul", shell=True)

# 2. Проверка и установка PyInstaller и pymobiledevice3
print("\n[2/5] Проверка PyInstaller и pymobiledevice3...")
try:
    import PyInstaller
    print("  -> PyInstaller найден!")
except ImportError:
    print("  -> PyInstaller не установлен. Выполняем автоматическую установку...")
    subprocess.run([sys.executable, "-m", "pip", "install", "pyinstaller"], check=True)

try:
    import pymobiledevice3
    print("  -> pymobiledevice3 найден (поддержка Apple iOS активна)!")
except ImportError:
    print("  -> Установка pymobiledevice3 для диагностики техники Apple...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "pymobiledevice3"], check=False)
    except Exception as e:
        print(f"  -> Предупреждение установки pymobiledevice3: {e}")

# 3. Подготовка icon.ico
print("\n[3/5] Подготовка иконки icon.ico...")
ico_path = os.path.join(BASE_DIR, "icon.ico")
png_path = os.path.join(BASE_DIR, "icon.png")

if not os.path.exists(ico_path) and os.path.exists(png_path):
    try:
        from PIL import Image
        img = Image.open(png_path)
        img.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
        print("  -> icon.png успешно сконвертирован в icon.ico!")
    except Exception as e:
        print(f"  -> Не удалось сконвертировать иконку: {e}")

# 4. Удаление старых бинарников
old_files = [
    os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector.exe"),
    os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v6.2.0.exe"),
    os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v6.2.1.exe"),
    os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v6.2.2.exe"),
    os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v6.3.0.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v6.2.0.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v6.2.1.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v6.2.2.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v6.3.0.exe"),
]
for f in old_files:
    if os.path.exists(f):
        try:
            os.remove(f)
            print(f"  -> Удален старый бинарник: {os.path.basename(f)}")
        except Exception:
            pass

# 5. Сборка через PyInstaller
print("\n[4/5] Компиляция монолитного v6.3.0 через PyInstaller...")
print("      (Пожалуйста, подождите 30-60 секунд)...")

cmd = [
    sys.executable, "-m", "PyInstaller",
    "--noconfirm",
    "--onefile",
    "--noconsole",
    "--exclude-module", "pkg_resources",
    "--add-binary", "adb.exe;.",
    "--add-binary", "AdbWinApi.dll;.",
    "--add-binary", "AdbWinUsbApi.dll;.",
    "--hidden-import", "pymobiledevice3",
    "--hidden-import", "PIL",
    "--name", "Android_Ultimate_Inspector",
    "dual_manager.py"
]

if os.path.exists(ico_path):
    cmd.insert(4, "--icon")
    cmd.insert(5, ico_path)
    cmd.insert(6, "--add-data")
    cmd.insert(7, "icon.ico;.")

res = subprocess.run(cmd)

dist_exe = os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector.exe")
if not os.path.exists(dist_exe):
    print("\n" + "=" * 75)
    print("[ОШИБКА] Сборка завершилась с ошибкой! dist/Android_Ultimate_Inspector.exe не создан.")
    print("=" * 75)
    input("\nНажмите Enter для выхода...")
    sys.exit(1)

# Копируем файл с именем версии v6.3.0 и в корень репозитория
dist_v630 = os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v6.3.0.exe")
root_exe = os.path.join(BASE_DIR, "Android_Ultimate_Inspector.exe")
root_v630 = os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v6.3.0.exe")

shutil.copyfile(dist_exe, dist_v630)
shutil.copyfile(dist_exe, root_exe)
shutil.copyfile(dist_exe, root_v630)

sz_mb = round(os.path.getsize(dist_exe) / (1024 * 1024), 2)
print("\n" + "=" * 75)
print("[УСПЕХ] EXE v6.3.0 УСПЕШНО СОБРАН И РАЗМЕЩЕН:")
print(f" 1. {dist_exe} ({sz_mb} МБ)")
print(f" 2. {dist_v630}")
print(f" 3. {root_v630}")
print("=" * 75)

# 6. Публикация релиза на GitHub
print("\n[5/5] Подготовка релиза v6.3.0 на GitHub...")
notes = """Universal Mobile Inspector (Android & Apple iOS) v6.3.0:
- 🍏 Исправление чтения реальных аппаратных данных iPhone через IORegistry:
  * Внедрен универсальный метод ios_read_ioreg() с каскадным перебором аргументов (name, plane, ioclass, get_ioregistry_entry).
  * Чтение реального контроллера батареи AppleSmartBattery / IOPMPowerSource: точное определение реальных циклов (CycleCount), остаточной емкости (NominalChargeCapacity / AppleRawMaxCapacity), напряжения (Voltage), температуры (Temperature) и заводского серийного номера чипа BMS (BatterySerialNumber).
  * Устранены дефолтные заглушки (185 циклов / 4422 мАч); емкость берется строго из спецификации модели в APPLE_NOMINAL_BATTERY (например, 3046 мАч для iPhone 11 Pro).
  * Автоматический аудит оригинальности аккумулятора: вывод серийного номера чипа BMS, выявление подделок/замен ([✘ НЕОРИГИНАЛЬНЫЙ АКБ]), накрутки программаторами JCID/iCopy и критического износа.
- 📱 Автоматическое определение оригинальности дисплея и замены матрицы на iOS 15–18:
  * Опрос веток AppleCLCD2, IOMobileFramebufferAP, AppleMultiTouchDevice, датчика освещенности als и MobileGestalt.
  * Анализ калибровок матрицы (CalibrationData, bcfg, alpm-supported), проверка сброса серийника матрицы в нули и статуса True Tone.
- 📅 Исправление декодера даты производства iPhone:
  * Устранен баг отображения «2010 г.» вместо «2020 г.» для 12-символьных серийных номеров Apple с учетом года релиза модели (APPLE_PRODUCT_MAP).
  * Добавлена расшифровка числовых кодов цвета Apple (1 - Space Gray, 2 - Silver, 3 - Gold, 4 - Midnight Green, 5 - Red, 6 - Purple/Blue)."""

gh_bin = shutil.which("gh")
if gh_bin:
    gh_cmd = [
        gh_bin, "release", "create", "v6.3.0",
        dist_exe,
        "--title", "Universal Mobile Inspector (Android & iOS) v6.3.0",
        "--notes", notes,
        "--repo", "FReeM1409/Android-Inspector-Releases"
    ]
    r_gh = subprocess.run(gh_cmd)
    if r_gh.returncode != 0:
        subprocess.run([gh_bin, "release", "upload", "v6.3.0", dist_exe, "--clobber", "--repo", "FReeM1409/Android-Inspector-Releases"])
    print("[OK] Релиз v6.3.0 успешно опубликован на GitHub через GitHub CLI (gh)!")
else:
    try:
        proc = subprocess.Popen("clip", stdin=subprocess.PIPE, shell=True)
        proc.communicate(input=notes.encode("utf-16"))
        print("  -> Описание релиза скопировано в буфер обмена (Ctrl + V)!")
    except Exception as e:
        print(f"  -> Буфер обмена: {e}")

    release_url = "https://github.com/FReeM1409/Android-Inspector-Releases/releases/new?tag=v6.3.0&title=Universal+Mobile+Inspector+v6.3.0"
    print("  -> Открываем страницу создания релиза на GitHub...")
    webbrowser.open(release_url)

if os.path.exists(dist_v630):
    if os.name == 'nt':
        subprocess.run(f'explorer.exe /select,"{dist_v630}"', shell=True)
    elif sys.platform == 'darwin':
        subprocess.run(["open", "-R", dist_v630])

print("\n" + "=" * 75)
print("СБОРКА И ПОДГОТОВКА РЕЛИЗА v6.3.0 ПОЛНОСТЬЮ ЗАВЕРШЕНЫ!")
print("Файлы v6.3.0 готовы в папке:")
print(f"  {dist_v630}")
print(f"  {root_v630}")
print("=" * 75)



