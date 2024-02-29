import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './Context/UserContext.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools' 
import CartContextProvider from './Context/CartContext.js';
import WishListProvider from './Context/WishListContext.js';

let queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartContextProvider>
    <WishListProvider>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
           <App/>
           {/* <ReactQueryDevtools></ReactQueryDevtools> */}
      </QueryClientProvider>
    </UserContextProvider>
    </WishListProvider>
    </CartContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
