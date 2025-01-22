import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { DBProvider } from './db-provider'
import { Home } from './home'

export default function App() {
   return (
      <DBProvider>
         <View style={styles.container}>
            <Home />
            <StatusBar style="auto" />
         </View>
      </DBProvider>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f1ebe6',
      alignItems: 'center',
      justifyContent: 'center',
   },
})
