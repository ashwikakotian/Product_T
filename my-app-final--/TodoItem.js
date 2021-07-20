import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

export default function TodoItem(props) {
  // Update style according to props
  let style = props.item.completed
    ? {
        textDecorationLine: 'line-through',
        color: '#800000',
      }
    : {
        textDecorationLine: 'none',
        color: '#800000',
      };

  return (
    <TouchableOpacity
      onPress={() => props.completeFunction()}
      style={{
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={[{ fontSize: 18 }, style]}>{props.item.text}</Text>

      <TouchableOpacity
        style={{
          padding: 8,
          backgroundColor: '#1ABC9C',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => props.deleteFunction()}>
        <Text style={{ color: '#fafafa' }}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
