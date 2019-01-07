const adjective = ['Ужасный', 'Злобный', 'Сопливый', 'Трусливый', 'Вонючий', 'Страшный', 'Грозный', 'Угрюмый', 'Мрачный'];
const race = ['Огр', 'Гном', 'Гоблин', 'Орк', 'Великан', 'Дровосек', 'Лилипут', 'Аватар', 'Человек'];
const name = ['Том', 'Макс', 'Дима', 'Витя', 'Петя', 'Юра', 'Леша', 'Саша', 'Вася'];

function returnRandomElem(arr) {
  const min = 0;
  const max = arr.length - 1;
  return arr[Math.floor(Math.random() * (max - min + 1)) + min];
}

export default function createMonsterName() {
  return `${returnRandomElem(adjective)} ${returnRandomElem(race)} ${returnRandomElem(name)}`;
}
