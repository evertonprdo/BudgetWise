import { SvgProps } from 'react-native-svg'

export type IconsProps = {
   size?: number
   color?: string
} & Omit<SvgProps, 'height' | 'width' | 'color' | 'fill'>

export type IconComponent = (props: IconsProps) => React.JSX.Element
