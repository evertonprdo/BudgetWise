import { AppMoney } from '@/utils/app-money'

export function isValidAmount(appMoney: AppMoney) {
   return appMoney.cents > 0
}

export function isValidDescription(text: string) {
   return text.trim().length > 3 && text.trim().length < 500
}
