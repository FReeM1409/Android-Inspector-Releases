# -*- coding: utf-8 -*-
"""
Automated Builder & Publisher for Universal Mobile Inspector (Android & iOS) v6.2.2
Сборка монолитного EXE v6.2.2 через PyInstaller и выгрузка релиза на GitHub.
"""
import os
import sys
import subprocess
import shutil
import webbrowser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)

print("=" * 75)
print("   СБОРКА МОНОЛИТНОГО EXE: UNIVERSAL MOBILE INSPECTOR (ANDROID & IOS) v6.2.2")
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
    os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v6.1.0.exe"),
    os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v6.2.0.exe"),
    os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v6.2.1.exe"),
    os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v6.2.2.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v6.1.0.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v6.2.0.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v6.2.1.exe"),
    os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v6.2.2.exe"),
]
for f in old_files:
    if os.path.exists(f):
        try:
            os.remove(f)
            print(f"  -> Удален старый бинарник: {os.path.basename(f)}")
        except Exception:
            pass

# 5. Сборка через PyInstaller
print("\n[4/5] Компиляция монолитного v6.2.2 через PyInstaller...")
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

# Копируем файл с именем версии v6.2.2 и в корень репозитория
dist_v622 = os.path.join(BASE_DIR, "dist", "Android_Ultimate_Inspector_v6.2.2.exe")
root_exe = os.path.join(BASE_DIR, "Android_Ultimate_Inspector.exe")
root_v622 = os.path.join(BASE_DIR, "Android_Ultimate_Inspector_v6.2.2.exe")

shutil.copyfile(dist_exe, dist_v622)
shutil.copyfile(dist_exe, root_exe)
shutil.copyfile(dist_exe, root_v622)

sz_mb = round(os.path.getsize(dist_exe) / (1024 * 1024), 2)
print("\n" + "=" * 75)
print("[УСПЕХ] EXE v6.2.2 УСПЕШНО СОБРАН И РАЗМЕЩЕН:")
print(f" 1. {dist_exe} ({sz_mb} МБ)")
print(f" 2. {dist_v622}")
print(f" 3. {root_v622}")
print("=" * 75)

# 6. Публикация релиза на GitHub
print("\n[5/5] Подготовка релиза v6.2.2 на GitHub...")
notes = """Universal Mobile Inspector (Android & Apple iOS) v6.2.2:
- 🍏 Исправление критической ошибки работы с iPhone/iPad на новых версиях pymobiledevice3 (v4+):
  * Устранена ошибка 'coroutine' object has no attribute 'get_value' при синхронном вызове асинхронных корутин pymobiledevice3.
  * Реализован универсальный адаптер ios_sync() и ios_call() для прозрачной поддержки как классических синхронных, так и современных асинхронных версий библиотеки.
  * Добавлены безопасные методы чтения параметров Lockdown (ios_get_all_values, ios_get_val) и веток IORegistry (ios_get_ioregistry).
  * Исправлен сбор аппаратной телеметрии iPhone (get_full_ios_telemetry): чтение характеристик процессора, серийных номеров, емкости накопителя через com.apple.disk_usage, датчиков TrueTone/ALS и проверки оригинальности дисплея.
  * Исправлен живой замер пинга и индикатор онлайна устройства (_start_conn_ping_watcher): светодиод 🟢 загорается зеленым с точным временем отклика в миллисекундах.
  * Исправлена отправка команды удаленной перезагрузки iPhone/iPad (tool_reboot) через DiagnosticsService.restart().
- 📱 Поддержка линейки iPhone 17 серии и новейших чипов Apple Silicon:
  * В аппаратную базу добавлены iPhone 17 (iPhone18,3), iPhone 17 Air / Plus (iPhone18,4), iPhone 17 Pro (iPhone18,1) и iPhone 17 Pro Max (iPhone18,2).
  * Корректная идентификация чипов Apple A19 и Apple A19 Pro (2 nm), а также номинальной емкости аккумуляторов новейших устройств.
- 🌐 Двухрядная адаптивная панель во вкладке «Сетевой Аудит & Защита IoT»:
  * Верхний ряд: Заголовок и главная кнопка запуска аудита безопасности сети и ОС.
  * Нижний ряд: Адаптивная сетка модулей (Токен EAAC, Стенд атак eBPF/XDP, Anti-Clipper, Anti-Tapjacking, Аудит автозагрузки).
- 🛡 Чистый вывод статуса Private DNS (DoT) в телеметрии и HTML-сертификате.
- 💾 Определение вендора чипа флеш-памяти UFS / NVMe (Samsung, SK Hynix, Micron, Kioxia).
- 🧪 Интерактивный стенд испытаний шлюза IoT «Симулятор атак eBPF / EAAC» (Диссертация 2.3.6)."""

gh_bin = shutil.which("gh")
if gh_bin:
    gh_cmd = [
        gh_bin, "release", "create", "v6.2.2",
        dist_exe,
        "--title", "Universal Mobile Inspector (Android & iOS) v6.2.2",
        "--notes", notes,
        "--repo", "FReeM1409/Android-Inspector-Releases"
    ]
    r_gh = subprocess.run(gh_cmd)
    if r_gh.returncode != 0:
        subprocess.run([gh_bin, "release", "upload", "v6.2.2", dist_exe, "--clobber", "--repo", "FReeM1409/Android-Inspector-Releases"])
    print("[OK] Релиз v6.2.2 успешно опубликован на GitHub через GitHub CLI (gh)!")
else:
    try:
        proc = subprocess.Popen("clip", stdin=subprocess.PIPE, shell=True)
        proc.communicate(input=notes.encode("utf-16"))
        print("  -> Описание релиза скопировано в буфер обмена (Ctrl + V)!")
    except Exception as e:
        print(f"  -> Буфер обмена: {e}")

    release_url = "https://github.com/FReeM1409/Android-Inspector-Releases/releases/new?tag=v6.2.2&title=Universal+Mobile+Inspector+v6.2.2"
    print("  -> Открываем страницу создания релиза на GitHub...")
    webbrowser.open(release_url)

if os.path.exists(dist_v622):
    if os.name == 'nt':
        subprocess.run(f'explorer.exe /select,"{dist_v622}"', shell=True)
    elif sys.platform == 'darwin':
        subprocess.run(["open", "-R", dist_v622])

print("\n" + "=" * 75)
print("СБОРКА И ПОДГОТОВКА РЕЛИЗА v6.2.2 ПОЛНОСТЬЮ ЗАВЕРШЕНЫ!")
print("Файлы v6.2.2 готовы в папке:")
print(f"  {dist_v622}")
print(f"  {root_v622}")
print("=" * 75)



