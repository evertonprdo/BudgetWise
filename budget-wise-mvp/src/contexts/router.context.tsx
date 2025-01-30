import { createContext, useContext, useEffect, useState } from 'react'
import { BackHandler } from 'react-native'

import { Index } from '@/screens'
import { Details } from '@/screens/details'
import { NumericKeyboardProvider } from './numeric-keyboard'

const Screens = {
   index: Index,
   details: Details,
} as const

const RouterContext = createContext<{
   navigate: (screenName: NavigateProps) => void
} | null>(null)

type ScreenNames = keyof typeof Screens
type NavigateProps = ScreenNames | 'back'
type Stack = ScreenNames[]

export function Router() {
   const [stack, setStack] = useState<Stack>(['index'])

   function navigate(screenName: NavigateProps) {
      if (screenName !== 'back') {
         setStack((prevStack) => [...prevStack, screenName])
         return
      }

      if (stack.length > 1) {
         setStack((prevStack) => prevStack.slice(0, -1))
         return
      }

      BackHandler.exitApp()
   }

   useEffect(() => {
      const handleBackPress = () => {
         navigate('back')
         return true
      }

      BackHandler.addEventListener('hardwareBackPress', handleBackPress)
      return () =>
         BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
   }, [stack])

   const RenderScreen = Screens[stack[stack.length - 1]]
   return (
      <RouterContext.Provider value={{ navigate }}>
         <NumericKeyboardProvider>
            <RenderScreen />
         </NumericKeyboardProvider>
      </RouterContext.Provider>
   )
}

export function useNavigate() {
   const router = useContext(RouterContext)
   if (!router) {
      throw new Error()
   }
   return router
}
