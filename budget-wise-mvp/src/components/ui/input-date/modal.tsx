import { useEffect, useState } from 'react'
import {
   Text,
   View,
   Easing,
   Animated,
   StyleSheet,
   Dimensions,
   ModalProps,
   Modal as RNModal,
   useAnimatedValue,
} from 'react-native'

import { X } from '@/assets/icons'
import { colors, fonts, opacity, sizes } from '@/styles'

type Props = {
   title?: string
   onRequestClose?: () => void
} & Omit<ModalProps, 'onRequestClose'>

export function Modal({ visible, children, onRequestClose, ...props }: Props) {
   const [innerVisible, setInnerVisible] = useState(false)

   const fadeAnim = useAnimatedValue(0)
   const slideAnim = useAnimatedValue(0)

   const fadeIn = Animated.timing(fadeAnim, { toValue: 1, ...fadeConfig })
   const fadeOut = Animated.timing(fadeAnim, { toValue: 0, ...fadeConfig })

   const slideIn = Animated.timing(slideAnim, { toValue: 1, ...slideConfig })
   const slideOut = Animated.timing(slideAnim, {
      toValue: 0,
      ...slideConfig,
   })

   function closeModal() {
      slideOut.start(() => fadeOut.start(() => setInnerVisible(false)))
   }
   function openModal() {
      setInnerVisible(true)
      fadeIn.start(() => slideIn.start())
   }

   useEffect(() => {
      if (visible && !innerVisible) {
         return openModal()
      }

      if (!visible && innerVisible) {
         return closeModal()
      }
   }, [visible])

   const translateY = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [Screen.height, 0],
   })

   const bgStyle = StyleSheet.compose(s.bg, { opacity: fadeAnim })
   const containerStyle = StyleSheet.compose(s.container, {
      transform: [{ translateY }],
   })

   return (
      <RNModal
         visible={innerVisible}
         transparent
         statusBarTranslucent
         onRequestClose={onRequestClose}
         {...props}
      >
         <Animated.View style={bgStyle}>
            <Animated.View style={containerStyle}>
               <View style={s.modal}>
                  <View style={s.divider} />

                  <View style={s.header}>
                     <Text style={s.title}>Header</Text>
                     <X
                        onPress={onRequestClose}
                        color={colors.stone[500]}
                        size={24}
                     />
                  </View>

                  {children}
               </View>
            </Animated.View>
         </Animated.View>
      </RNModal>
   )
}

const Screen = Dimensions.get('screen')

const fadeConfig = {
   duration: 300,
   useNativeDriver: true,
   easing: Easing.in(Easing.ease),
}

const slideConfig = {
   duration: 500,
   useNativeDriver: true,
   easing: Easing.out(Easing.ease),
}

const s = StyleSheet.create({
   bg: {
      width: Screen.width,
      height: Screen.height,
      backgroundColor: `${colors.stone[800]}${opacity[30]}`,
   },
   container: {
      flex: 1,
      justifyContent: 'flex-end',
   },
   modal: {
      paddingTop: 32,
      paddingBottom: 48,
      paddingHorizontal: 24,
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      backgroundColor: colors.stone[50],
   },
   divider: {
      marginHorizontal: 'auto',
      width: 80,
      height: 4,
      borderRadius: sizes.radius.full,
      backgroundColor: colors.stone[400],
      marginTop: -20,
      marginBottom: 32,
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 32,
   },
   title: {
      fontFamily: fonts.family.bold,
      fontSize: fonts.size.lg,
      color: colors.stone[800],
   },
})
