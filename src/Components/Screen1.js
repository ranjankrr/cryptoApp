import React,{useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import GraphChart from './GraphChart';
import './Screen1.css';
const Screen = ()=>{
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [select, setSelect] = useState("1inch");

    

     const getData = async()=>{
     const res = await fetch("https://supermind-staging.vercel.app/api/test/listing");
     const actualData = await res.json();
     setCoins(actualData);
     console.log(actualData)
    }

    const SearchBox = (event) =>{
          setSearch(event.target.value);
    }
     
    useEffect(()=>{
        getData();
    },[]);

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = coins
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .filter((elm)=>elm.name.toLowerCase().includes(search)).map((items)=>{
            return(
                <tr onClick={()=>setSelect(items.fullName)}>
                  <td>{items.name}</td>
                  <td>{items.fullName}</td>
                  <td>{items.price}</td>
                  <td>{items.rank}</td>
               </tr>
            )
        });

        const pageCount = Math.ceil(coins.length / usersPerPage);
        const changePage =({selected})=>{
            setPageNumber(selected);
        };
    return(
        <>
          <div className='container'>
            <div className='inputBox'>
                <input type="search" placeholder='Please search coins...' onChange={SearchBox} value={search}/>
            </div>
              <div className='table-responsive'>
                  <table className='table table-hover'>
                    <thead className='bg-success text-light'>
                         <tr>
                            <th>Coins</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Rank</th>
                         </tr>
                    </thead>
                    <tbody>
                       {displayUsers}
                    </tbody>
                </table>
                <div className='paginate'>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />

                </div>
              </div>
              <hr/>
              <GraphChart Selects={select}/>
          </div>

        </>
    )
}
export default Screen;