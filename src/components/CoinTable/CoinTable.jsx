import { useState, useEffect, useContext, createContext } from "react";
import { fetchCoinData } from "../../services/fetchCoinData";
import { useQuery } from "react-query";
//  import { CurrencyContext } from "../context/CurrencyContext";
import store from "../../state/store";
import { useNavigate } from "react-router-dom";
import MyLoader from "../PageLoader/PageLoader";
function CoinTable( ) {
  const [page, setPage] = useState(1);
  const navigate=useNavigate();
//   const {currency}=useContext(CurrencyContext)
    const {currency}=store();
  const { data, isLoading, isError, error } = useQuery(
    ['coins', page,currency],
    () => fetchCoinData(page, currency), 
    {
    //   retry: 2,        // Retry fetching twice on failure
    //   retryDelay: 1000, // Wait 1 second before retrying
       cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes
      staleTime: 1000 * 60 * 1, // Mark data as fresh for 1 minute
    }
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <MyLoader/>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const onHandleredirect=(id)=>{
    navigate(`/details/${id}`);
    
    //  history.push(`/details/${id}`)
  }

  return (
    <>
      <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
     
            <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-center">
                {/* Header of the table */}
                <div className="basis-[35%]">
                    Coin 
                </div>
                <div  className="basis-[25%]">
                    Price 
                </div>
                <div  className="basis-[20%]">
                    24h change 
                </div>
                <div  className="basis-[20%]">
                    Market Cap
                </div>
            </div>
            <div className="flex flex-col w-[80vw] mx-auto">
            {isLoading && <div>Loading...</div>}
            {data && data.map((coin) => {
                    return (
                        <div onClick={()=>onHandleredirect(coin.id)} key={coin.id} className="w-full bg-transparent text-white flex font-semibold items-center justify-center
                         py-4 px-2 cursor-pointer ">
                            <div className="flex items-center justify-start gap-3 basis-[35%]">
                                <div className="w-[5rem] h-[5rem]">
                                    <img src={coin.image} className="w-full h-full" alt="" />
                                </div>
                                <div className="flex flex-col"> 
                                    <div className="text-3xl">{coin.name}</div>
                                    <div className="text-xl">{coin.symbol}</div>
                                </div>
                            </div>
                            <div className="basis-[25%]">
                                {coin.current_price}
                            </div>
                            <div className="basis-[20%]">
                                {coin.price_change_24h}
                            </div>
                            <div className="basis-[20%]">
                                {coin.market_cap}
                            </div>
                           
                        </div>
                    )
                })}
            </div>
            <div className="flex gap-4 justify-center items-center">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page-1)} 
                    className="btn btn-primary btn-wide text-white text-2xl"
                >
                    Prev
                </button>
                <button 
                    onClick={() => setPage(page+1)} 
                    className="btn btn-secondary btn-wide text-white text-2xl"
                >
                    Next
                </button>
            </div>
        </div>
    </>
  );
}

export default CoinTable;
// import { useState, useEffect } from "react";
// import { fetchCoinData } from "../../services/fetchCoinData";
// import { useQuery } from "react-query";
// import InfiniteScroll from "react-infinite-scroll-component";

// function CoinTable() {
//   const [page, setPage] = useState(1);
//   const [items, setItems] = useState([]);
//   const { data, isLoading, isError, error } = useQuery(
//     ['coins', page],
//     () => fetchCoinData(page, 'usd'),
//     {
//       staleTime: 1000 * 60 * 1, // Mark data as fresh for 1 minute
//     }
//   );

//   useEffect(() => {
//     if (data) {
//       setItems((prevItems) => [...prevItems, ...data]); // Append new data to the existing items
//     }
//   }, [data]);

//   const fetchData = () => {
//     setPage((prevPage) => prevPage + 1); // Increment the page to fetch the next set of data
//   };

//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <InfiniteScroll
//       dataLength={items.length} // Length of the current items
//       next={fetchData} // Function to load more data
//       hasMore={true} // Set to true as long as there are more pages
//       loader={<h4>Loading...</h4>} // Loader while fetching more data
//       endMessage={
//         <p style={{ textAlign: 'center' }}>
//           <b>Yay! You have seen it all</b>
//         </p>
//       }
//       // Optional: Pull down to refresh functionality
//       refreshFunction={() => setItems([])} // Clear items to refresh
//       pullDownToRefresh
//       pullDownToRefreshThreshold={50}
//       pullDownToRefreshContent={
//         <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
//       }
//       releaseToRefreshContent={
//         <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
//       }
//     >
//       <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
//         <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-center">
//           {/* Header of the table */}
//           <div className="basis-[35%]">Coin</div>
//           <div className="basis-[25%]">Price</div>
//           <div className="basis-[20%]">24h change</div>
//           <div className="basis-[20%]">Market Cap</div>
//         </div>
//         <div className="flex flex-col w-[80vw] mx-auto">
//           {items.map((coin) => (
//             <div key={coin.id} className="w-full bg-transparent text-white flex font-semibold items-center justify-center py-4 px-2">
//               <div className="flex items-center justify-start gap-3 basis-[35%]">
//                 <div className="w-[5rem] h-[5rem]">
//                   <img src={coin.image} className="w-full h-full" alt="" />
//                 </div>
//                 <div className="flex flex-col"> 
//                   <div className="text-3xl">{coin.name}</div>
//                   <div className="text-xl">{coin.symbol}</div>
//                 </div>
//               </div>
//               <div className="basis-[25%]">{coin.current_price}</div>
//               <div className="basis-[20%]">{coin.price_change_24h}</div>
//               <div className="basis-[20%]">{coin.market_cap}</div>
//             </div>
//           ))}
//         </div>
//         {isLoading && <div>Loading more data...</div>}
//       </div>
//     </InfiniteScroll>
//   );
// }

// export default CoinTable;
