import {
   Text,
   View,
   StyleSheet,
   ModalProps,
   Modal as RNModal,
} from 'react-native'

import { X } from '@/assets/icons'
import { colors, fonts, opacity } from '@/theme'

type Props = { title?: string; onClose: () => void } & ModalProps

export function Modal({ title, onClose, children, ...props }: Props) {
   return (
      <RNModal
         transparent
         statusBarTranslucent
         {...props}
      >
         <View style={s.bg}>
            <View style={s.container}>
               <View style={s.header}>
                  <Text style={s.text}>{title}</Text>
                  <X
                     color={colors.zinc[800]}
                     onPress={onClose}
                  />
               </View>
               {children}
            </View>
         </View>
      </RNModal>
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
