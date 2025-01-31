import { useEffect, useState } from 'react'
import {
   View,
   Animated,
   ScrollView,
   StyleSheet,
   useAnimatedValue,
   ViewStyle,
} from 'react-native'

import { colors, sizes } from '@/styles'
import { Option } from './option'
import { FocusableBox } from '../focusable-box'
import { IconComponent, Triangle } from '@/assets/icons'

export type OptionProps = {
   name: string
   displayName?: string
   icon?: IconComponent
   color?: string
}

type Props = {
   options: OptionProps[]
   selected: string | null
   onChangeSelected: (selected: string) => void
   style?: ViewStyle
}

export function Select({ options, selected, onChangeSelected, style }: Props) {
   const [showOptions, setShowOptions] = useState(false)
   const [optsDisplay, setOptDisplay] = useState<'flex' | 'none'>('none')

   const currentOption = options.find((item) => item.name === selected)

   const handleChangingOptsVisibility = () => setShowOptions((state) => !state)

   function handleOnPressOption(name: string) {
      setShowOptions(false)
      onChangeSelected && onChangeSelected(name)
   }

   const slideAnim = useAnimatedValue(0)

   useEffect(() => {
      const slide = Animated.timing(slideAnim, {
         toValue: showOptions ? 1 : 0,
         useNativeDriver: true,
         duration: 300,
      })

      if (showOptions) {
         setOptDisplay('flex')
         slide.start()
      } else {
         slide.start(() => setOptDisplay('none'))
      }
   }, [showOptions])

   const containerStyle = StyleSheet.compose(s.container, style)

   const btnIconStyle = StyleSheet.flatten([
      { transform: [{ rotate: showOptions ? '180deg' : '0deg' }] },
   ])

   const optContainerStyle = StyleSheet.flatten([
      s.optionsContainer,
      {
         transform: [{ scaleY: slideAnim }],
         transformOrigin: 'top',
         display: optsDisplay,
      },
   ])

   return (
      <View>
         <FocusableBox
            onPress={handleChangingOptsVisibility}
            focused={showOptions}
            style={containerStyle}
         >
            <Option
               name={currentOption?.name ?? 'none'}
               icon={currentOption?.icon}
               color={currentOption?.color}
               selected={selected}
               disabled
            >
               {currentOption?.displayName ?? 'Select'}
            </Option>
            <Triangle
               size={12}
               color={colors.stone[500]}
               style={btnIconStyle}
            />
         </FocusableBox>

         <Animated.View style={optContainerStyle}>
            <ScrollView
               nestedScrollEnabled
               contentContainerStyle={s.list}
               showsVerticalScrollIndicator={false}
            >
               {options.map(({ color, icon, name, displayName }) => (
                  <Option
                     key={name}
                     name={name}
                     icon={icon}
                     color={color}
                     selected={selected}
                     onPressOption={handleOnPressOption}
                  >
                     {displayName ?? name}
                  </Option>
               ))}
            </ScrollView>
         </Animated.View>
      </View>
   )
}

const s = StyleSheet.create({
   container: {
      justifyContent: 'space-between',
   },
   optionsContainer: {
      position: 'absolute',
      top: sizes.height.md + 4,
      left: 0,
      right: 0,
      maxHeight: 300,

      padding: 4,

      backgroundColor: colors.emerald[50],
      borderRadius: sizes.radius.md,
      zIndex: 20,
      elevation: 3,
   },
   list: {
      gap: 4,
   },
})
