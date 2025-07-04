# План разработки модуля “Ремонт” для Telegram WebApp (Полный вариант)

## Общая информация

- **Название проекта**: Q — Telegram WebApp для ремонта мобильных устройств
- **Модуль**: Ремонт
- **Целевая аудитория**: 18–45 лет, Москва, пользователи смартфонов
- **Платформа**: Telegram WebApp, адаптивный дизайн
- **Цель**: Полная реализация всех функций согласно ТЗ, включая аналитику, ML, веб-админку и масштабируемость.

## Технологический стек

- **Фронтенд**: Vue 3, TypeScript, Telegram WebApp SDK, Tailwind CSS
- **Бэкенд**: Node.js (NestJS), Telegram Bot API
- **База данных**: PostgreSQL
- **Хранилище**: AWS S3 (для фото)
- **Интеграции**: Yandex Maps API, ML API (AWS Rekognition/Google Vision), Yandex Metrika
- **Безопасность**: HTTPS, AES (фото), rate-limiting, reCAPTCHA v3
- **Инфраструктура**: DigitalOcean/AWS, CI/CD (GitHub Actions)

## Оценка трудозатрат

Оценка дана для одного senior full-stack разработчика (8 часов/день).

| Модуль | Задачи | Оценка (часы) |
| --- | --- | --- |
| Авторизация | Telegram Login, сохранение данных | 8–12 |
| Путь клиента |  |  |
| \- Выбор бренда | Список, поиск, JSON/БД | 14–18 |
| \- Выбор модели | Список, ручной ввод, каталог | 20–26 |
| \- Выбор поломки | Список, ручной ввод | 10–14 |
| \- Загрузка фото | Интерфейс, S3, ML API | 30–40 |
| \- Предварительная оценка | Прайс (JSON/БД), ML | 24–34 |
| \- Выбор запчастей | Оригинал/копия, пересчет | 8–12 |
| \- Время и адрес | Yandex Maps, слоты | 20–30 |
| \- Подтверждение заявки | Резюме, отправка | 10–14 |
| \- После отправки | Статус, переход в ЛК | 6–10 |
| Личный кабинет | Статусы, история, чат | 35–45 |
| Админка | Веб-интерфейс, авторизация, уведомления | 40–60 |
| Аналитика | Yandex Metrika, кастомный дашборд | 25–35 |
| Безопасность | Шифрование, rate-limiting, reCAPTCHA | 25–35 |
| API | Каталог, прайс, заявки | 40–60 |
| Инфраструктура | Сервер, CI/CD, деплой | 25–35 |
| Тестирование | Unit (Vitest), E2E (Playwright), QA | 40–60 |
| **Итого** |  | **430–588 часов** |

## Сроки

- **Рабочие дни**: 54–74 дня (\~2.5–3.5 месяца)
- **С учетом выходных**: 3–4 месяца
- **Тестирование (отдельно)**: 40–60 часов (\~5–7.5 дней)

## Временная шкала (Gantt chart)

```mermaid
gantt
    title План разработки (Полный вариант)
    dateFormat  YYYY-MM-DD
    section Подготовка
    Настройка проекта        :a1, 2025-07-07, 5d
    section Авторизация
    Telegram Login           :a2, after a1, 2d
    section Путь клиента
    Каталог (бренды, модели) :a3, after a2, 7d
    Поломки, фото, оценка    :a4, after a3, 12d
    Запчасти, адрес, заявка  :a5, after a4, 8d
    section Личный кабинет
    Статусы, история, чат    :a6, after a5, 7d
    section Админка
    Веб-интерфейс, уведомления :a7, after a6, 10d
    section Аналитика
    Yandex Metrika, дашборд  :a8, after a7, 5d
    section Безопасность
    Шифрование, rate-limiting :a9, after a8, 5d
    section Тестирование
    Unit, E2E, QA            :a10, after a9, 10d
    section Деплой
    Инфраструктура, деплой   :a11, after a10, 5d
```

## Распределение трудозатрат (Pie chart)

```mermaid
pie title Распределение трудозатрат
    "Авторизация" : 10
    "Путь клиента" : 200
    "Личный кабинет" : 40
    "Админка" : 50
    "Аналитика" : 30
    "Безопасность" : 30
    "API" : 50
    "Инфраструктура" : 30
    "Тестирование" : 50
```

## Риски

- Подбор ML API может занять дополнительное время.
- Отсутствие точных данных для каталога.
- Ограничения Telegram WebApp (производительность, размер бандла).
- Баги в интеграциях (Yandex Maps, Telegram Bot API).

## Рекомендации

- Начать с каталога (10 брендов, 50 моделей).
- Использовать Vuetify для UI.
- Настроить Sentry для мониторинга.
- Тестировать на реальных устройствах (iOS, Android).
- После релиза добавить: оплату (ЮKassa), расширенную аналитику.
