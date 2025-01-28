import { ScrollView, StyleSheet, View } from 'react-native'

import { colors } from '@/styles'
import { Button, Input } from '@/components/ui'

export function Index() {
   return (
      <ScrollView style={{ height: 500, backgroundColor: colors.zinc[200] }}>
         <View style={styles.container}>
            <Input placeholder="placeholder" />
            <View
               style={{ flexDirection: 'row', flex: 1, gap: 8, marginTop: 8 }}
            >
               <Button
                  style={{ flex: 1 }}
                  variant="secondary"
               >
                  Title
               </Button>
               <Button style={{ flex: 1 }}>Title</Button>
            </View>
         </View>
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   container: {
      marginTop: 300,
      flex: 1,

      justifyContent: 'center',
      paddingHorizontal: 32,
   },
})
