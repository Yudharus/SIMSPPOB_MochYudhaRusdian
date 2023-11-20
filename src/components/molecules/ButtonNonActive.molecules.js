import React from 'react'
import View from '../atoms/View.atom'
import Text from '../atoms/Text.atom'

const ButtonNonActive = ({className,classNameText, text}) => {
  return (
    <View className={className}>
        <Text className={classNameText}>{text}</Text>
    </View>
  )
}

export default ButtonNonActive