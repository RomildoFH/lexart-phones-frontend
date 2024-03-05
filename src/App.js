import { ToastContainer } from 'react-toastify';
import Routers from './Router';
import AppProvider from './context/AppProvider';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  document.title = "Lexart Phones";

  return (
    <AppProvider>
      <Routers />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;