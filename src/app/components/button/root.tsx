import { StyleSheet, TouchableOpacity, TouchableOpacityProps  } from 'react-native';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { Variantes } from './variants'


type ButtonProps = TouchableOpacityProps & {
  variant?: keyof typeof Variantes;
  children: ReactNode
};


export function ButtonRoot({ children, className, variant, ...rest }: ButtonProps) {

  return (
    <>
      <TouchableOpacity
      className={clsx(
        `flex flex-row w-full items-center justify-center py-3 ${className}`,
        variant ? Variantes[variant] : 'bg-gray-200 rounded-md'
      )}
      style={styles.shadow}
      {...rest}>

      {children}
    </TouchableOpacity>
    </>
  
  );
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 4
  }
});

