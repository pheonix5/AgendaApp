import React from 'react';
import { Text, TextProps } from 'react-native';

type Props = TextProps & {
  title: string
}

export function HeaderTittle({ title, className, ...rest }: Props) {
  return (
    <>
      <Text className={`text-3xl font-titulo text-Cgray-300 text-center ${className}` } {...rest}> 
        {title}
      </Text>
    </>
  );
}