import { RouterContext } from '@/contexts/router.context'
import { useContext } from 'react'

export function useRouter() {
   const router = useContext(RouterContext)

   if (!router) {
      throw new Error('Missing <RouterProvider/>')
   }

   return router
}
