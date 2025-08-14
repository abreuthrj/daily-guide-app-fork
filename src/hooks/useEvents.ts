import analytics from '@react-native-firebase/analytics';

export const useEvents = () => {
  const register = (name: string, params?: Record<string, any>) => {
    analytics()
      .logEvent(`custom_${name}`, {
        ...(params ?? {}),
      })
      .catch(err => console.log('[EVENT ERROR]:', err));
  };

  return { register };
};
