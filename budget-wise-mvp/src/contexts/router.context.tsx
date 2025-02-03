import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { BackHandler } from 'react-native'

import type { NavigateProps, ScreenNames, Stack } from '@/router'

export const RouterContext = createContext<{
   currentScreen: ScreenNames
   navigate: (screenName: NavigateProps) => void
} | null>(null)

export function RouterProvider({ children }: PropsWithChildren) {
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
   }, [])

   const currentScreen = stack[stack.length - 1]

   return (
      <RouterContext.Provider value={{ currentScreen, navigate }}>
         {children}
      </RouterContext.Provider>
   )
}
