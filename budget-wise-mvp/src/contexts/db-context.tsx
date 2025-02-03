import {
   useState,
   useEffect,
   useContext,
   createContext,
   PropsWithChildren,
} from 'react'

import { Database } from '@/libs/sqlite/database'

import { CategoriesRepository } from '@/domain/transactions/repositories/categories.repository'
import { TransactionsRepository } from '@/domain/transactions/repositories/transactions.repository'
import { SQLiteCategoriesRepository } from '@/libs/sqlite/repositories/categories.repository'
import { SQLiteTransactionsRepository } from '@/libs/sqlite/repositories/transactions.repository'

type Repositories = {
   transactions: TransactionsRepository
   categories: CategoriesRepository
}

type ContextProps = {
   repositories: Repositories
}

const DbContext = createContext<ContextProps | null>(null)

export function DBProvider({ children }: PropsWithChildren) {
   const [repositories, setRepositories] = useState<Repositories | null>(null)

   async function initRepositories(db: Database) {
      await db.createTablesIfNotExist()

      const transactionsRepository = new SQLiteTransactionsRepository(db)
      const categoriesRepository = new SQLiteCategoriesRepository(db)

      setRepositories({
         transactions: transactionsRepository,
         categories: categoriesRepository,
      })
   }

   useEffect(() => {
      let db: Database

      const initDatabase = async () => {
         try {
            db = await Database.create()
            await initRepositories(db)
         } catch (error) {
            throw error
         }
      }
      initDatabase()

      return () => db?.close()
   }, [])

   if (!repositories) {
      return null
   }

   return (
      <DbContext.Provider value={{ repositories }}>
         {children}
      </DbContext.Provider>
   )
}

export function useDB() {
   const db = useContext(DbContext)

   if (db === null) {
      throw new Error('Missing <DBProvider />')
   }

   return db
}
