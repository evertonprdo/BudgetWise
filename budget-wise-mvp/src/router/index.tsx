import { Index } from '@/screens'
import { Register } from '@/screens/register'

import { useRouter } from '@/hooks/useRouter'

const Screens = {
   index: Index,
   register: Register,
} as const

export type ScreenNames = keyof typeof Screens
export type NavigateProps = ScreenNames | 'back'
export type Stack = ScreenNames[]

export function Router() {
   const { currentScreen } = useRouter()

   const RenderScreen = Screens[currentScreen]

   return <RenderScreen />
}
