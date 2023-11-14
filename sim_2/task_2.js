"use strict";
/*
Задание 2: 
Мы создаем приложение. У нас планируется два вида пользователей, обычные и 
премиум. Общие свойства этих пользователей необходимо вынести в базовый класс.
 
1. Создайте базовый класс User с базовой информацией (имя и фамилия, которые 
должны создаваться при создании экземпляра класса).
2. Создайте классы PremiumUser и RegularUser, которые наследуются от User. Класс
PremiumUser должен иметь свойство premiumExpiration (дата истечения срока
действия премиум аккаунта, должно задаваться при создании объекта), а у 
RegularUser такого свойства нет.
3. Создайте функцию getAccountInfo(user), которая принимает объект класса User 
и возвращает информацию о наличии и сроке действия премиум-аккаунта. Необходимо
использовать instanceof для проверки типа переданного пользователя и дать 
соответствующий ответ из функции (в свободном формате).
*/
 
class User {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
class PremiumUser extends User {
  constructor(firstname, lastname, premiumExpiration) {
    super(firstname, lastname);
    this.premiumExpiration = premiumExpiration;
  }
}
class RegularUser extends User {}
 
function getAccountInfo(user) {
  if (user instanceof PremiumUser) {
    console.log(`User has premium status until ${user.premiumExpiration}`);
  } else {
    console.log("User hasn't premium status");
  }
}
const user = new PremiumUser("Jon", "Smit", "30.12.2023");
const mainUser = new User("Tom", "Black");
const normalUser = new RegularUser("Jain", "White");
getAccountInfo(user);
getAccountInfo(mainUser);
getAccountInfo(normalUser);
 