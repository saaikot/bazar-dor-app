const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function bnToEn(bnStr: string): string {
  return bnStr
    .split('')
    .map((ch) => {
      const idx = bnDigits.indexOf(ch);
      return idx !== -1 ? idx.toString() : ch;
    })
    .join('')
    .replace(/,/g, '');
}

export function enToBn(enNum: number | string): string {
  const numStr = typeof enNum === 'number' ? enNum.toString() : enNum;
  const formatted = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formatted
    .split('')
    .map((ch) => {
      const idx = parseInt(ch, 10);
      return isNaN(idx) ? ch : bnDigits[idx];
    })
    .join('');
}

export function parseBnPrice(bnPrice: string): number {
  return parseFloat(bnToEn(bnPrice)) || 0;
}

export function formatBnPrice(price: number): string {
  return `${enToBn(price)} টাকা`;
}