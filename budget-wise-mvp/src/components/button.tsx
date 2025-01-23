import { Pressable, StyleSheet, Text } from 'react-native'

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
      backgroundColor: '#4A904C',
   },

   text: {
      flex: 1,
      textAlign: 'center',
      color: '#fff',
      fontSize: 16,
      textTransform: 'uppercase',
      fontWeight: 700,
      letterSpacing: 0.3,
   },
})
