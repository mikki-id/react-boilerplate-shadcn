import MainRouter from './router'
import { useAuthHydration } from '@/store/hooks/useAuthHydration'

const App = () => {
  useAuthHydration();

  return <MainRouter />;
}

export default App;
