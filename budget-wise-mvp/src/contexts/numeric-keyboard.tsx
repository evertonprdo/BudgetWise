import {
   createContext,
   PropsWithChildren,
   useContext,
   useEffect,
   useState,
} from 'react'
import {
   Animated,
   BackHandler,
   Dimensions,
   Easing,
   StyleSheet,
   useAnimatedValue,
   View,
} from 'react-native'

import { colors } from '@/styles'
import { NumericKeyboard } from '@/components/ui/input-currency/custom-keyboard'

type ContextProps = {
   visible: boolean
   showKeyboard: () => void
   hideKeyboard: () => void
   onKeyPress: (key: string) => void
}

const screenWidth = Dimensions.get('screen').width
const NumericKeyboardContext = createContext<ContextProps | null>(null)

export function NumericKeyboardProvider({ children }: PropsWithChildren) {
   const [visible, setVisible] = useState(false)
   const [display, setDisplay] = useState<'flex' | 'none'>('none')

   const slideAnim = useAnimatedValue(0)

   const showKeyboard = () => setVisible(true)
   const hideKeyboard = () => setVisible(false)

   const onKeyPress = (val: string) => val

   const maxHeight = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, screenWidth],
   })

   const containerStyle = StyleSheet.flatten([
      s.container,
      { hight: maxHeight, display },
   ])
   const contentStyle = StyleSheet.flatten([
      s.flex,
      { pointerEvents: visible ? 'none' : 'auto' } as const,
   ])

   useEffect(() => {
      const slide = Animated.timing(slideAnim, {
         toValue: visible ? 1 : 0,
         useNativeDriver: false,
         duration: 500,
         easing: Easing.out(Easing.circle),
      })

      if (visible) {
         setDisplay('flex')
         slide.start()
      } else {
         slide.start(() => setDisplay('none'))
      }
   }, [visible])

   useEffect(() => {
      const handleBackPress = () => {
         if (visible) {
            hideKeyboard()
         }
         return visible
      }

      BackHandler.addEventListener('hardwareBackPress', handleBackPress)
      return () =>
         BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
   }, [visible])

   return (
      <NumericKeyboardContext.Provider
         value={{ visible, hideKeyboard, showKeyboard, onKeyPress }}
      >
         <View style={contentStyle}>{children}</View>

         <Animated.View style={containerStyle}>
            <NumericKeyboard onKeyPress={onKeyPress} />
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

const s = StyleSheet.create({
   container: {
      backgroundColor: colors.zinc[100],
      borderTopWidth: 1,
      borderColor: colors.zinc[300],
   },
   flex: {
      flex: 1,
   },
})
