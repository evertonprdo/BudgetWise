import { useContext } from 'react'
import { formRegisterContext } from './form-register'

export function useFormRegister() {
   const hook = useContext(formRegisterContext)

   if (hook === null) {
      throw new Error('Wrap with <FormRegisterProvider/>')
   }

   return hook
}
