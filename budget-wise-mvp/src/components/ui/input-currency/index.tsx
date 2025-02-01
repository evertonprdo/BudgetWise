import { useState } from 'react'
import {
   Text,
   StyleSheet,
   ViewStyle,
   Modal,
   Pressable,
   StyleProp,
} from 'react-native'

import { colors, fonts } from '@/styles'
import { NumericKeyboard } from './numeric-keyboard'

import { l10n } from '@/libs/localization'
import { formatCurrency } from '@/utils/format'

type Props = {
   cents?: number | null
   onChangeNumber: (value: number) => void
   style?: StyleProp<ViewStyle>
}

export function InputCurrency({ cents: value, onChangeNumber, style }: Props) {
   const [digits, setDigits] = useState<string[]>(
      value ? String(value).split('') : [],
   )
   const [showModal, setShowModal] = useState(false)

   const openModal = () => setShowModal(true)
   const closeModal = () => setShowModal(false)

   function handleOnKeyPress(key: string) {
      if (key === 'confirm') return closeModal()

      let newDigits: string[]
      if (key === 'backspace') {
         newDigits = digits.slice(0, digits.length - 1)
      } else {
         newDigits = [...digits, key]
      }

      if (newDigits.length > 10 || (digits.length === 0 && key === '0')) return

      setDigits(newDigits)
      onChangeNumber(Number(newDigits.join('')))
   }

   const containerStyle = StyleSheet.compose(s.container, style)
   const [integers, cents] = formatCurrency(digits.join(''))

   return (
      <>
         <Pressable
            onPress={openModal}
            style={containerStyle}
         >
            <Text style={smallDigitsStyle}>{l10n.currencySymbol}</Text>
            <Text style={integersStyle}>{integers}</Text>
            <Text style={smallDigitsStyle}>{cents}</Text>
         </Pressable>

         <Modal
            visible={showModal}
            onRequestClose={closeModal}
            animationType="slide"
            transparent
         >
            <Pressable
               onPress={closeModal}
               style={s.closeArea}
            />
            <NumericKeyboard
               onKeyPress={handleOnKeyPress}
               style={s.modalContent}
            />
         </Modal>
      </>
   )
}

const s = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 16,
      gap: 2,
   },

   text: {
      color: colors.stone[800],
      fontFamily: fonts.family.medium,
   },

   closeArea: {
      flex: 1,
   },

   modalContent: {
      borderTopWidth: 1,
      borderColor: colors.stone[300],
      backgroundColor: colors.stone[100],
      paddingHorizontal: 8,
      paddingBottom: 16,
      paddingTop: 8,
   },
})

const smallDigitsStyle = StyleSheet.compose(s.text, {
   fontSize: fonts.size.xl,
})
const integersStyle = StyleSheet.compose(s.text, {
   fontSize: fonts.size['4xl'],
   lineHeight: fonts.size['4xl'] + 4,
})
