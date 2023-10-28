---
# Front matter
title: "Отчёт по лабораторной работе №8"
subtitle: "Элементы криптографии. Шифрование (кодирование) различных исходных текстов одним ключом"
author: "Косолапов Степан Эдуардович НПИбд-01-20"

# Generic otions
lang: ru-RU
toc-title: "Содержание"

# Pdf output format
toc: true # Table of contents
toc_depth: 2
lof: true # List of figures
lot: true # List of tables
fontsize: 12pt
linestretch: 1.5
papersize: a4
documentclass: scrreprt
## I18n
polyglossia-lang:
  name: russian
  options:
	- spelling=modern
	- babelshorthands=true
polyglossia-otherlangs:
  name: english
### Fonts
mainfont: Calibri
romanfont: Calibri
sansfont: Calibri
monofont: Calibri
mainfontoptions: Ligatures=TeX
romanfontoptions: Ligatures=TeX
sansfontoptions: Ligatures=TeX,Scale=MatchLowercase
monofontoptions: Scale=MatchLowercase,Scale=0.9
## Biblatex
biblatex: true
biblio-style: "gost-numeric"
biblatexoptions:
  - parentracker=true
  - backend=biber
  - hyperref=auto
  - language=auto
  - autolang=other*
  - citestyle=gost-numeric
## Misc options
indent: true
header-includes:
  - \linepenalty=10 # the penalty added to the badness of each line within a paragraph (no associated penalty node) Increasing the value makes tex try to have fewer lines in the paragraph.
  - \interlinepenalty=0 # value of the penalty (node) added after each line of a paragraph.
  - \hyphenpenalty=50 # the penalty for line breaking at an automatically inserted hyphen
  - \exhyphenpenalty=50 # the penalty for line breaking at an explicit hyphen
  - \binoppenalty=700 # the penalty for breaking a line at a binary operator
  - \relpenalty=500 # the penalty for breaking a line at a relation
  - \clubpenalty=150 # extra penalty for breaking after first line of a paragraph
  - \widowpenalty=150 # extra penalty for breaking before last line of a paragraph
  - \displaywidowpenalty=50 # extra penalty for breaking before last line before a display math
  - \brokenpenalty=100 # extra penalty for page breaking after a hyphenated line
  - \predisplaypenalty=10000 # penalty for breaking before a display
  - \postdisplaypenalty=0 # penalty for breaking after a display
  - \floatingpenalty = 20000 # penalty for splitting an insertion (can only be split footnote in standard LaTeX)
  - \raggedbottom # or \flushbottom
  - \usepackage{float} # keep figures where there are in the text
  - \floatplacement{figure}{H} # keep figures where there are in the text
---

# Цель работы

Освоить на практике применение режима однократного гаммирования
на примере кодирования различных исходных текстов одним ключом.

# Выполнение работы

1. Код будем писать на языке Javascript. Напишем сперва вспомогательные фунцкии stringToHex и hexToString. Они будут переводить нам набор символов в шестнадцатеричные числа - соответствующие ASCII коду символа в кодировке UTF-16, разделённые пробелом:

```js
const stringToHex = (str) => {
    return str.split('').map(c => c.charCodeAt(0).toString(16)).join(' ');
}

const hexToString = (hexStr) => {
    return hexStr.split(' ').map(c => String.fromCharCode(Number.parseInt(c, 16))).join('');
}
```

2. Напишем функцию, которая сгенерирует случайный набор символов(от 0 до 1048 в ASCII UTF-16) указанной длины, в шестнадцатеричном представлении:

```js
const generateKey = (length) => {
    const result = [];

    for (let i = 0; i < length; i++) {
        const asciiCode = Math.floor(Math.random() * 1048);
        result.push(asciiCode.toString(16));
    }

    return result.join(' ');
}
```

3. Так же напишем основную функцию, которая и будет выполнять шифрование. Она принимает на вход два шестнадцатеричных набора(текст и ключ), и выполняет xor посимвольно, возвращая новый шестнадцатеричный набор:

```js
const gammingCipher = (hexText, hexKey) => {
    const textSplit = hexText.split(' ');
    const keySplit = hexKey.split(' ');

    if (textSplit.length !== keySplit.length) {
        throw new Error('Key and message must have equal lengths.');
    }

    return textSplit.map((textCharHex, i) => {
        const keyCharHex = keySplit[i];

        const xorResult = Number.parseInt(textCharHex, 16) ^ Number.parseInt(keyCharHex, 16); // p_i xor k_i

        return xorResult.toString(16);
    }).join(' ')
}
```

