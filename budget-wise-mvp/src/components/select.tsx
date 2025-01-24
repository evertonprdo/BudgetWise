import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../theme'

export function Select() {
   return (
      <View style={s.container}>
         <View style={s.icon} />
         <View style={s.select}>
            <Text style={s.text}>Categoria</Text>
            <View style={s.icon} />
         </View>
      </View>
   )
}

const s = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 6,
      borderColor: colors.zinc[300],
      borderWidth: 1,
      backgroundColor: colors.zinc[50],
   },
   icon: {
      backgroundColor: 'purple',
      borderRadius: 9999,
      alignItems: 'center',
      justifyContent: 'center',
      aspectRatio: '1/1',
   },
   select: {
      flexDirection: 'row',
      gap: 12,
   },
   text: {
      fontFamily: fonts.family.regular,
      fontSize: 16,
   },
})
