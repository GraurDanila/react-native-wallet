import * as SecureStore from 'expo-secure-store';

export const tokenCache = {
  getToken: async (key) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  saveToken: (key, value) => {
    return SecureStore.setItemAsync(key, value);
  },
};