import { Component } from 'preact';

export interface IconProps {
  width?: string;
  height?: string;
  cls?: string;
  fill?: string | string[];
}

export abstract class IconComponent< T = {} > extends Component<IconProps | null, T> { }
