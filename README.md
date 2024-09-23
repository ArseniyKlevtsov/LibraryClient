инструкция по запуску проекта:

установка инфраструктуры и проекта:
1. Установите Node.js: https://nodejs.org/en

2. Установите Angular CLI: в консоль - npm install -g @angular/cli

3. Клонировать репозиторий: git clone https://github.com/ArseniyKlevtsov/LibraryClient
  
5. Установите зависимости: в консоль - npm install

Возможные проблемы при запуске:
1.  выполнение сценариев отключено в этой системе => в PowerShell с правами админа - Set-ExecutionPolicy RemoteSigned

2.  проблемы с proxy.conf.json
  2.1 бьыло такое, что angular не видел файл для proxyConfig
    (решал переносм его в корневую папку, перезапуском ide, терминала, компьютера, что помогло не помню)
  2.2 ещё если у вас backend крутится не на https://localhost:7187, следует заменить в proxy.conf.json(лежит в корне проекта) на свой

 запуск:
 1. убедиться в работе SQL SERVER (у меня иногда служба его выключается - MSSQLSERVER)
 2.  запустить сервер backend
 3. npm start или ng serve в консоль из корня проекта
 4.  должно быть подключение к интернету для работы стилей Materialize

Возможная проблема в работе:
  1. используя яндекс браузер, заметил, что если в окне, где открывается swagger backend'a, если в клиенте нажать на <input> с типом "file", то сервер выключится из-за долгого ожидания
     (может так только в яндексе, а может нет) решение - клиент и swagger в разных окнах (или брауерах, я использовал edge), другого не нашёл


Чуть-чуть описания:
Снизу есть скрины страниц
Использовал стили Materialize (типа bootstrap)
Есть прокси файл для смены адреса бэка
Для прикрепления токена авторизации и обработки ошибок сделал интерсепторы

Возможно структура кода покажется анархичной, первый раз работал с ангуляр, да и с js/ts особо много не работал, больше по c# ._.

Кэширование картинок не делал. Но есть кешерование для токенов и корзины.

Есть две основные папки: src/app/components и src/app/shared, в первой лежат странички, во второй логика 

логин:
![image](https://github.com/user-attachments/assets/77eb5ef2-1101-4941-b6f3-7add48e01c72)

стартовая страницы / страница книг:
![image](https://github.com/user-attachments/assets/89959107-1f3e-4a5a-b8d0-33c1a6d76b22)

авторы:
![image](https://github.com/user-attachments/assets/9124ea19-f024-46a4-8ec1-fa065b269ca9)

пример пагинации:
![image](https://github.com/user-attachments/assets/f553d5c0-1ae9-4977-b98d-145a04ab4baa)

Страница создания/редактирования книги:
(кнопка костыль вызывает перезагрузку стилей Materialize, почему-то они не можгут обновиться, если открывать страницу Edit, которая установит значения в селекты)
![image](https://github.com/user-attachments/assets/9f30329c-03e8-4715-bdf8-f0aa89fa7df9)

Вот так селекты выглядят: 
![image](https://github.com/user-attachments/assets/00ef3366-2418-4c98-99a9-b22b2802234d)
![image](https://github.com/user-attachments/assets/8fb3c831-73ba-4648-89d1-a0dd091c63dc)

При ошибках или успешных действиях есть уведомления:
![image](https://github.com/user-attachments/assets/2b81e6b4-8c01-45f2-b0ae-56e0c449c768)

Добавленная книга: 
![image](https://github.com/user-attachments/assets/6983904f-c016-4f85-9e84-1552fa284217)

Корзина аренды:
![image](https://github.com/user-attachments/assets/e3907080-29f4-424d-9840-c36cac9ea874)

Страница с совершёнными пользователем арендами:
![image](https://github.com/user-attachments/assets/f0145fcd-dd37-4934-9c7d-52a058949cfb)

Пример работы фильтра по автору
![image](https://github.com/user-attachments/assets/1e168a70-54d3-4c9e-aace-6235136e8c48)








