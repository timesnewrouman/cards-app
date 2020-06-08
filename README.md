# Yandex.Praktikum
#### Жигайков Роман
#### https://timesnewrouman.github.io/cards-app
###### Спринт 11
###### Версия 1.1

Веб-страница с возможностью редактировая данных о пользователе и добавления карточек с изображением.

Скрипты программы:

1)dev - Разработка. Запуск происходит командой npm run dev. Актуальная версия программы открывается в браузере по адресу localhost:8080, настроено автоматическое обновление страницы проекта при сохранении файлов (hot reload).

2)build - Сборка. Запуск происходит командой npm run build. В результате появляется папка /dist, где хранятся изображения, шрифты, html-файл проекта, а также сформированные файлы .css и .js с hash-образными названиями, адаптированные под движок браузера.

3)deploy - Деплоймент. Запуск происходит командой npm run deploy. В результате локальное содержимое папки dist загружается на сервер в ветку gh-pages.