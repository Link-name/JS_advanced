document.addEventListener("DOMContentLoaded", function() {
    displayProducts();
  });
  
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
    // После добавления отзыва обновляем отображение
    displayProducts();
  }
  
 /*  function displayProducts() {
    var productsListElement = document.getElementById("productsList");
    var existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    if (existingReviews.length === 0) {
      productsListElement.innerHTML = "<p>Отзывов пока нет.</p>";
      return;
    }
    var uniqueProducts = getUniqueProducts(existingReviews);
    var productsHTML = "";
    uniqueProducts.forEach(function(product) {
      productsHTML += "<div class='product'>";
      productsHTML += "<h3>" + product + "</h3>";
      productsHTML += "<button onclick='toggleReviews(\"" + product + "\")'>Показать отзывы</button>";
      productsHTML += "<div id='" + product + "Reviews' style='display:none;'></div>";
      productsHTML += "</div>";
    });
  
    // Вставка HTML-разметки в элемент списка продуктов
    productsListElement.innerHTML = productsHTML;
  } */
  function displayProducts() {
    var productsListElement = document.getElementById("productsList");
  
    var existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  
    if (existingReviews.length === 0) {
      productsListElement.innerHTML = "<p>Отзывов пока нет.</p>";
      return;
    }
  
    var uniqueProducts = getUniqueProducts(existingReviews);
  
    var productsHTML = "";
    uniqueProducts.forEach(function (product) {
      productsHTML += "<div class='product'>";
      productsHTML += "<h3>" + product + "</h3>";
      productsHTML +=
        "<button onclick='toggleReviews(\"" + product + "\")'>Показать отзывы</button>";
      productsHTML +=
        "<div id='" +
        product +
        "Reviews' style='display:none;'>" +
        getReviewsHTML(product) +
        "</div>";
      productsHTML += "</div>";
    });
  
    productsListElement.innerHTML = productsHTML;
  }
  
 /*  function toggleReviews(product) {
    var reviewsElement = document.getElementById(product + "Reviews");
    var buttonElement = document.querySelector(".product h3:contains('" + product + "') + button");
    if (reviewsElement.style.display === "none") {
      reviewsElement.style.display = "block";
      buttonElement.textContent = "Скрыть отзывы";
      displayProductReviews(product);
    } else {
      reviewsElement.style.display = "none";
      buttonElement.textContent = "Показать отзывы";
    }
  } */

  function toggleReviews(product) {
    var reviewsElement = document.getElementById(product + "Reviews");
    var buttonElement = document.querySelector(".product h3").innerText === product ?
      document.querySelector(".product h3").nextElementSibling : null;
  
    if (buttonElement && reviewsElement) {
      if (reviewsElement.style.display === "none") {
        // Показать отзывы
        reviewsElement.style.display = "block";
        buttonElement.textContent = "Скрыть отзывы";
        displayProductReviews(product);
      } else {
        // Скрыть отзывы
        reviewsElement.style.display = "none";
        buttonElement.textContent = "Показать отзывы";
      }
    }
  }
  
  
  function displayProductReviews(product) {
    var reviewsElement = document.getElementById(product + "Reviews");
  
    // Получение существующих отзывов из localstorage
    var existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  
    // Фильтрация отзывов для текущего продукта
    var productReviews = existingReviews.filter(function(review) {
      return review.productName === product;
    });
  
    if (productReviews.length === 0) {
      reviewsElement.innerHTML = "<p>Отзывов пока нет.</p>";
      return;
    }
  
    // Создание HTML-разметки для отзывов продукта
    var reviewsHTML = "<ul>";
    productReviews.forEach(function(review, index) {
      reviewsHTML += "<li>";
      reviewsHTML += "<strong>" + review.productName + ":</strong> " + review.reviewText;
      reviewsHTML += "<button onclick='deleteReview(" + index + ", \"" + product + "\")'>Удалить</button>";
      reviewsHTML += "</li>";
    });
    reviewsHTML += "</ul>";
  
    // Вставка HTML-разметки в элемент списка отзывов продукта
    reviewsElement.innerHTML = reviewsHTML;
  }
  
  function deleteReview(index, product) {
    // Получение существующих отзывов из localstorage
    var existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  
    // Удаление отзыва
    existingReviews.splice(index, 1);
  
    // Сохранение обновленного списка отзывов в localstorage
    localStorage.setItem("reviews", JSON.stringify(existingReviews));
  
    // Перерисовка отзывов продукта
    displayProductReviews(product);
  
    // Перерисовка списка продуктов, возможно удаление продукта
    displayProducts();
  }
  
  function getUniqueProducts(reviews) {
    var uniqueProducts = [];
    for (var i = 0; i < reviews.length; i++) {
      if (uniqueProducts.indexOf(reviews[i].productName) === -1) {
        uniqueProducts.push(reviews[i].productName);
      }
    }
    return uniqueProducts;
  }
  function getReviewsHTML(product) {
    var existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  
    var productReviews = existingReviews.filter(function (review) {
      return review.productName === product;
    });
  
    if (productReviews.length === 0) {
      return "<p>Отзывов пока нет.</p>";
    }
  
    var reviewsHTML = "<ul>";
    productReviews.forEach(function (review, index) {
      reviewsHTML += "<li>";
      reviewsHTML +=
        "<strong>" +
        review.productName +
        ":</strong> " +
        review.reviewText +
        "<button onclick='deleteReview(" +
        index +
        ", \"" +
        product +
        "\")'>Удалить</button>";
      reviewsHTML += "</li>";
    });
    reviewsHTML += "</ul>";
  
    return reviewsHTML;
  }