
export default class Grid {
   constructor(private alphabet: string[], private delimiter: string, private width = 5) { 

   }

   static createEnGrid() {
      return new Grid('abcdefghiklmnopqrstuvwxyz'.split(''), 'x', 5);
   }

   static createUaGrid() {
      return new Grid("абвгдеєжзиіїйклмнопрстуфхцчшщьюя'._".split(''), "'", 5);
   }
}