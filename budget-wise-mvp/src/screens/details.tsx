import { Text, View } from 'react-native'

import { InputDate } from '@/components/ui'
import { useNavigate } from '@/contexts/router.context'

export function Details() {
   const { navigate } = useNavigate()

   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text onPress={() => navigate('back')}>Details</Text>

         <InputDate />
      </View>
   )
}
