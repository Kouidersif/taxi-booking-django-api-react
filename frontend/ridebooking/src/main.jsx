import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {ContextAppProvider} from '../context/useAppContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ContextAppProvider>
    <BrowserRouter >
    <App />
    </BrowserRouter>
    </ContextAppProvider>

)
