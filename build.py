# -*- coding: utf-8 -*-
"""
Automated Builder & Publisher for Universal Mobile Inspector (Android & iOS) v5.5.1
Сборка монолитного EXE v5.5.1 через PyInstaller и выгрузка релиза на GitHub.
"""
import os
import sys
import subprocess
import shutil
import webbrowser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)

print("=" * 75)
print("   СБОРКА МОНОЛИТНОГО EXE: UNIVERSAL MOBILE INSPECTOR (ANDROID & IOS) v5.5.1")
print(f"   Рабочая папка: {BASE_DIR}")
print("=" * 75)

# 1. Завершение старых процессов
print("\n[1/5] Завершение мешающих процессов...")
if os.name == 'nt':
    subprocess.run("taskkill /f /im Android_Ultimate_Inspector.exe 2>nul", shell=True)
    subprocess.run("taskkill /f /im Android_Ultimate_Inspector_v5.5.1.exe 2>nul", shell=True)
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
    os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v5.5.1.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v5.5.1.exe"),
]
for f in old_files:
    if os.path.exists(f):
        try:
            os.remove(f)
            print(f"  -> Удален старый бинарник: {os.path.basename(f)}")
        except Exception:
            pass

# 5. Сборка через PyInstaller
print("\n[4/5] Компиляция монолитного v5.5.1 через PyInstaller...")
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

# Копируем файл с именем версии v5.5.1 и в корень репозитория
dist_v551 = os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v5.5.1.exe")
root_exe = os.path.join(BASE_DIR, "Android_Ultimate_Inspector.exe")
root_v551 = os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v5.5.1.exe")

shutil.copyfile(dist_exe, dist_v551)
shutil.copyfile(dist_exe, root_exe)
shutil.copyfile(dist_exe, root_v551)

sz_mb = round(os.path.getsize(dist_exe) / (1024 * 1024), 2)
print("\n" + "=" * 75)
print("[УСПЕХ] EXE v5.5.1 УСПЕШНО СОБРАН И РАЗМЕЩЕН:")
print(f" 1. {dist_exe} ({sz_mb} МБ)")
print(f" 2. {dist_v551}")
print(f" 3. {root_v551}")
print("=" * 75)

# 6. Публикация релиза на GitHub
print("\n[5/5] Подготовка релиза v5.5.1 на GitHub...")
notes = """Universal Mobile Inspector (Android & Apple iOS) Hotfix v5.5.1:
- 🛡 Защита от краша PyInstaller: исключен модуль pkg_resources (--exclude-module pkg_resources) для предотвращения падения pyi_rth_pkgres / setuptipsum.txt
- 🛑 Анти-рекурсия процессов: добавлена защита от fork bomb / циклического самозапуска EXE при вызове sys.executable
- 🔋 Фикс детекции скрутки циклов АКБ: строковый парсинг data["cycles"] в int для корректной работы check_battery_bms_fraud
- 🍏 Нормализация 24-символьного UDID iPhone: конвертация PnP-идентификатора Windows в формат usbmuxd (XXXXXXXX-XXXXXXXXXXXXXXXX)
- 🔍 Диагностика экрана iPhone: опрос MobileGestalt (RawPanelSerialNumber, PanelSerialNumber, CoverglassSerialNumber) + рекурсивный поиск IORegistry
- 🎛 Быстрый вердикт True Tone: кнопки-переключатели [✔ True Tone ЕСТЬ] и [✘ True Tone ОТСУТСТВУЕТ] в карточке №7 и интерактивном окне
- 🔄 Интеграция перезагрузки iPhone: DiagnosticsService.restart() вместо холостых ADB вызовов
- 🛡 Защита кнопок ADB при активном iPhone с понятными предупреждениями"""

gh_bin = shutil.which("gh")
if gh_bin:
    gh_cmd = [
        gh_bin, "release", "create", "v5.5.1",
        dist_exe,
        "--title", "Universal Mobile Inspector (Android & iOS) Hotfix v5.5.1",
        "--notes", notes,
        "--repo", "FReeM1409/Android-Inspector-Releases"
    ]
    r_gh = subprocess.run(gh_cmd)
    if r_gh.returncode != 0:
        subprocess.run([gh_bin, "release", "upload", "v5.5.1", dist_exe, "--clobber", "--repo", "FReeM1409/Android-Inspector-Releases"])
    print("[OK] Релиз v5.5.1 успешно опубликован на GitHub через GitHub CLI (gh)!")
else:
    try:
        proc = subprocess.Popen("clip", stdin=subprocess.PIPE, shell=True)
        proc.communicate(input=notes.encode("utf-16"))
        print("  -> Описание релиза скопировано в буфер обмена (Ctrl + V)!")
    except Exception as e:
        print(f"  -> Буфер обмена: {e}")

    release_url = "https://github.com/FReeM1409/Android-Inspector-Releases/releases/new?tag=v5.5.1&title=Universal+Mobile+Inspector+Hotfix+v5.5.1"
    print("  -> Открываем страницу создания релиза на GitHub...")
    webbrowser.open(release_url)

if os.path.exists(dist_v551):
    if os.name == 'nt':
        subprocess.run(f'explorer.exe /select,"{dist_v551}"', shell=True)
    elif sys.platform == 'darwin':
        subprocess.run(["open", "-R", dist_v551])

print("\n" + "=" * 75)
print("СБОРКА И ПОДГОТОВКА РЕЛИЗА v5.5.1 ПОЛНОСТЬЮ ЗАВЕРШЕНЫ!")
print("Файлы v5.5.1 готовы в папке:")
print(f"  {dist_v551}")
print(f"  {root_v551}")
print("=" * 75)
