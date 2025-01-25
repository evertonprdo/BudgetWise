import { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { ArrowCircle } from '../../assets/icons'

import { colors } from '../../theme'

export function SwitchIcon() {
   const [isIn, setIsIn] = useState(false)

   const backgroundColor = isIn ? colors.green[500] : colors.red[500]
   const transform = [{ rotate: `${isIn ? 180 : 0}deg` }]

   function onChangeValue() {
      setIsIn((value) => !value)
   }

   return (
      <Pressable
         onPress={onChangeValue}
         style={[s.container, { backgroundColor, transform }]}
      >
         <ArrowCircle color={'#fff'} />
      </Pressable>
   )
}

const s = StyleSheet.create({
   container: {
      alignItems: 'center',
      justifyContent: 'center',
      aspectRatio: '1/1',
      borderRadius: 6,
   },
})
