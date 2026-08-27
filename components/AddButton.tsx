import { Pressable, Text, StyleSheet } from "react-native";

interface AddButtonProps {
  onPress: () => void;
}

export default function AddButton({ onPress }: AddButtonProps) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.plus}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",

    width: 50,
    height: 50,

    borderRadius: 25,

    backgroundColor: "#1F59C7",

    justifyContent: "center",
    alignItems: "center",

    right: 24,
    bottom: 115,

    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  plus: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 28,
  },
});