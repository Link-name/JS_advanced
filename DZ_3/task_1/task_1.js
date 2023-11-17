/* 1. Страница добавления отзыва о продукте.
Должна содержать форму с полем для ввода названия продукта и текстовое поле 
для текста отзыва.
Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в localstorage.
Необходимо реализовать проверку, оба поля должны быть заполнены, если это не 
так, необходимо выводить ошибку пользователю. */
function addReview() {
    var productName = document.getElementById("productName").value;
    var reviewText = document.getElementById("reviewText").value;
    var errorElement = document.getElementById("error");
  
    // Создаем промис для асинхронной валидации
    var validationPromise = new Promise(function(resolve, reject) {
      // Проверка на заполненность полей
      if (productName === "" || reviewText === "") {
        reject("Оба поля должны быть заполнены.");
      } else {
        resolve();
      }
    });
  
    // Обработка промиса
    validationPromise
      .then(function() {
        // Очистка сообщения об ошибке
        errorElement.textContent = "";
  
        // Создание объекта отзыва
        var review = {
          productName: productName,
          reviewText: reviewText
        };
  
        // Сохранение отзыва в localstorage
        return saveReview(review);
      })
      .then(function() {
        // Очистка полей формы
        document.getElementById("productName").value = "";
        document.getElementById("reviewText").value = "";
  
        alert("Отзыв успешно добавлен!");
      })
      .catch(function(error) {
        // Вывод ошибки пользователю
        errorElement.textContent = error;
      });
  }
  
  function saveReview(review) {
    // Возвращаем промис для асинхронного сохранения в localstorage
    return new Promise(function(resolve) {
      // Получение существующих отзывов из localstorage
      var existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  
      // Добавление нового отзыва
      existingReviews.push(review);
  
      // Сохранение обновленного списка отзывов в localstorage
      localStorage.setItem("reviews", JSON.stringify(existingReviews));
  
      resolve();
    });
  }