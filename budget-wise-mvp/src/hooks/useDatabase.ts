import { useContext } from 'react'
import { DatabaseContext } from '@/contexts/database-context'

export function useDatabase() {
   const db = useContext(DatabaseContext)

   if (db === null) {
      throw new Error('Missing <DatabaseProvider />')
   }

   return db
}
