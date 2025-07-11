# Техническое задание (ТЗ) на разработку модуля “Ремонт” для Telegram WebApp Q

## 1. Общая информация
- **Название проекта**: Q — Telegram WebApp для ремонта мобильных устройств
- **Модуль**: Ремонт
- **Целевая аудитория**: 18–45 лет, проживают в Москве, используют смартфоны, ценят удобство, скорость и доверие
- **Устройства**: Все бренды, все модели
- **Платформа**: Telegram WebApp (бот), адаптивный дизайн

## 2. Авторизация
- **Метод**: Telegram Login
- **Сценарий**:
  - Пользователь нажимает кнопку “Начать”.
  - Авторизация через Telegram с получением данных: `user_id`, `username`, `first_name`, `photo_url`.
  - После успешной авторизации — переход к выбору устройства.

## 3. Путь клиента (основной)

### Диаграмма пути клиента
```mermaid
graph TD
  A[Start] --> B[Telegram Login]
  B --> C[Select Brand]
  C --> D[Select Model]
  D --> E[Select Issue]
  E --> F[Upload Photos]
  F --> G[Preliminary Evaluation]
  G --> H[Select Parts]
  H --> I[Select Time & Address]
  I --> J[Confirm Request]
  J --> K[Request Created]
  K --> L[Personal Account]
```

### 3.1. Выбор бренда
- Отображение популярных брендов (Apple, Samsung, Xiaomi и др.).
- Поиск по названию бренда.
- Возможность выбрать вариант “Другое”.

### 3.2. Выбор модели
- Данные моделей предоставляются через API или статичный каталог.
- Возможность ручного ввода модели.

### 3.3. Выбор поломки
- Варианты поломок: экран, батарея, камера, не включается, вода и т.д.
- Кнопка “Указать вручную” для ввода текстовой информации.

### 3.4. Загрузка фото (опционально)
- Инструкция: “Сделайте чёткое фото повреждения”.
- Загрузка 1–5 фотографий.
- Фото обрабатываются ИИ для первичной оценки.

### 3.5. Предварительная оценка
- **Алгоритм оценки**:
  - При наличии API с сайтом — динамическая цена.
  - При отсутствии API — статичный прайс (JSON или таблица).
  - Если загружены фото — подключение ML/ИИ для анализа.
- **Отображение для клиента**:
  - Тип поломки.
  - Стоимость ремонта (диапазон: от / до).
  - Тип запчастей: оригинал / копия.
  - Время ремонта.

### 3.6. Выбор запчастей
- Кнопка выбора: оригинал / копия.
- Отображение итоговой цены с учетом выбранной детали.

### 3.7. Выбор времени и адреса
- **Варианты**:
  - Курьер: ввод адреса (интеграция с картами), выбор даты и временного слота, отображение: “Курьер приедет завтра в 15:00–17:00”.
  - Самостоятельно: показ адреса ремонтной точки и графика работы.

### 3.8. Оплата (опционально)
- Возможность внести предоплату за запчасть.
- Способы оплаты: ЮKassa / CloudPayments (по желанию).

### 3.9. Подтверждение заявки
- **Резюме**:
  - Устройство, поломка, цена, дата, мастер.
- Кнопка: “Подтвердить заявку”.

### 3.10. После отправки
- Статус: “Заявка создана”.
- Переход в личный кабинет.

## 4. Личный кабинет пользователя
- **Статусы ремонта** (поэтапно):
  - Курьер едет.
  - Устройство принято.
  - В работе.
  - Готово.
- Чат с мастером.
- Возможность повторить заявку.
- История ремонтов.
- Кнопка “Позвонить в поддержку” (номер телефона).

## 5. Распределение заявок

### Диаграмма взаимодействия (распределение заявок)
```mermaid
sequenceDiagram
  participant U as User
  participant B as Telegram Bot
  participant A as Admin Panel
  participant M as Master

  U->>B: Submit Request
  B->>A: Send Request Data
  A->>M: Notify Master (via Telegram ID)
  M-->>A: Accept/Reject Request
  A->>B: Update Request Status
  B->>U: Show Status (Personal Account)
  M->>A: Mark as "In Progress" or "Completed"
  A->>B: Update Status
  B->>U: Notify User
```

- Админка для распределения заявок между мастерами.
- У каждого мастера есть Telegram ID.
- Заявки поступают мастеру через бота.
- **Действия мастера**:
  - Принять / отказаться от заявки.
  - Отметить статус: “Принял в работу” / “Завершено”.
- **Отображение для заказчика**:
  - Фото мастера, имя, рейтинг.

## 6. Метрики и аналитика

### 6.1. Клиентская часть
- Количество заходов в бот.
- Количество авторизаций.
- Досмотр до каждого шага (бренд, модель, поломка, оценка, оплата).
- Конверсия в заявку.

### 6.2. Админская часть
- Количество заявок по дням и мастерам.
- Средняя цена ремонта.
- Среднее время выполнения.
- Количество повторных клиентов.

## 7. Безопасность
- Все данные привязаны к Telegram ID.
- Фото шифруются или обрезаются до метаинформации.
- Защита от флуда.
- Модуль логирования.

## 8. Возможности масштабирования
- Легкое добавление новых мастеров.
- Подключение новых городов.
- API-интеграция с сайтом и CRM.
