import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconsProps } from './type'

const X = ({ size, color, ...props }: IconsProps) => (
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
      <Path d="M18 6 6 18M6 6l12 12" />
   </Svg>
)
export default X
