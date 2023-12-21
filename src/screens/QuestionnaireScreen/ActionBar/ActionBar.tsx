import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  onGoBack: () => void;
  onGoNext: () => void;
};

export const ActionBar = ({ onGoBack, onGoNext }: Props) => {
  return (
    <View style={styles.root}>
      <Button
        icon="arrow-left-thin"
        mode="outlined"
        onPress={onGoBack}
      >
        Back
      </Button>
      <Button
        icon="arrow-right-thin"
        mode="contained"
        onPress={onGoNext}
      >
        Next
      </Button>
      {false && (
        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
        >
          Submit
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
