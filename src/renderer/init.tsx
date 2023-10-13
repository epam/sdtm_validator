import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { store } from '@redux';
import { GlobalStyle, theme } from '@style';

import { App } from './App';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default () => {
  render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>,
    document.getElementById('root')
  );
};
