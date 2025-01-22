import { useEffect, useState } from 'react'
import { Button, Switch, Text, TextInput, View } from 'react-native'

import { useDB } from './db-provider'
import { AppDate } from './utils/app-date'
import { AppMoney } from './utils/app-money'

type Transactions = {
   id: number
   type: number
   cents: number
   date: number
}[]

export function Home() {
   const [text, setText] = useState<Transactions>([])
   const db = useDB()

   const [type, setType] = useState(false)
   const [value, setValue] = useState(0)
   const [date, setDate] = useState('')

   async function getTest() {
      const data = (await db.getAll()) as Transactions
      setText(data)
   }

   async function clearTable() {
      await db.clear()
      getTest()
   }

   async function insert() {
      const d = AppDate.createFromYearMonthDayString(date).unix
      await db.insert({
         type: type ? 0 : 1,
         cents: AppMoney.create(value).cents,
         date: d,
      })
      getTest()
   }

   useEffect(() => {
      getTest()
   }, [])

   return (
      <View style={{ gap: 16, width: '100%', paddingInline: 16 }}>
         <View>
            <View
               style={{
                  flexDirection: 'row',
                  gap: 16,
                  justifyContent: 'space-between',
               }}
            >
               <Text>id</Text>
               <Text>type</Text>
               <Text>value</Text>
               <Text>date</Text>
            </View>
            {text.map((row) => (
               <View
                  key={row.id}
                  style={{
                     flexDirection: 'row',
                     gap: 16,
                     justifyContent: 'space-between',
                  }}
               >
                  <Text>{row.id}</Text>
                  <Text>{row.type === 1 ? 'IN' : 'OUT'}</Text>
                  <Text>
                     {AppMoney.createFromCents(row.cents).toCurrency()}
                  </Text>
                  <Text>
                     {AppDate.createFromUnixTimestamp(row.date).toShortDate()}
                  </Text>
               </View>
            ))}
         </View>

         <View style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', gap: 16 }}>
               <Text>Type: In/Out</Text>
               <Switch
                  value={type}
                  onValueChange={setType}
               />
            </View>
            <Text>Value:</Text>
            <TextInput
               value={value.toFixed(2)}
               onChangeText={(txt) => {
                  setValue(Number(txt.replace(/\D/g, '')) / 100)
               }}
               style={{ backgroundColor: '#ffffff' }}
               keyboardType="numeric"
               placeholder="0.00"
            />
            <Text>Date:</Text>
            <TextInput
               value={date}
               onChangeText={(txt) => {
                  setDate(txt.replace(/[^0-9\-]/g, ''))
               }}
               style={{ backgroundColor: '#ffffff' }}
               keyboardType="numeric"
               placeholder="YYYY-MM-DD"
            />
         </View>

         <Button
            title="Insert"
            onPress={insert}
         />
         <Button
            title="Clear Table"
            onPress={clearTable}
         />
      </View>
   )
}
