# 🛡 Universal Mobile Inspector (Android & Apple iOS) v5.0.0 — Детектив Б/У техники

<p align="center">
  <img src="icon.png" width="128" height="128" alt="Universal Mobile Inspector Logo" />
</p>

<p align="center">
  <strong>Единый кроссплатформенный программный комплекс экспресс-диагностики мобильной техники (Android & Apple iPhone/iPad), выявления скрытых ремонтов, детекции обманок контроллера батареи JCID, проверки влагозащиты IP68, криминалистики внезапных выключений, аппаратного износа памяти UFS, блокировок MDM/FRP/iCloud и трансляции экрана.</strong>
</p>

<p align="center">
  <a href="https://github.com/FReeM1409/Android-Inspector-Releases/releases/latest"><img src="https://img.shields.io/badge/%D0%A0%D0%B5%D0%BB%D0%B8%D0%B7-v5.0.0-00e676?style=for-the-badge&logo=github&labelColor=1a1a2b" alt="Release v5.0.0"></a>
  <img src="https://img.shields.io/badge/%D0%9F%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D0%B0-Windows%2010%20%7C%2011%20x64%20%7C%20macOS-00b0ff?style=for-the-badge&logo=windows&labelColor=1a1a2b" alt="Platform">
  <img src="https://img.shields.io/badge/%D0%A2%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D0%B8-Python%203.13%20%7C%20pymobiledevice3%20%7C%20ADB%20Embedded-ffd700?style=for-the-badge&logo=python&labelColor=1a1a2b" alt="Tech">
  <img src="https://img.shields.io/badge/%D0%A3%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0-Apple%20iPhone%20%7C%20iPad%20%7C%20Samsung%20%7C%20Xiaomi%20%7C%20POCO%20%7C%20Pixel-e040fb?style=for-the-badge&logo=apple&labelColor=1a1a2b" alt="Devices">
  <a href="https://freem1409.github.io"><img src="https://img.shields.io/badge/%F0%9F%8C%90%20%D0%9F%D0%BE%D1%80%D1%82%D1%84%D0%BE%D0%BB%D0%B8%D0%BE-freem1409.github.io-80d8ff?style=for-the-badge&logo=googlechrome&labelColor=1a1a2b" alt="Portfolio"></a>
  <a href="https://t.me/sudo_QA"><img src="https://img.shields.io/badge/Telegram-@sudo__QA-0088cc?style=for-the-badge&logo=telegram&labelColor=1a1a2b" alt="Telegram"></a>
</p>

---

<p align="center">
  <a href="https://github.com/FReeM1409/Android-Inspector-Releases/releases/latest">
    <img src="https://img.shields.io/badge/%F0%9F%9A%80%20%D0%A1%D0%9A%D0%90%D0%A7%D0%90%D0%A2%D0%AC%20%D0%9F%D0%9E%D0%A1%D0%9B%D0%95%D0%94%D0%9D%D0%98%D0%99%20%D0%90%D0%92%D0%A2%D0%9E%D0%9D%D0%9E%D0%9C%D0%9D%D0%AB%D0%99%20.EXE%20(GitHub%20Releases)-00e676?style=for-the-badge&logo=windows&logoColor=white&labelColor=1a1a2b" alt="Скачать релиз" />
  </a>
</p>

---

## 🍎 Что нового в грандиозном обновлении v5.0.0

### 1. Поддержка экосистемы Apple (iPhone / iPad) через Usbmux & pymobiledevice3
* **Универсальное горячее USB-обнаружение:** Приложение параллельно опрашивает ADB и нативный протокол Apple Usbmux. При подключении iPhone или iPad устройство мгновенно появляется в списке со значком `🍎 Apple iPhone ...`.
* **Расшифровка поколений Apple Silicon:** Встроенная база `iPhone8,1`..`iPhone17,5` и `iPad Pro` (чипы от Apple A11 до A18 Pro 3nm и Apple M1/M2/M4).
* **12 карточек покомпонентной проверки оригинальности Apple:**
  1. Архитектура чипа Apple Silicon (arm64e, 3 nm);
  2. Декодирование первой буквы модели:
     * `M` — [✔ Retail Original: Новое розничное устройство];
     * `F` — [⚠ Apple Refurbished: Официально восстановлено Apple];
     * `N` — [ℹ Replacement Unit: Обменная сервисная замена по гарантии];
     * `P` — [ℹ Personalized: Персонализированное устройство с гравировкой].
  3. Сверка серийного номера корпуса и материнской платы (`MLBSerialNumber`);
  4. Двойная валидация IMEI 1 и IMEI 2 по алгоритму Луна (Luhn Algorithm);
  5. Статус заводской активации (`ActivationState`) и операторской блокировки (`SIM-Lock / Carrier Bundle`);
  6. Контроль корпоративного лизинга, удаленного управления и MDM-профилей (`IsSupervised` / `CloudConfiguration`);
  7. Глубокий опрос контроллера `AppleSmartBattery` и детекция программаторов JCID/iCopy;
  8. Модуль TrueDepth Face ID & биометрия Secure Enclave;
  9. Заводская калибровка камерного блока Pro Camera и оптической стабилизации;
  10. Стек беспроводных интерфейсов (Wi-Fi 7/6E, Bluetooth 5.3, UWB Apple U2, NFC Apple Pay);
  11. Линейный резонансный тактильный привод Taptic Engine;
  12. Заводская герметичность корпуса IP68 (до 6 метров под водой).
