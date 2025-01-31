import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '@/styles'
import { Button } from '@/components/ui'

import { RegisterHeader } from './header'
import { StepValue } from './multi-form/step-value'
import { StepDetails } from './multi-form/step-details'
import { FormRegisterProvider } from './form.context'

export function Register() {
   const [step, setStep] = useState(0)

   function handleNext() {
      setStep(step + 1)
   }
   function handleBack() {
      setStep(step - 1)
   }

   return (
      <FormRegisterProvider>
         <SafeAreaView style={s.root}>
            <RegisterHeader currentStep={step} />

            <View style={s.form}>
               {[<StepValue />, <StepDetails />][step]}

               <View style={s.options}>
                  <Button
                     onPress={handleBack}
                     style={s.flex}
                     variant="secondary"
                  >
                     Back
                  </Button>
                  <Button
                     onPress={handleNext}
                     style={s.flex}
                     variant="black"
                  >
                     Next
                  </Button>
               </View>
            </View>
         </SafeAreaView>
      </FormRegisterProvider>
   )
}

const s = StyleSheet.create({
   root: {
      flex: 1,
      backgroundColor: colors.stone[200],
   },

   form: {
      flex: 1,
      gap: 16,
      padding: 24,

      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      backgroundColor: colors.stone[50],
      elevation: 7,
   },

   options: {
      gap: 8,
      flexDirection: 'row',
      marginTop: 'auto',
   },

   flex: {
      flex: 1,
   },
})
