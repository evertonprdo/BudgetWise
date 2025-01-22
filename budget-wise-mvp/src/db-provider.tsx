import {
   createContext,
   PropsWithChildren,
   useContext,
   useEffect,
   useState,
} from 'react'
import { TransactionsRepository } from './repositories/transactions.repository'

const DbContext = createContext<TransactionsRepository | null>(null)

export function DBProvider({ children }: PropsWithChildren) {
   const [db, setDb] = useState<TransactionsRepository | null>(null)
   const [isConnected, setIsConnected] = useState(false)

   useEffect(() => {
      TransactionsRepository.create().then((conn) => {
         setDb(conn)
         setIsConnected(true)
      })

      return db?.close()
   }, [])

   return (
      <DbContext.Provider value={db}>
         {isConnected && children}
      </DbContext.Provider>
   )
}

export function useDB() {
   const db = useContext(DbContext)

   if (db === null) {
      throw new Error('Missing DBProvider')
   }

   return db
}
