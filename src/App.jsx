import { useState,useEffect } from 'react'
import logo from './assets/bitc.png'; // Import your logo


//  import { CurrencyContext } from './context/CurrencyContext';

import Routing from './components/Routing/Routing'


function App() {
      useEffect(() => {
        document.title = 'Cryptocurrency'; // Set the tab name here
      }, []); // This will run once when the component mounts

  // const [currency,setCurrency]=useState('usd');

  return (
    <>
    
      {/* <CurrencyContext.Provider value={{currency,setCurrency}}>
        <Home/>
      </CurrencyContext.Provider> */}
       <Routing/>
       
      
    
    </>
  )
}

export default App
