import { NavigationContainer, NavigationState } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { withIAPContext } from 'react-native-iap';
import { ThemeProvider } from 'styled-components/native';
import { ModalContext } from './contexts/modal';
import { PersistorContext } from './contexts/persist';
import { TranslationContext } from './contexts/translation';
import { useEvents } from './hooks/useEvents';
import Root from './root';
import { dark, theme } from './theme';

const App: React.FC = () => {
  const themeScheme = useColorScheme() === 'dark' ? dark : theme;

  const { register } = useEvents();

  useEffect(() => {
    register('user_opened_app');
  }, []);

  const handleStateChange = (state: NavigationState | undefined) => {
    if (!state) {
      return;
    }

    if (state.routes[state.index].name) {
      register('user_screen_navigated', {
        routeName: state.routes[state.index].name,
      });
    }
  };

  return (
    <ThemeProvider theme={themeScheme}>
      <PersistorContext>
        <TranslationContext>
          <ModalContext>
            <NavigationContainer onStateChange={handleStateChange}>
              <Root />
            </NavigationContainer>
          </ModalContext>
        </TranslationContext>
      </PersistorContext>
    </ThemeProvider>
  );
};

export default withIAPContext(App);
