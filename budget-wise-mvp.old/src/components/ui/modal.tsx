import { Text, View, StyleSheet, ModalProps } from 'react-native'
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated'

import { X } from '@/assets/icons'
import { colors, fonts, opacity } from '@/theme'

type Props = {
   title?: string
   onClose: () => void
} & ModalProps

const DURATION = 300

export function Modal({ title, onClose, children }: Props) {
   return (
      <Animated.View
         entering={FadeIn.duration(DURATION)}
         style={s.bg}
      >
         <Animated.View
            entering={SlideInDown.delay(DURATION >> 1).duration(DURATION)}
            style={s.container}
         >
            <View style={s.header}>
               <Text style={s.text}>{title}</Text>
               <X
                  color={colors.zinc[800]}
                  onPress={onClose}
               />
            </View>
            {children}
         </Animated.View>
      </Animated.View>
   )
}

const s = StyleSheet.create({
   bg: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: `${colors.zinc[800]}${opacity[30]}`,
   },
   container: {
      paddingBlock: 32,
      paddingInline: 24,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: colors.zinc[200],
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
   },
   text: {
      color: colors.zinc[800],
      fontSize: fonts.size.lg,
      fontFamily: fonts.family.bold,
   },
})
