/* Задание 2: 
Создайте обычный объект library. Необходимо реализовать Symbol.iterator, у 
которого каждая итерация будет возвращать следующую книгу из библиотеки.
Продемонстрируйте работу Symbol.iterator у нашего объекта.
 */
// Список книг:
const books = [
    { title: "1984", author: "George Orwell" },
    { title: "Brave New World", author: "Aldous Huxley" },
    { title: "Fahrenheit 451", author: "Ray Bradbury" },
  ];
 const library = {
   books,
//    [Symbol.iterator]() {
//     let i = 0;
//     const array = this.books;
//     return {       
//         next() {
//             return i < array.length ? {done: false, value: array[i++]} : {done: true};
//         }
//     }
//    }
/* функция генератор елд возвращает что то пока оно есть */
    *[Symbol.iterator]() {
        for (const book of this.books) {
            yield book;
        }
    }
 };
 
 for (const book of library) {
    console.log(book);
 }