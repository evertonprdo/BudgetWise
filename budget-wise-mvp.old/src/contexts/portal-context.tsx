import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
   setChildren: (children: React.ReactNode) => void
}

const PortalContext = createContext<Props | null>(null)

export function PortalProvider({ children }: PropsWithChildren) {
   const [portalChildren, setPortalChildren] = useState<React.ReactNode>(null)

   return (
      <PortalContext.Provider value={{ setChildren: setPortalChildren }}>
         <View style={s.container}>{children}</View>
         <View style={s.modal}>{portalChildren}</View>
      </PortalContext.Provider>
   )
}

export function usePortal() {
   const hook = useContext(PortalContext)

   if (!hook) {
      throw new Error('usePortal must be wrapped with <PortalProvider/>')
   }

   return hook
}

const s = StyleSheet.create({
   container: {
      flex: 1,
   },
   modal: {
      position: 'absolute',
      inset: 0,
   },
})
