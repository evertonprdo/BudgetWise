import * as SQLite from 'expo-sqlite'

export class Transactions {
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

   static async create(): Promise<Transactions> {
      const db = await SQLite.openDatabaseAsync('budgetWise')
      return new Transactions(db)
   }

   async getTables() {
      const allRows = await this.db.getAllAsync(
         "SELECT name FROM sqlite_master WHERE type = 'table'",
      )
      return allRows
   }

   async getAll() {
      const allRows = await this.db.getAllAsync('SELECT * FROM transactions')
      return allRows
   }

   async clear() {
      await this.db.execAsync('DELETE FROM transactions;VACUUM;')
   }

   async insert(props: { type: number; cents: number; date: number }) {
      await this.db.runAsync(
         'INSERT INTO transactions (type, cents, date) VALUES (?, ?, ?);',
         [props.type, props.cents, props.date],
      )
   }

   close() {
      this.db.closeAsync()
   }
}
