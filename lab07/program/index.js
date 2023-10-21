const stringToHex = (str) => {
    return str.split('').map(c => c.charCodeAt(0).toString(16)).join(' ');
}

const hexToString = (hexStr) => {
    return hexStr.split(' ').map(c => String.fromCharCode(Number.parseInt(c, 16))).join('');
}

const generateKey = (length) => {
    const result = [];

    for (let i = 0; i < length; i++) {
        const asciiCode = Math.floor(Math.random() * 1048);
        result.push(asciiCode.toString(16));
    }

    return result.join(' ');
}

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

const initialTextLength = 'Штирлиц – Вы Герой!!!!'.length;

console.log('initialTextLength:', initialTextLength);
console.log('generatedKey:', generateKey(initialTextLength));

const message = 'Штирлиц – Вы Герой!!!!';

const hexMessage = stringToHex(message);

console.log('charMessage:', message);
console.log('hexMessage:\t', hexMessage);

const hexKey = '203 3e7 2ea ec 2dc 29 3b4 10b 7f 23 33b 185 1ac 121 26f 97 1d5 3ad 1a3 97 25a 3c1';

console.log('hexKey:\t\t', hexKey);

const encryptedMessage = gammingCipher(hexMessage, hexKey);

console.log('encryptedMessage:', encryptedMessage);

console.log('charDecryptedMessage:',  hexToString(gammingCipher(encryptedMessage, hexKey)));
console.log('hexDecryptedMessage:',  gammingCipher(encryptedMessage, hexKey));

const newYearMessage = 'С Новым Годом, друзья!';
const hexNewYearMessage = stringToHex(newYearMessage);

console.log('charNewYearMessage:', newYearMessage);
console.log('hexNewYearMessage:', hexNewYearMessage);

const hexNewYearKey = gammingCipher(encryptedMessage, hexNewYearMessage)

console.log('hexNewYearKey:', hexNewYearKey)

console.log('\n\ndecrypting initial message with hexNewYearKey...')

console.log('charDecrypted', hexToString(gammingCipher(encryptedMessage, hexNewYearKey)));
console.log('hexDecrypted', gammingCipher(encryptedMessage, hexNewYearKey));

