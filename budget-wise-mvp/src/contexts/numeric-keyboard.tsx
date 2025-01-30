import {
   createContext,
   PropsWithChildren,
   useContext,
   useEffect,
   useState,
} from 'react'
import { Animated, StyleSheet, useAnimatedValue, View } from 'react-native'

import { NumericKeyboard } from '@/components/ui/input-currency/custom-keyboard'

type ContextProps = {
   showKeyboard: () => void
   hideKeyboard: () => void
   // onKeyPress?: (key: string) => void
}

const NumericKeyboardContext = createContext<ContextProps | null>(null)

export function NumericKeyboardProvider({ children }: PropsWithChildren) {
   const [visible, setVisible] = useState(false)
   const [display, setDisplay] = useState<'flex' | 'none'>('none')

   const slideAnim = useAnimatedValue(0)

   const showKeyboard = () => setVisible(true)
   const hideKeyboard = () => setVisible(false)

   useEffect(() => {
      const slide = Animated.timing(slideAnim, {
         toValue: visible ? 1 : 0,
         useNativeDriver: true,
         duration: 300,
      })

      if (visible) {
         setDisplay('flex')
         slide.start()
      } else {
         slide.start(() => setDisplay('none'))
      }
   }, [visible])

   const translateY = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['100%', '0%'],
   })

   const containerStyle = StyleSheet.flatten([
      { transform: [{ translateY }], display },
   ])

   return (
      <NumericKeyboardContext.Provider value={{ hideKeyboard, showKeyboard }}>
         {children}
         <Animated.View style={containerStyle}>
            <NumericKeyboard onKeyPress={() => {}} />
         </Animated.View>
      </NumericKeyboardContext.Provider>
   )
}

export function useNumericKeyboard() {
   const hook = useContext(NumericKeyboardContext)

   if (hook === null) {
      throw new Error('Wrap with <NumericKeyboardProvider>')
   }

   return hook
}
