import * as SQLite from 'expo-sqlite'
import { dbConnection } from './db-connection'

export class TransactionsRepository {
   private constructor(private db: SQLite.SQLiteDatabase) {
      this.db.execAsync(`
         PRAGMA journal_mode = WAL;
         PRAGMA foreign_keys = ON;
         CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY NOT NULL, 
            type INTEGER NOT NULL,
            cents INTEGER NOT NULL,
            date INTEGER NOT NULL
         );
      `)
   }

   get conn() {
      return this.db
   }

   static async create(): Promise<TransactionsRepository> {
      try {
         const db = await dbConnection
         return new TransactionsRepository(db)
      } catch (error) {
         throw error
      }
   }

   async getTables() {
      const allRows = await this.db.getAllAsync(
         "SELECT name FROM sqlite_master WHERE type = 'table'",
      )
      return allRows
   }

   async getAll() {
      try {
         const allRows = await this.db.getAllAsync('SELECT * FROM transactions')
         return allRows
      } catch (error) {
         console.log(error)
      }
   }

   async clear() {
      await this.db.execAsync('DELETE FROM transactions;VACUUM;')
   }

   async insert(props: { type: number; cents: number; date: number }) {
      try {
         await this.db.runAsync(
            'INSERT INTO transactions (type, cents, date) VALUES (?, ?, ?);',
            [props.type, props.cents, props.date],
         )
      } catch (error) {
         console.log(error)
      }
   }

   close() {
      this.db.closeAsync()
   }
}
