import { StyleSheet, View } from 'react-native'
import ArrowCircle from '../assets/icons/arrow-circle'
import { colors } from '../theme'

export function SwitchIcon() {
   return (
      <View style={s.container}>
         <ArrowCircle color={'#fff'} />
      </View>
   )
}

const s = StyleSheet.create({
   container: {
      alignItems: 'center',
      justifyContent: 'center',
      aspectRatio: '1/1',
      backgroundColor: colors.red[500],
      borderRadius: 6,
      // backgroundColor: colors.lime[500],
      transform: [{ rotate: '180deg' }],
   },
})
