import { Text, View } from 'react-native'

import { InputDate } from '@/components/ui'
import { useNavigate } from '@/contexts/router.context'
import { useState } from 'react'
import { AppDate } from '@/utils/app-date'

export function Details() {
   const { navigate } = useNavigate()
   const [selectedDate, setSelectedDate] = useState<AppDate | null>(null)

   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text onPress={() => navigate('back')}>Details</Text>

         <InputDate
            appDate={selectedDate}
            onDateChange={setSelectedDate}
         />
      </View>
   )
}
