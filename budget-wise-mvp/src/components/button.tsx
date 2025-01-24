import { Pressable, StyleSheet, Text } from 'react-native'
import { colors, fonts } from '../theme'

type Props = {
   children?: React.ReactNode
}

export function Button({ children }: Props) {
   return (
      <Pressable style={s.container}>
         <Text style={s.text}>{children}</Text>
      </Pressable>
   )
}

const s = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingInline: 24,
      paddingBlock: 16,
      gap: 8,
      borderRadius: 8,
      backgroundColor: colors.green[700],
   },

   text: {
      fontFamily: fonts.family.bold,
      flex: 1,
      textAlign: 'center',
      color: colors.zinc[100],
      fontSize: 16,
      textTransform: 'uppercase',
      letterSpacing: 0.3,
   },
})
