import React from 'react';
import * as AntdIcons from '@ant-design/icons';

interface IconProps {
  name: string;
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

interface AntIconProps extends Omit<IconProps, 'name'> {
  name: string;
}

// 自定义SVG图标组件
const LocalIcon: React.FC<IconProps> & { Ant: React.FC<AntIconProps> } = (props) => {
  const { name, color, size, className = '', style = {}, onClick } = props;

  const svgStyle: React.CSSProperties = {
    width: size || '1em',
    height: size || '1em',
    fill: color,
    ...style
  };

  return (
    <svg
      className={`icon ${className}`}
      aria-hidden="true"
      style={svgStyle}
      onClick={onClick}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
};

// Ant Design 图标组件
const AntIcon: React.FC<AntIconProps> = (props) => {
  const { name, color, size, className = '', style = {}, onClick } = props;

  // 动态获取Ant Design图标组件
  const AntIconComponent = (AntdIcons as any)[name];

  if (!AntIconComponent) {
    console.warn(`Ant Design icon "${name}" not found`);
    return null;
  }

  const iconStyle: React.CSSProperties = {
    fontSize: size || '1em',
    color: color,
    ...style
  };

  return (
    <AntIconComponent
      className={className}
      style={iconStyle}
      onClick={onClick}
    />
  );
};

// 将Ant组件附加到Icon上
LocalIcon.Ant = AntIcon;

export default LocalIcon;
