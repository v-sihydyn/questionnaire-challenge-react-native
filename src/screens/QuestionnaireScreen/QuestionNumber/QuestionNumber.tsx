import { Card, HelperText, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

type Props = {
  title: string | undefined;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  unitType?: string;
  error: string | undefined;
  touched: boolean;
};

export const QuestionNumber = ({
  title = '',
  value,
  onChange,
  required,
  unitType,
  error,
  touched,
}: Props) => {
  return (
    <Card>
      <Card.Title
        title={title}
        titleVariant="titleMedium"
        titleNumberOfLines={4}
      />
      <Card.Content>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Enter a number"
          keyboardType="numeric"
          returnKeyType="done"
          right={unitType && <TextInput.Affix text={unitType} />}
          error={Boolean(error && touched)}
        />
        <View style={styles.helperTextWrapper}>
          <HelperText
            type="error"
            visible={Boolean(error && touched)}
          >
            {error}
          </HelperText>
        </View>
        {required && (
          <Text
            variant="bodyMedium"
            style={styles.requiredMessage}
          >
            *Required
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  helperTextWrapper: {
    height: 30,
  },
  requiredMessage: {
    marginTop: 12,
  },
});
