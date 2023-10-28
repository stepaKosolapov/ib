---
## Front matter
lang: ru-RU
title: "Элементы криптографии. Шифрование (кодирование) различных исходных текстов одним ключом"
author: |
	 Косолапов Степан \inst{1}

institute: |
	\inst{1}Российский Университет Дружбы Народов

date: 28 октября, 2023, Москва, Россия

## Formatting
mainfont: Calibri
romanfont: Calibri
sansfont: Calibri
monofont: Calibri
toc: false
slide_level: 2
theme: metropolis
header-includes:
 - \metroset{progressbar=frametitle,sectionpage=progressbar,numbering=fraction}
 - '\makeatletter'
 - '\beamer@ignorenonframefalse'
 - '\makeatother'
aspectratio: 43
section-titles: true

---

# Цели и задачи работы

## Цель лабораторной работы

Освоить на практике применение режима однократного гаммирования
на примере кодирования различных исходных текстов одним ключом.

# Процесс выполнения лабораторной работы

## Вспомогательные функции

```js
const stringToHex = (str) => {
    return str.split('').map(c => c.charCodeAt(0).toString(16)).join(' ');
}

const hexToString = (hexStr) => {
    return hexStr.split(' ').map(c => String.fromCharCode(Number.parseInt(c, 16))).join('');
}
```

## Функция для генерации ключа

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

## Функция шифрования

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

## Генерация ключа

```js
const initialTextLength = 'Штирлиц – Вы Герой!!!!'.length;
console.log('initialTextLength:', initialTextLength);
console.log('generatedKey:', generateKey(initialTextLength));
```

```zsh
node index.js

initialTextLength: 22
generatedKey: 203 3e7 2ea ec 2dc 29 3b4 10b 7f 23 33b 185 1ac 121 26f 97 1d5 3ad 1a3 97 25a 3c1
```

## Шифрование сообщений

```js
const message = 'Штирлиц – Вы Герой!!!!';
const message2 = 'Привет, Штирлиц, ура!!';

const hexMessage = stringToHex(message);
const hexMessage2 = stringToHex(message2);

const hexKey = '203 3e7 2ea ec 2dc 29 3b4 10b 7f 23 33b 185 1ac 121 26f 97 1d5 3ad 1a3 97 25a 3c1';

const enc1 = gammingCipher(hexMessage, hexKey);
const enc2 = gammingCipher(hexMessage2, hexKey);
```


## Известные данные

```js
let known1 = 'Штирлиц***********!!!!';
let hexKnown1 = stringToHex(known1);

let known2 = '******, Штирлиц, *****';
let hexKnown2 = stringToHex(known2);
```

## Разгадывание через перекрытие шаг 1

```js
console.log('known1 xor enc1 xor enc2', hexToString(gammingCipher(enc2, gammingCipher(hexKnown1, enc1))))
known2 = 'Привет, Штирлиц, *ра!!';
console.log('known2 xor enc2 xor enc1', hexToString(gammingCipher(enc1, gammingCipher(hexKnown2, enc2))))
known1 = 'Штирлиц – Вы Герой!!!!';
console.log('known1 xor enc1 xor enc2', hexToString(gammingCipher(enc2, gammingCipher(hexKnown1, enc1))))
known1 = 'Штирлиц – Вы Герой!!!!';
known2 = 'Привет, Штирлиц, ура!!';
```

## Вывод программы

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

# Выводы по проделанной работе

## Вывод

В данной работе мы освоили на практике применение режима однократного гаммирования на примере кодирования различных исходных текстов одним ключом.
