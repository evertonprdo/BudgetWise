import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconsProps } from './types'
const ArrowSort = ({ size, color, ...props }: IconsProps) => (
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
      <Path d="m3 9 4-4 4 4M7 5v14m14-4-4 4-4-4m4 4V5" />
   </Svg>
)
export default ArrowSort
