import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

type Props = {
   size?: number
   color?: string
} & Omit<SvgProps, 'height' | 'width' | 'color' | 'fill'>

const ArrowCircle = ({ size, color, ...props }: Props) => (
   <Svg
      width={size ?? 32}
      height={size ?? 32}
      viewBox="0 0 256 256"
      fill={color ?? '#000'}
      {...props}
   >
      <Path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88m37.66-85.66a8 8 0 0 1 0 11.32l-32 32a8 8 0 0 1-11.32 0l-32-32a8 8 0 0 1 11.32-11.32L120 148.69V88a8 8 0 0 1 16 0v60.69l18.34-18.35a8 8 0 0 1 11.32 0" />
   </Svg>
)
export default ArrowCircle
