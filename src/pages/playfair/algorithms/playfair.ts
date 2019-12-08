const alphabet = "абвгдеєжзиіїйклмнопрстуфхцчшщьюя'._".split('');

export function encode() {

}

export function decode() {

}

function createGrid(alphabet: string[], code: string, width: number = 5) {

}

function prepareAlphabet(alphabet: string[], code: string) {
   const codeSet = new Set(code);
   return code + alphabet.filter(ch => !codeSet.has(ch)).join('');
}