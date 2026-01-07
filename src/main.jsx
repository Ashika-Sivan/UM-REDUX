import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import Store,{persistor} from './redux/Store.jsx'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
  <StrictMode>
    <App />
  </StrictMode>,
  </PersistGate>
  </Provider>
)
