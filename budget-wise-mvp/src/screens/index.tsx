import { ScrollView, StyleSheet, View } from 'react-native'

import { colors } from '@/styles'
import { Button, Input, InputDate, Select } from '@/components/ui'

import { useNavigate } from '@/contexts/router.context'
import { l10n } from '@/libs/localization'
import { Calendar, Triangle, X } from '@/assets/icons'
import { useState } from 'react'

export function Index() {
   const { navigate } = useNavigate()
   const [selected, setSelected] = useState<string | null>(null)

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
         <View style={styles.container}>
            <Select
               options={options}
               selected={selected}
               onChangeSelected={setSelected}
            />

            <InputDate />

            <Input
               placeholder={`0${l10n.decimalSeparator}00`}
               textAlign="right"
            />

            <View
               style={{ flexDirection: 'row', flex: 1, gap: 8, marginTop: 8 }}
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

const styles = StyleSheet.create({
   container: {
      marginTop: 300,
      flex: 1,
      gap: 16,

      justifyContent: 'center',
      paddingHorizontal: 32,
   },
})
