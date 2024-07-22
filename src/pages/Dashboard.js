import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from 'axios'
import Search from '../components/Dashboard/Search'
import PaginationComponent from '../components/Dashboard/Pagination'
import Loader from '../components/Common/Loader'
import BackToTop from '../components/Common/BackToTop'

const DashboardPage = () => {

  const [coins,setCoins]=useState([]);
  const [PaginatedCoins,setPaginatedCoins]=useState([]);
  const[search,setSearch]=useState("")
  const [page, setPage] =useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value -1) * 10;
    setPaginatedCoins(coins.slice(previousIndex,previousIndex + 10))
  };

const onSearchChange=(e)=>{
  setSearch(e.target.value);
};

var filteredCoins = coins.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()) 
|| item.symbol.toLowerCase().includes(search.toLowerCase()));

  useEffect(()=>{
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
    .then((response)=>{
console.log(response)
setCoins(response.data)
setPaginatedCoins(response.data.slice(0,10))
setIsLoading(false);
    })
    .catch((error)=>{
console.log(error)
setIsLoading(false);
    })
  },[])
  return (
    <>
      <Header />
      <BackToTop/>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange}/>
          <TabsComponent coins={search?filteredCoins : PaginatedCoins}/>
          {!search && (<PaginationComponent page={page} handlePageChange={handlePageChange}
          />
          )}
          </div>
      )}
    </>
  );
          }

export default DashboardPage;