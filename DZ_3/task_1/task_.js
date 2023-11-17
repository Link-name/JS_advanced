document.addEventListener("DOMContentLoaded", function() {
    displayReviews();
  });
  
  function displayReviews() {
    var reviewsListElement = document.getElementById("reviewsList");
  
    // Получение существующих отзывов из localstorage
    var existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  
    if (existingReviews.length === 0) {
      reviewsListElement.innerHTML = "<p>Отзывов пока нет.</p>";
      return;
    }
  
    // Создание HTML-разметки для отзывов
    var reviewsHTML = "<ul>";
    existingReviews.forEach(function(review) {
      reviewsHTML += "<li><strong>" + review.productName + ":</strong> " + review.reviewText + "</li>";
    });
    reviewsHTML += "</ul>";
  
    // Вставка HTML-разметки в элемент списка отзывов
    reviewsListElement.innerHTML = reviewsHTML;
  }