import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';
import AppRoutes from './components/AppRoutes/AppRoutes';
import igniteTheme from './themes/ignite';
import './i18n';
// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={igniteTheme}>
          <AppRoutes />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
