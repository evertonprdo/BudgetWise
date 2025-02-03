import { Alert, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '@/styles'
import { RegisterForm } from './form'
import { RegisterHeader } from './header'

import { useRouter } from '@/hooks/useRouter'
import { FormRegisterProvider } from './form-context/form-register'

export function Register() {
   const { navigate } = useRouter()

   function handleOnRequestCancel() {
      Alert.alert(
         'Canceling Registration',
         'Are you sure you want to cancel your registration? Your progress will be lost.',
         [
            { text: 'Back', style: 'cancel' },
            { text: 'Confirm', onPress: () => navigate('back') },
         ],
      )
   }

   return (
      <FormRegisterProvider
         onSubmit={() => navigate('back')}
         onRequestCancel={handleOnRequestCancel}
      >
         <SafeAreaView style={s.root}>
            <RegisterHeader onRequestCancel={handleOnRequestCancel} />

            <RegisterForm />
         </SafeAreaView>
      </FormRegisterProvider>
   )
}

const s = StyleSheet.create({
   root: {
      flex: 1,
      backgroundColor: colors.stone[200],
   },
})
