import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconsProps } from './types'

const Switch = ({ size, color, ...props }: IconsProps) => (
   <Svg
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? '#000'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
   >
      <Path
         d="M0 0h24v24H0z"
         stroke="none"
      />
      <Path d="M15 4h4v4m-4.25 1.25L19 4M5 19l4-4m6 4h4v-4M5 5l14 14" />
   </Svg>
)
export default Switch
