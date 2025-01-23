import { StyleSheet, View } from 'react-native'
import { Button } from '../components/button'
import { SwitchIcon } from '../components/switch-icon'
import { Select } from '../components/select'

export default function App() {
   return (
      <View style={s.container}>
         <View style={s.iptLineWrapper}>
            <SwitchIcon />
            <Select />
         </View>
         <Button>Cadastrar</Button>
      </View>
   )
}

const s = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fafafa',
      justifyContent: 'center',
      paddingInline: 16,
      gap: 16,
   },
   iptLineWrapper: {
      flexDirection: 'row',
      gap: 8,
   },
})
