import { BrowserRouter } from 'react-router-dom';
import { AuthWrapper } from './config/AuthWrapper';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;