import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


export const myTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
      backgroundColor : "red"  
    },
  };
  