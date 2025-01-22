import { l10n } from '../libs/localization'

export class AppDate {
   private locale = l10n.regionCode ?? 'default'
   private constructor(private _date: Date) {}

   get date() {
      return this._date
   }
   get unix() {
      return Math.floor(this._date.getTime() / 1000)
   }

   static create(date: Date) {
      return new AppDate(date)
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
}
