import { l10n } from '@/libs/localization'

export class Money {
   private locale = l10n.languageTag ?? 'default'
   constructor(private _cents: number) {}

   get cents() {
      return this._cents
   }

   static create(val: number) {
      return new Money(Math.round(val * 100))
   }

   static createFromCents(val: number) {
      return new Money(val)
   }

   private _toDecimal() {
      return this._cents / 100
   }

   toDecimal() {
      return Intl.NumberFormat(this.locale, {
         style: 'decimal',
         useGrouping: true,
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      }).format(this._toDecimal())
   }

   toCurrency() {
      return Intl.NumberFormat(this.locale, {
         style: 'currency',
         currency: l10n.currencyCode ?? 'USD',
         useGrouping: true,
      }).format(this._toDecimal())
   }
}
