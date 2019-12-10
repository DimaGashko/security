
export function expMod(base: number, exp: number, mod: number) {
   if (exp === 1) return base % mod;

   const bs = exp.toString(2).split('').map(b => +b);
   const mods = new Array(bs.length);
   mods[0] = base;

   bs.forEach((b, i) => {
      if (i === 0) return;

      const t = mods[i - 1] ** 2 % mod;
      mods[i] = (b === 1) ? (t * base) % mod : t;
   });
   
   return mods[mods.length - 1];
}
