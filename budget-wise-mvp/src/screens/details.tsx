import { useState } from 'react'
import { Text, View } from 'react-native'

import { InputCurrency } from '@/components/ui'
import { useNavigate } from '@/contexts/router.context'

export function Details() {
   const { navigate } = useNavigate()
   const [value, setValue] = useState<number | null>(null)

   return (
      <View
         style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 32,
         }}
      >
         <Text onPress={() => navigate('back')}>Details</Text>

         <InputCurrency
            value={value}
            onChangeNumber={setValue}
         />
      </View>
   )
}
