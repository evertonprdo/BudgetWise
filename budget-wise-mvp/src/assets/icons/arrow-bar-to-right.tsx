import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconsProps } from './types'

const ArrowBarToRight = ({ size, color, ...props }: IconsProps) => (
   <Svg
      width={size ?? 32}
      height={size ?? 32}
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
      <Path d="M14 12H4m10 0-4 4m4-4-4-4m10-4v16" />
   </Svg>
)

export default ArrowBarToRight
