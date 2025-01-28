import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Modal } from './modal'
import { Button } from '../button'
import { Calendar } from '@/assets/icons'
import { colors, fonts, sizes } from '@/styles'

import { AppDate } from '@/utils/app-date'

type Props = {
   date?: AppDate | null
   onDateChange?: (date: AppDate) => void
}

export function InputDate({ date, onDateChange }: Props) {
   const [showCalendar, setShowCalendar] = useState(false)

   const openCalendar = () => setShowCalendar(true)
   const closeCalendar = () => setShowCalendar(false)

   return (
      <>
         <Pressable
            onPress={openCalendar}
            style={s.container}
         >
            <Text style={s.ipt}>11 Jan 2025</Text>
            <Calendar />
         </Pressable>

         <Modal
            visible={showCalendar}
            onRequestClose={closeCalendar}
         >
            <View style={s.calendar} />

            <View style={s.btnWrapper}>
               <Button
                  style={s.btn}
                  variant="secondary"
               >
                  Cancel
               </Button>
               <Button style={s.btn}>Confirm</Button>
            </View>
         </Modal>
      </>
   )
}

const s = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',

      paddingHorizontal: 16,
      gap: 8,

      backgroundColor: colors.zinc[100],

      borderWidth: 1,
      borderColor: colors.zinc[300],
      borderRadius: sizes.radius.md,
   },
   ipt: {
      flex: 1,
      height: sizes.height.md,
      textAlignVertical: 'center',

      color: colors.zinc[800],
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.regular,
   },
   calendar: {
      height: 300,
      width: '100%',
      backgroundColor: colors.zinc[300],
      borderRadius: 6,
      marginBottom: 32,
   },
   btnWrapper: { flexDirection: 'row', gap: 8 },
   btn: { flex: 1 },
})
