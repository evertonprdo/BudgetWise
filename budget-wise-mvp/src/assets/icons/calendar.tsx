import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconsProps } from './types'

const Calendar = ({ size, color, ...props }: IconsProps) => (
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
      <Path d="M16 2c.183 0 .355.05.502.135l.033.02c.28.177.465.49.465.845v1h1a3 3 0 0 1 2.995 2.824L21 7v12a3 3 0 0 1-2.824 2.995L18 22H6a3 3 0 0 1-2.995-2.824L3 19V7a3 3 0 0 1 2.824-2.995L6 4h1V3a1 1 0 0 1 .514-.874l.093-.046.066-.025.1-.029.107-.019L8 2q.083 0 .161.013l.122.029.04.012.06.023c.328.135.568.44.61.806L9 3v1h6V3a1 1 0 0 1 1-1m3 7H5v9.625c0 .705.386 1.286.883 1.366L6 20h12c.513 0 .936-.53.993-1.215l.007-.16z" />
      <Path d="M9.015 13a1 1 0 0 1-1 1 1.001 1.001 0 1 1-.005-2c.557 0 1.005.448 1.005 1m4 0a1 1 0 0 1-1 1 1.001 1.001 0 1 1-.005-2c.557 0 1.005.448 1.005 1m4.005 0a1 1 0 0 1-1 1 1.001 1.001 0 1 1-.005-2c.557 0 1.005.448 1.005 1m-5 2a1 1 0 0 1 0 2 1.001 1.001 0 1 1-.005-2zm-3.005 1a1 1 0 0 1-1 1 1.001 1.001 0 1 1-.005-2c.557 0 1.005.448 1.005 1" />
   </Svg>
)
export default Calendar
