//Задание 1

/* let num1 = +prompt('Первое число:');
if(num1 <= 1) {
alert('num1 верный');
} else {
alert('num1 неверный');
}

let num2 = +prompt('Второе число:');
if(num1 >= 3) {
alert('num2 верный');
} else {
alert('num2 неверный');
}
 */
//или

// let num1,
// num2;
// do {
// num1 = +prompt('Первое число:');
// } while(num1 > 1);

// do {
// num2 = +prompt('Второе число:');
// } while(num2 < 3);



//Задание 2

/* let test = true;
(test === true) ? console.log('+++') : console.log('---'); */


//Задание 3
let day;

do {
day = +prompt('Введите число месяца');
} /* while (day > 31  || day === ""); */
while (isNaN(day) || day <= 0 || day > 31);

if (day <= 10) {
alert('Первая декада');
} else if (day > 10 && day <= 20) {
alert('Вторая декада');
} else if (day > 20 && day <= 31) {
alert('Третья декада');
}