4. Шифруем сообщения:

```js
const message = 'Штирлиц – Вы Герой!!!!';
const message2 = 'Привет, Штирлиц, ура!!';

const hexMessage = stringToHex(message);
const hexMessage2 = stringToHex(message2);

const hexKey = '203 3e7 2ea ec 2dc 29 3b4 10b 7f 23 33b 185 1ac 121 26f 97 1d5 3ad 1a3 97 25a 3c1';

const enc1 = gammingCipher(hexMessage, hexKey);
const enc2 = gammingCipher(hexMessage2, hexKey);
```

5. Предположим мы знаем как выглядят оба сообщения, но в какой-то мере:

```js
let known1 = 'Штирлиц***********!!!!';
let hexKnown1 = stringToHex(known1);

let known2 = '******, Штирлиц, *****';
let hexKnown2 = stringToHex(known2);
```

6. Проделаем known1 xor enc1 xor enc2 и заполняем known2 исходя из результата:

```js
console.log('known1 xor enc1 xor enc2', hexToString(gammingCipher(enc2, gammingCipher(hexKnown1, enc1))))

known2 = 'Привет, Штирлиц, *ра!!';
hexKnown2 = stringToHex(known2);
console.log('known2:', known2);
```

7. Теперь, делаем known2 xor enc2 xor enc1 и заполняем known1 исходя из результата:

```js
console.log('known2 xor enc2 xor enc1', hexToString(gammingCipher(enc1, gammingCipher(hexKnown2, enc2))))
known1 = 'Штирлиц – Вы Герой!!!!';
hexKnown1 = stringToHex(known1);
console.log('known1:', known1);
```

8. Теперь мы знаем полностью первый текст и можем легко найти второй текст:

```js
console.log('known1 xor enc1 xor enc2', hexToString(gammingCipher(enc2, gammingCipher(hexKnown1, enc1))))

known1 = 'Штирлиц – Вы Герой!!!!';
known2 = 'Привет, Штирлиц, ура!!';

console.log('known1:', known1);
console.log('known2:', known2);
```

9. Результат работы программы:

```bash
node index.js

known1 Штирлиц***********!!!!
known2 ******, Штирлиц, *****

known1 xor enc1 xor enc2 Привет,*␑ш!бYцдPра!!
known2: Привет, Штирлиц, *ра!!

known2 xor enc2 xor enc1 Штирлиц – Вы ГероP!!!!
known1: Штирлиц – Вы Герой!!!!

known1 xor enc1 xor enc2 Привет, Штирлиц, ура!!
known1: Штирлиц – Вы Герой!!!!
known2: Привет, Штирлиц, ура!!
```

# Контрольные вопросы

1. Если вы знаете один из исходных текстов, вы можете просто применить операцию XOR к известному тексту и соответствующему зашифрованному тексту. Результатом этой операции будет другой исходный текст. Это связано с свойствами операции XOR.

2. Если ключ повторно используется для шифрования другого текста, становится возможной атака с использованием метода, описанного в примере выше. Два разных текста, зашифрованных с использованием одного и того же ключа, могут быть совмещены с помощью операции XOR, чтобы получить XOR двух исходных текстов. Это может облегчить криптанализ и потенциальное расшифрование исходных текстов.

3. Режим однократного гаммирования реализуется применением операции XOR к каждому символу открытого текста с соответствующим символом секретного ключа. Это происходит последовательно для каждого символа двух текстов, используя один и тот же ключ.

4. Основной недостаток шифрования двух открытых текстов одним ключом - это уязвимость к атакам. Если злоумышленник получит два зашифрованных текста, которые были зашифрованы с использованием одного и того же ключа, то с использованием достаточно простой методики он сможет восстановить исходные тексты.

5. Одним из преимуществ шифрования двух текстов одним ключом является удобство - вам не нужно отслеживать, какой ключ использовался для каждого сообщения. Кроме того, если секретный ключ сохраняется в секрете, этот метод шифрования может быть вполне простым и эффективным. Это также способ шифрования с низкими вычислительными затратами, что может быть полезно в некоторых ситуациях.

# Выводы

В данной работе мы освоили на практике применение режима однократного гаммирования на примере кодирования различных исходных текстов одним ключом.
