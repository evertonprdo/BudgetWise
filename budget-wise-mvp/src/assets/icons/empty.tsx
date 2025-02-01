import * as React from 'react'
import Svg from 'react-native-svg'
import { IconsProps } from './types'

const Empty = ({ size, color, ...props }: IconsProps) => (
   <Svg
      width={size ?? 32}
      height={size ?? 32}
      viewBox="0 0 24 24"
      fill={color ?? '#000'}
      {...props}
   ></Svg>
)
export default Empty
