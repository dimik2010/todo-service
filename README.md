# TODO_SERVICE

Веб-сервис для создания TODO заметок

Весь JavaScript код расположен в папке `/front/src`. Для сборки `bundle.js` необходимо воспользоваться 
```
npx webpack --config webpack.config.js 
```
предварительно установив `node.js` и `webpack`.

В качестве базы данных используется MySql.

Изменения тудушек подхватываются и отправляются на сервер.

Скриншоты:

### Login page:
![Screenshot](https://user-images.githubusercontent.com/28817102/39148967-576c7c52-4746-11e8-8d12-deadc3baf044.png)

### All todos:

![Screenshot](https://user-images.githubusercontent.com/28817102/39148973-5affde68-4746-11e8-8a4c-79747de0234d.png)

### Active todos:
![Screenshot](https://user-images.githubusercontent.com/28817102/39148976-5d6b1bf4-4746-11e8-8dac-53f80d4c0cf9.png)

### Completed:
![Screenshot](https://user-images.githubusercontent.com/28817102/39148978-6074cdea-4746-11e8-8318-c8f0800d73f1.png)