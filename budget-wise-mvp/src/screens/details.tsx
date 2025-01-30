import { Text, View } from 'react-native'

import { InputCurrency } from '@/components/ui'
import { useNavigate } from '@/contexts/router.context'
import { useState } from 'react'

import { AppMoney } from '@/utils/app-money'

export function Details() {
   const { navigate } = useNavigate()
   const [value, setValue] = useState<AppMoney | null>(null)

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
            onChangeText={setValue}
         />
      </View>
   )
}
