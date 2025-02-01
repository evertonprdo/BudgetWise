import { StyleSheet } from 'react-native'
import { colors, fonts } from '@/styles'

export const styles = StyleSheet.create({
   title: {
      color: colors.stone[800],
      fontSize: fonts.size.lg,
      fontFamily: fonts.family.semiBold,
   },

   iptWrapper: {
      gap: 16,
   },

   label: {
      color: colors.stone[500],
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.medium,
   },
})
