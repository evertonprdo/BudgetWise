import { ScrollView, StyleSheet, View } from 'react-native'

import { colors } from '@/styles'
import { Button } from '@/components/ui'

import { useFormRegister } from '../form-context/use-form-register'

export function RegisterForm() {
   const { currentStep, FormSteps, stepLeft, stepRight } = useFormRegister()

   const FormStep = FormSteps[currentStep]

   const btnLeftText = ['Cancel', 'Back'][currentStep]
   const btnRightText = ['Next', 'Confirm'][currentStep]

   return (
      <ScrollView
         style={s.scrollView}
         contentContainerStyle={s.form}
      >
         <View style={s.container}>
            <FormStep />
         </View>

         <View style={s.options}>
            <Button
               onPress={stepLeft}
               style={s.flex}
               variant="secondary"
            >
               {btnLeftText}
            </Button>
            <Button
               onPress={stepRight}
               style={s.flex}
               variant="black"
            >
               {btnRightText}
            </Button>
         </View>
      </ScrollView>
   )
}

const s = StyleSheet.create({
   scrollView: {
      flex: 1,
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      backgroundColor: colors.stone[50],
      elevation: 7,
      shadowColor: colors.stone[800],
   },

   form: {
      flexGrow: 1,
      justifyContent: 'space-between',
      gap: 16,
      padding: 24,
   },

   options: {
      flexDirection: 'row',
      gap: 8,
   },

   flex: {
      flex: 1,
   },

   container: {
      gap: 32,
   },
})