* **Интерактивная 2D Рентген-схема iPhone:** Отрисовка модуля Pro Camera System (3 линзы + LiDAR), чипа Apple A17/A18 Pro, L-образного аккумулятора AppleSmartBattery, кольца MagSafe/Qi2 + NFC, массива TrueDepth Face ID и Taptic Engine с интерактивными тултипами.

---

### 2. 10 Новых Диагностических Функций

1. **💽 Карточка №13: Износ флеш-памяти UFS (Storage Health & Lifetime Wear):**
   * Чтение регистров здоровья памяти JEDEC UFS: `/sys/devices/platform/soc/*/ufshcd*/health_descriptor/life_time_estimation_a`, `b` и `pre_eol_info`.
   * Расшифровка уровня выработки ресурса ячеек TLC/QLC (от 0–10% [ИДЕАЛЬНО] до 90–100% [КРИТИЧЕСКИЙ ИЗНОС]).
2. **💥 Карточка №14: Криминалистика внезапных выключений и отвала чипа (Kernel Panic & Reboot Forensics):**
   * Анализ регистров причин перезагрузки `sys.boot.reason`, `persist.sys.boot.reason` и дампа `dumpsys dropbox` (поиск следов `SYSTEM_RESTART`, `kernel_panic`, `watchdog`, `thermal`).
3. **⚡ Живой Ваттметр мощности зарядки (P = U × I):**
   * Чтение мгновенного тока `current_now` и напряжения `voltage_mv`, расчет реальной потребляемой мощности в Ваттах (например: `⚡ +38.4 Вт (PPS / Super Fast Charging)` или `🔋 -2.1 Вт (Разряд)`).
4. **🖥 Трансляция экрана на ПК (Scrcpy Mirror в 1 клик):**
   * Быстрая кнопка в верхней панели для запуска живой трансляции экрана телефона на монитор ПК с управлением мышью и клавиатурой.
5. **🛡 AdGuard Private DNS (Системная блокировка рекламы без VPN):**
   * Включение защищенного DNS-over-TLS (`dns.adguard-dns.com`) в 1 клик — убирает баннеры и трекеры во всех играх и браузерах без расхода батареи.
6. **💧 Очистка динамиков от воды и пыли (165 Hz Water Eject):**
   * Синтез 6-секундного аудиосигнала резонансной частоты 165 Гц с амплитудной пульсацией, автоматическая установка громкости 100% и выталкивание влаги из акустических сеток динамика.
7. **⚡ Принудительные 120 Гц без троттлинга:**
   * Запись `peak_refresh_rate = 120.0` и `min_refresh_rate = 120.0` для фиксации максимальной плавности экрана во всех приложениях.
8. **🕵️ Радар скрытых IP-камер и маячков в Wi-Fi сети:**
   * Расширенный OUI-анализатор ARP-сканера: автоматическое распознавание камер видеонаблюдения (Hikvision, Dahua, Xiaomi Mi Home Cam, Tapo, Tuya, ESP32-CAM) с ярким тегом `[🎥 КАМЕРА / IOT СЕНСОР]`.
9. **🔋 Охотник за ночным разрядом (Wakelock Hunter):**
   * Сканирование `dumpsys power` и `dumpsys deviceidle` для выявления фоновых процессов, которые будят процессор и сажают аккумулятор за ночь.
10. **📊 Экспорт научного JSON-паспорта устройства:**
    * Сохранение всей собранной телеметрии, векторов оригинальности и сетевого аудита в чистый `.json` файл для архивации и сервисных отчетов.

---

## ⚡ Быстрый старт

### Для пользователей Android:
1. Включите **«Отладку по USB»** в настройках разработчика на смартфоне.
2. Подключите телефон по USB-кабелю к ПК и запустите **`Android_Ultimate_Inspector.exe`**.
3. Подтвердите доверие на экране смартфона.

### Для пользователей Apple iOS (iPhone / iPad):
1. Убедитесь, что установлены драйверы Apple / iTunes (или запустите `УСТАНОВИТЬ_ЗАВИСИМОСТИ_IOS.bat`).
2. Подключите iPhone к ПК по кабелю Lightning / Type-C.
3. Разблокируйте экран и нажмите **«Доверять этому компьютеру»** на iPhone.

---

## 👨‍💻 Автор и Контакты
* **Разработчик:** Кирилл Макаров (`FReeM1409`)
* **Сайт-портфолио:** [https://freem1409.github.io](https://freem1409.github.io)
* **Telegram для связи:** [@sudo_QA](https://t.me/sudo_QA)
* **GitHub:** [https://github.com/FReeM1409/Android-Inspector-Releases](https://github.com/FReeM1409/Android-Inspector-Releases)

---

## 📄 Лицензия
Проект распространяется под свободной лицензией **MIT License**. Разрешено свободное использование в личных, коммерческих и сервисных целях.
