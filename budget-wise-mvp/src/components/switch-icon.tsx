import { StyleSheet, View } from 'react-native'
import ArrowCircle from '../assets/icons/arrow-circle'

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
      // backgroundColor: '#ED5B5B',
      borderRadius: 6,
      backgroundColor: '#50e955',
      // transform: [{ rotate: '180deg' }],
   },
})
