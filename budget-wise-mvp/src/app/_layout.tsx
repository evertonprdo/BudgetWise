import { Slot } from 'expo-router'
import { DBProvider } from '../hooks/db-provider'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
   return (
      <DBProvider>
         <StatusBar style="auto" />
         <Slot />
      </DBProvider>
   )
}
