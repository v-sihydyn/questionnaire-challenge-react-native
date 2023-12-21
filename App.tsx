import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Navigation } from './src/navigation';

export const App = () => {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
};
