document.addEventListener("DOMContentLoaded", function() {
  displayProducts();
});

function displayProducts() {
  var productsListElement = document.getElementById("productsList");

  // Получение существующих отзывов из localstorage
  var existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];

  if (existingReviews.length === 0) {
    productsListElement.innerHTML = "<p>Отзывов пока нет.</p>";
    return;
  }

  // Создание уникального списка продуктов
  var uniqueProducts = [...new Set(existingReviews.map(review => review.productName))];

  // Создание HTML-разметки для продуктов и их отзывов
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
}

function toggleReviews(product) {
  var reviewsElement = document.getElementById(product + "Reviews");
  var buttonElement = document.querySelector(".product h3:contains('" + product + "') + button");

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

function displayProductReviews(product) {
  var reviewsElement = document.getElementById(product + "Reviews");

  // Получение существующих отзывов из localstorage
  var existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // Фильтрация отзывов для текущего продукта
  var productReviews = existingReviews.filter(review => review.productName === product);

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
