import {
   Children,
   createContext,
   isValidElement,
   useContext,
   useEffect,
   useState,
} from 'react'
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'

import { colors, fonts } from '../../theme'
import { CarrotUp, IconComponent } from '../../assets/icons'

type SelectContextProps = {
   selected: string | null
   onChangeSelected: (name: string | null) => void
   showOptions: boolean
}

type OptionChildProps = {
   [key: string]: {
      node: React.ReactNode
      icon: IconComponent
      color: string
   }
}

type SelectProps = PressableProps & {
   selected: string | null
   onChangeSelected: (name: null | string) => void
   children: React.ReactNode
}

const SelectContext = createContext({} as SelectContextProps)

const icon = { size: 16, color: colors.zinc[600] }
const optionItemHeight = 32

function Select({ selected, onChangeSelected, children }: SelectProps) {
   const [childrenOptions, setChildrenOptions] = useState<OptionChildProps>({})

   const [showOptions, setShowOptions] = useState(false)
   const [rotateX, setRotateX] = useState(0)

   const optionsHeight =
      Object.values(childrenOptions).length * (optionItemHeight + 12)

   const animatedStyle = {
      borderColor: showOptions ? colors.zinc[500] : 'transparent',
   }

   const animIconStyle = { transform: [{ rotateX: `${rotateX}deg` }] }
   const animOptionsContainer = { height: showOptions ? optionsHeight : 0 }

   const Icon = selected ? childrenOptions[selected].icon : undefined

   function handleOnChangeShowOptions(val: boolean) {
      setShowOptions(val)
      setRotateX(val ? 180 : 0)
   }

   useEffect(() => {
      const childrenMap = {} as OptionChildProps

      Children.map<void, React.ReactNode>(children, (child) => {
         if (isValidElement(child)) {
            const name = child.props['name']
            const icon = child.props['icon']
            const color = child.props['color']
            const optionChildren = child.props['children']

            childrenMap[name] = {
               node: optionChildren,
               icon,
               color,
            }
         }
      })

      setChildrenOptions(childrenMap)
   }, [])

   useEffect(() => {
      handleOnChangeShowOptions(false)
   }, [selected])

   return (
      <SelectContext.Provider
         value={{ selected, onChangeSelected, showOptions }}
      >
         <Pressable
            style={[styles.selectContainer, animatedStyle]}
            onPress={() => handleOnChangeShowOptions(!showOptions)}
            hitSlop={8}
         >
            {Icon && (
               <View
                  style={[
                     styles.iconOption,
                     { backgroundColor: childrenOptions[selected!].color },
                  ]}
               >
                  <Icon
                     size={14}
                     color={colors.zinc[100]}
                  />
               </View>
            )}
            <Text style={styles.text}>
               {selected ? childrenOptions[selected].node : 'Selecione'}
            </Text>

            <View style={animIconStyle}>
               <CarrotUp
                  size={icon.size}
                  color={icon.color}
               />
            </View>

            <View style={[styles.optionsContainer, animOptionsContainer]}>
               {children}
            </View>
         </Pressable>
      </SelectContext.Provider>
   )
}

type OptionProps = {
   name: string
   children: React.ReactNode
   icon: IconComponent
   color: string
}

function Option({ name, children, color, icon: Icon }: OptionProps) {
   const { selected, onChangeSelected, showOptions } = useContext(SelectContext)

   const [isPressedIn, setIsPressedIn] = useState(false)

   const fontFamily =
      selected === name ? fonts.family.bold : fonts.family.regular

   const animStyle = {
      opacity: showOptions ? 1 : 0,
      backgroundColor: isPressedIn ? colors.zinc[300] : 'transparent',
   }

   return (
      <Pressable
         style={[styles.itemOption, animStyle]}
         onPress={() => onChangeSelected(name)}
         onPressIn={() => setIsPressedIn(true)}
         onPressOut={() => setIsPressedIn(false)}
         hitSlop={8}
      >
         <View style={[styles.iconOption, { backgroundColor: color }]}>
            <Icon
               size={14}
               color={colors.zinc[100]}
            />
         </View>
         <Text style={[styles.text, { fontFamily }]}>{children}</Text>
      </Pressable>
   )
}

Select.Option = Option
export { Select }

const styles = StyleSheet.create({
   selectContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      flex: 1,
      gap: 12,
      paddingInline: 16,
      paddingBlock: 12,
      backgroundColor: colors.zinc[100],

      borderRadius: 6,
      borderWidth: 1,

      zIndex: 10,
   },

   text: {
      flex: 1,
      pointerEvents: 'none',
      fontFamily: fonts.family.regular,
      fontSize: fonts.size.sm,
      color: colors.zinc[800],
      verticalAlign: 'middle',
   },

   optionsContainer: {
      position: 'absolute',
      justifyContent: 'space-evenly',
      overflow: 'hidden',

      paddingHorizontal: 6,
      borderRadius: 6,

      top: 47,
      right: 0,
      left: 0,

      backgroundColor: colors.zinc[100],

      elevation: 3,

      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      shadowOpacity: 0.1,
   },

   itemOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      height: optionItemHeight,
      borderRadius: 6,
      paddingHorizontal: 6,
   },

   iconOption: {
      borderRadius: 9999,
      padding: 4,
   },
})
