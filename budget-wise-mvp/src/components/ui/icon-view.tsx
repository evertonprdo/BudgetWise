import { IconComponent } from '@/assets/icons'
import { colors } from '@/styles'
import { StyleSheet, View, ViewProps } from 'react-native'

type Props = {
   icon: IconComponent
   color: string
   size?: number
} & ViewProps

export function IconView({ icon: Icon, style, color, size, ...props }: Props) {
   const containerStyle = StyleSheet.flatten([
      s.container,
      style,
      { backgroundColor: color },
   ])

   return (
      <View
         style={containerStyle}
         {...props}
      >
         <Icon
            size={size ?? 14}
            color={colors.stone[100]}
         />
      </View>
   )
}

const s = StyleSheet.create({
   container: {
      padding: 6,
      overflow: 'hidden',
      borderRadius: '50%',
   },
})
