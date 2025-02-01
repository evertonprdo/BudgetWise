import SQLite from 'expo-sqlite'

export const dbConnection = SQLite.openDatabaseAsync('budgetWise')

export class DBConnection {
   private constructor(private db: SQLite.SQLiteDatabase) {}
}
