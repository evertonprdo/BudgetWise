import { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { l10n } from '../libs/localization'

import { colors, fonts } from '../theme'
import { ArrowCircle, Calendar, CarrotUp } from '../assets/icons'
import { Button, Input, SwitchIcon, Select, TextArea } from '../components/ui'

export default function App() {
   const [selected, setSelected] = useState<string | null>(null)

   return (
      <SafeAreaView style={s.container}>
         <ScrollView style={s.scroll}>
            <View style={s.form}>
               <Text style={s.sctText}>Add new transaction</Text>
               <View style={s.iptLineWrapper}>
                  <Select
                     selected={selected}
                     onChangeSelected={setSelected}
                  >
                     <Select.Option
                        name="text"
                        icon={CarrotUp}
                        color="#db23a4"
                     >
                        Text
                     </Select.Option>
                     <Select.Option
                        name="another"
                        icon={ArrowCircle}
                        color="#2492c5"
                     >
                        Another
                     </Select.Option>
                  </Select>
               </View>

               <View style={s.iptLineWrapper}>
                  <TextArea />
               </View>

               <View style={s.iptLineWrapper}>
                  <Input placeholder="Date" />
                  <View
                     style={{
                        alignItems: 'center',
                        backgroundColor: colors.zinc[100],
                        justifyContent: 'center',
                        aspectRatio: '1/1',
                        borderRadius: 6,
                     }}
                  >
                     <Calendar />
                  </View>
               </View>

               <View style={s.iptLineWrapper}>
                  <SwitchIcon />
                  <Input
                     placeholder={`0${l10n.decimalSeparator}00`}
                     keyboardType="numeric"
                     textAlign="right"
                     left={() => (
                        <View>
                           <Text style={s.currencySymbol}>
                              {l10n.currencySymbol}
                           </Text>
                        </View>
                     )}
                  />
               </View>
            </View>

            <View style={s.iptLineWrapper}>
               <Button
                  variant="secondary"
                  style={s.btn}
               >
                  Cancelar
               </Button>
               <Button
                  variant="primary"
                  style={s.btn}
               >
                  Cadastrar
               </Button>
            </View>
         </ScrollView>
      </SafeAreaView>
   )
}

const s = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.zinc[200],
   },
   scroll: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 48,
   },
   form: {
      flex: 1,
      gap: 16,
      marginBottom: 16,
   },
   sctWrapper: {
      gap: 8,
   },
   sctText: {
      fontFamily: fonts.family.semiBold,
      fontSize: fonts.size.lg,
      color: colors.zinc[800],
   },
   iptLineWrapper: {
      flexDirection: 'row',
      gap: 8,
   },
   currencySymbol: {
      fontFamily: fonts.family.semiBold,
      color: colors.zinc[700],
      fontSize: fonts.size.md,
      lineHeight: 18,
   },
   btn: { flex: 1, height: 50 },
})
