import { Slot } from 'expo-router'
import { DBProvider } from '../contexts/db-context'
import { StatusBar } from 'expo-status-bar'
import { PortalProvider } from '@/contexts/portal-context'

export default function RootLayout() {
   return (
      <DBProvider>
         <StatusBar
            style="dark"
            translucent
         />
         <PortalProvider>
            <Slot />
         </PortalProvider>
      </DBProvider>
   )
}
