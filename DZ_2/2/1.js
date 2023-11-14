"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/
class Library {
    constructor(initialBooks) {
      // Проверяем наличие дубликатов
      if (new Set(initialBooks).size !== initialBooks.length) {
        throw new Error("Initial book list contains duplicates");
      }
  
      // Инициализируем приватное свойство #books
      this.#books = [...initialBooks];
    }
  
    get allBooks() {
      return this.#books;
    }
  
    addBook(title) {
      // Проверяем, есть ли книга с таким названием уже в списке
      if (this.#books.includes(title)) {
        throw new Error(`Book '${title}' already exists in the library`);
      }
  
      // Добавляем книгу в список
      this.#books.push(title);
    }
  
    removeBook(title) {
      // Проверяем есть ли книга с таким названием 
      const index = this.#books.indexOf(title);
      if (index === -1) {
        throw new Error(`Book '${title}' not found in the library`);
      }
  
      // Удаляем книгу из списка
      this.#books.splice(index, 1);
    }
  
    hasBook(title) {
      // Проверяем наличие книги 
      return this.#books.includes(title);
    }
  
    #books = [];
  }
  
  // Пример использования класса
  const initialBooks = ["Book1", "Book2", "Book3"];
  const library = new Library(initialBooks);
  
  console.log("Initial book list:", library.allBooks);
  
  library.addBook("Book4");
  console.log("After adding Book4:", library.allBooks);
  
  library.removeBook("Book2");
  console.log("After removing Book2:", library.allBooks);
  
  console.log("Does the library have Book3?", library.hasBook("Book3"));
  console.log("Does the library have Book2?", library.hasBook("Book2"));