import { l10n } from '@/libs/localization'

export class AppDate {
   private locale = l10n.languageTag ?? 'default'
   private constructor(private _date: Date) {}

   get date() {
      return this._date
   }
   get unix() {
      return Math.floor(this._date.getTime() / 1000)
   }
   get daysInMonth() {
      return new Date(
         this._date.getFullYear(),
         this._date.getMonth() + 1,
         0,
      ).getDate()
   }

   static create(date?: Date) {
      return new AppDate(date ?? new Date())
   }

   static createFromYearMonthDayString(str: string) {
      str += 'T00:00'
      return new AppDate(new Date(str))
   }

   static createFromUnixTimestamp(timestamp: number) {
      return new AppDate(new Date(timestamp * 1000))
   }

   toShortDate() {
      return new Intl.DateTimeFormat(this.locale, {
         dateStyle: 'short',
      }).format(this._date)
   }

   toFullDate() {
      return new Intl.DateTimeFormat(this.locale, {
         dateStyle: 'full',
      }).format(this._date)
   }

   toYearMonthDayString() {
      const year = this.date.getFullYear()
      const month = String(this.date.getMonth() + 1).padStart(2, '0')
      const day = String(this.date.getDate()).padStart(2, '0')

      return `${year}-${String(month)}-${day}`
   }
}
