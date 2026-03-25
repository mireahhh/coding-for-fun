# Шаблон статичного сайта на webpack

## О шаблоне

> Шаблонный код, boilerplate-код (англ. boilerplate code) — нетворческий программный код, который программисту приходится писать вследствие требований языка программирования, операционной системы, библиотеки подпрограмм, манеры программирования и прочего. Название «шаблонный» говорит, что он повторяется из функции в функцию, из программы в программу с минимальными изменениями. (c) _Википедия_

Это шаблон проекта на webpack, который можно повторно использовать практически без изменений для настройки окружения разработчика. Опирайтесь на образец структуры и шаблонных файлов, представленных в коде, при создании своего проекта. Шаблон взят из публичного репозитория https://github.com/annkomkova/new-static-site-boilerplate

## Установка

Склонируйте репозиторий на своё устройство:

```bash
git clone git@github.com:annkomkova/new-static-site-boilerplate.git
```

Перейдите в созданную папку:

```bash
cd new-static-site-boilerplate
```

Установка необходимых yarn и node_modules:
Установите node js (Решили, короче фронтэндеры писать бэкенд, а ничего кроме js не знают)))

```bash
https://nodejs.org/en/download
```

Затем установите `yarn` через `npm`

```bash
npm install --global yarn
```

И установите зависимости `yarn`

```bash
yarn
```

Запуск на локальном сервере (автоилд + автоизменения):

```bash
yarn start
```

Сборка версии для продакшена (перед пушом на гит):

```bash
yarn build
```

Сборка версии для разработки (для отладки, в начале - забейте):

```bash
yarn watch
```

Перевод Windows Powershell в CMD режим (nmp yarn)

```
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Удаление данных гит git Учётная запись

```
Панель управления -> Диспетчер учетных данных -> Учётные данные виндовс -> Удалить все файлы с git (около 1-3шт)
```

Настройка Гит Git в ВС Коде VS Code VCS

```
git config user.name "mireahhh"
git config user.email mireahhh@yandex.ru
git config --global user.name "mireahhh"
git config --global user.email mireahhh@yandex.ru
```

Про основные команды гит:

```
Проверить настройки гита
git config --list
Проверить настройки гита +дерево настроек
git config --list --show-origin
Привязать к репозиторию
git remote set-url origin htt_Полная_ссылка.git
Узнать к какому репозиторию привязан проект
git remote -v
Узнать в какой ветке находимся
git branch
Создать ветку + переключиться
git checkout -b Название
Переключиться на ветку
git checkout Название
Пропушить в отпределённую ветку
git push -u origin gh-pages
После можно писать просто
git push
```

Стандартный пуш на гит:

```
Забилдить новое
    yarn build
Добавить новое
    git add .
Сохранить изменения
    git commit -m "имя_комита"
Запушить
    git push
```
