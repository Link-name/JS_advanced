"use strict";
/*
Задание 4:
Пользователи вашего сайта могут добавлять элементы в список. Но есть условие: 
введенное значение должно содержать от 3 до 10 символов.
 
Создайте HTML-структуру:
 
```
<input type="text" class="user-input">
<button class="add-button">Добавить</button>
<ul class="item-list"></ul>
<div class="error-message"></div>
```
 
Необходимо обрабатывать событие добавления элемента в список. Функция, 
обрабатывающая событие, должна выбрасывать исключение, если длина введенного 
значения не соответствует требованиям.
Если исключение было выброшено, необходимо добавить сообщение об ошибке в div.
Не важно, была ошибка или нет, после того как мы совершим попытку добавления 
данных, необходимо вывести в консоль "Попытка добавления элемента завершена."
*/
 
const inputEl = document.querySelector(".user-input");
const btnEl = document.querySelector(".add-button");
const ulEl = document.querySelector(".item-list");
const divEl = document.querySelector(".error-message");
 
btnEl.addEventListener("click", () => {
  try {
    if (inputEl.value.length < 3 || inputEl.value.length > 10) {
      throw new Error("Длина введенного значения не соответствует требованиям");
    }
    const liEl = document.createElement("li");
    liEl.textContent = inputEl.value;
    ulEl.append(liEl);
    divEl.textContent = "";
  } catch (error) {
    divEl.textContent = error.message;
  } finally {
    console.log("Попытка добавления элемента завершена.");
  }
});