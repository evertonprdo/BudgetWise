import { PropsWithChildren } from 'react'
import { Animated, Pressable, StyleSheet, useAnimatedValue } from 'react-native'

export function Button({ children }: PropsWithChildren) {
   const fadeAnim = useAnimatedValue(1)

   function handlePressIn() {
      Animated.timing(fadeAnim, {
         toValue: 0,
         duration: 300,
         useNativeDriver: true,
      }).start()
   }

   function handlePressOut() {
      Animated.timing(fadeAnim, {
         toValue: 1,
         duration: 300,
         useNativeDriver: true,
      }).start()
   }

   return (
      <Pressable
         style={s.container}
         onPressIn={handlePressIn}
         onPressOut={handlePressOut}
      >
         <Animated.View style={[s.btn, { opacity: fadeAnim }]}>
            {children}
         </Animated.View>
      </Pressable>
   )
}

const s = StyleSheet.create({
   container: {},
   btn: {
      borderRadius: 6,
      backgroundColor: 'red',
      paddingVertical: 16,
      paddingHorizontal: 24,
   },
})
