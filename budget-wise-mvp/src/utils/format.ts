import { l10n } from '@/libs/localization'

export function formatCurrency(str: string) {
   if (str.length < 3) {
      str = str.padStart(3, '0')
   }

   const cents = str.slice(-2)
   let wholePart = str.slice(0, -2)

   wholePart = wholePart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      l10n.digitGroupingSeparator ?? ',',
   )

   return [wholePart, cents]
}
