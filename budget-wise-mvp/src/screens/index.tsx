import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { colors } from '@/styles'
import { Calendar, Triangle, X } from '@/assets/icons'
import {
   Button,
   InputArea,
   InputCurrency,
   InputDate,
   Select,
} from '@/components/ui'

import { useNavigate } from '@/contexts/router.context'
import { InOutButton } from '@/components/in-out-button'

export function Index() {
   const { navigate } = useNavigate()

   const [selected, setSelected] = useState<string | null>(null)
   const [curr, setCurr] = useState<number | null>(null)
   const [status, setStatus] = useState(false)

   const options = [
      {
         name: 'category',
         innerName: 'Category',
         color: colors.green[500],
         icon: Triangle,
      },
      {
         name: 'other-category',
         innerName: 'Other Category',
         color: colors.emerald[500],
         icon: Calendar,
      },
      {
         name: 'another-category',
         innerName: 'Another Category',
         color: colors.red[500],
         icon: X,
      },
   ]

   return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.zinc[200] }}>
         <View style={s.container}>
            <Select
               options={options}
               selected={selected}
               onChangeSelected={setSelected}
            />

            <InputArea />

            <InputDate />

            <View style={{ flexDirection: 'row', gap: 8 }}>
               <InOutButton
                  isIn={status}
                  onValueChange={setStatus}
               />
               <InputCurrency
                  value={curr}
                  onChangeNumber={setCurr}
                  style={s.flex}
               />
            </View>

            <View
               style={{
                  flexDirection: 'row',
                  flex: 1,
                  gap: 8,
                  marginTop: 8,
               }}
            >
               <Button
                  style={{ flex: 1 }}
                  variant="secondary"
               >
                  Cancel
               </Button>
               <Button
                  style={{ flex: 1 }}
                  onPress={() => navigate('details')}
               >
                  Confirm
               </Button>
            </View>
         </View>
      </ScrollView>
   )
}

const s = StyleSheet.create({
   container: {
      marginTop: 200,
      flex: 1,
      gap: 16,

      justifyContent: 'center',
      padding: 32,
   },
   flex: {
      flex: 1,
   },
})
