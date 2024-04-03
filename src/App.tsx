import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from "./components/orders/Orders";
import CreateOrder from "./components/createOrder/CreateOrder";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./components/style";

function App() {

    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Orders/>} errorElement={<Orders/>}/>
                    <Route path="createOrder" element={<CreateOrder/>}/>
                    <Route path="*" element={<Orders/>}/>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
