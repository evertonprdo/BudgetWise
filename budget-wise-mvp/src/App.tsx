import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

import RubikBold from '@root/assets/icons/RubikBold.ttf'
import RubikRegular from '@root/assets/icons/RubikRegular.ttf'
import RubikMedium from '@root/assets/icons/RubikMedium.ttf'
import RubikSemiBold from '@root/assets/icons/RubikSemiBold.ttf'

import { Router } from './contexts/router.context'

export default function App() {
   const [loaded] = useFonts({
      RubikBold,
      RubikMedium,
      RubikRegular,
      RubikSemiBold,
   })

   if (!loaded) {
      return null
   }

   return (
      <>
         <StatusBar
            backgroundColor="transparent"
            translucent
            style="dark"
         />
         <Router />
      </>
   )
}
