import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/sonner"
import { Provider } from "react-redux";
import './index.css'
import App from './App.tsx'
import store from './redux/index.ts';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />

  </Provider>
    <Toaster richColors/>
  </BrowserRouter>,
)
