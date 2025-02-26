import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconsProps } from './types'

const Triangle = ({ size, color, ...props }: IconsProps) => (
   <Svg
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill={color ?? '#000'}
      {...props}
   >
      <Path
         d="M0 0h24v24H0z"
         fill="none"
      />
      <Path d="M12 1.67a2.91 2.91 0 0 0-2.492 1.403L1.398 16.61a2.914 2.914 0 0 0 2.484 4.385h16.225a2.914 2.914 0 0 0 2.503-4.371L14.494 3.078A2.92 2.92 0 0 0 12 1.67" />
   </Svg>
)
export default Triangle
