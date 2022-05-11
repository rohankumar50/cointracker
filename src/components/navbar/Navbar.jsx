import React, { useEffect, useState } from 'react'
import './navbar.css'
import { FaBitcoin } from 'react-icons/fa'
import { BiSearchAlt } from 'react-icons/bi'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Navbar = () => {

    // const URL = 'https://api.coingecko.com/api/v3/coins/list'
    const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&sparkline=false&price_change_percentage=1h%2C24h%2C7d'

    const [coins, setCoins] = useState([]);
    const [filerData, setFilterData] = useState([]);

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        const newFilter = coins.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase())
        });

        if (searchWord === "") {
            setFilterData([]);
        } else {
            setFilterData(newFilter);
        }
    }


    useEffect(() => {
        axios.get(URL).then((response) => {
            setCoins(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div id="navbar">
            <div className="nav">
                <Link to={'/'}>
                    <div className="logo">
                        <h3>Coin Tracker</h3>
                        <FaBitcoin className='site-logo' />
                    </div>
                </Link>
                <div className="navSearchBox">
                    <div className="search">
                        <BiSearchAlt className='icon' />
                        <input type="text" placeholder='Search' className='search-box' onChange={handleFilter} />
                    </div>
                    {
                        filerData.length !== 0 && (
                            <div className="dataresult">
                                {filerData.slice(0, 10).map((value) => {
                                    return (
                                        <a className='dataItem' href={"#/coins/" + value.id} target="_blank">
                                            <p>
                                                {
                                                    value.name
                                                }
                                            </p>
                                        </a>
                                    );
                                })}
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar