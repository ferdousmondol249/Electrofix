import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './route/index.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store'; // Import persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
