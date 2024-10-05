// import { useState } from 'react'
//  import { CurrencyContext } from './context/CurrencyContext';

import Routing from './components/Routing/Routing'


function App() {
 
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
