"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое id.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/


const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

// Функция для отображения отзывов и форм добавления отзывов
function renderReviews(data) {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = '';

  data.forEach(item => {
    const reviewsContainer = document.createElement('div');
    reviewsContainer.className = 'reviews-container';

    const productTitle = document.createElement('h2');
    productTitle.textContent = item.product;

    const reviewsList = document.createElement('ul');
    item.reviews.forEach(review => {
      const reviewItem = document.createElement('li');
      reviewItem.className = 'review';
      reviewItem.textContent = review.text;
      reviewsList.appendChild(reviewItem);
    });

    const addReviewForm = document.createElement('form');
    const reviewInput = document.createElement('textarea');
    reviewInput.setAttribute('placeholder', 'Введите отзыв (от 50 до 500 символов)');
    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Добавить отзыв';

    addReviewForm.appendChild(reviewInput);
    addReviewForm.appendChild(errorMessage);
    addReviewForm.appendChild(submitButton);

    reviewsContainer.appendChild(productTitle);
    reviewsContainer.appendChild(reviewsList);
    reviewsContainer.appendChild(addReviewForm);

    appContainer.appendChild(reviewsContainer);

    // Обработчик отправки формы
    addReviewForm.addEventListener('submit', event => {
      event.preventDefault();

      const newReviewText = reviewInput.value.trim();

      // Проверка длины отзыва
      if (newReviewText.length < 50 || newReviewText.length > 500) {
        errorMessage.textContent = 'Отзыв должен быть от 50 до 500 символов';
      } else {
        // Очищаем поле ввода и сообщение об ошибке
        reviewInput.value = '';
        errorMessage.textContent = '';

        // Генерируем уникальный ID для нового отзыва
        const newReviewId = Date.now();

        // Добавляем новый отзыв к текущим отзывам
        item.reviews.push({ id: newReviewId, text: newReviewText });

        // Отображаем обновленные отзывы
        renderReviews(data);
      }
    });
  });
}

// Инициализация отображения отзывов
renderReviews(initialData);