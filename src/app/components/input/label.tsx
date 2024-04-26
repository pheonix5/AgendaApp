import { Text } from 'react-native'

export function InputLabel({ label }: { label: string }) {
  return <Text className='text-white text-lg mb-2'>{label}</Text>
}