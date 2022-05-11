import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './trending.css'

const Trending = () => {

    const URL = 'https://api.coingecko.com/api/v3/search/trending'
    const [trending, setTrending] = useState([])

    const getData = () => {
        axios.get(URL).then((response) => {
            setTrending(response.data.coins);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
        const interval = setInterval(() => {
            getData()
        }, 10000)
        return () => clearInterval(interval)
    }, []);

    return (
        <div id='trending'>
            <div className="container">
                <div className="cards">
                    {
                        trending.map(card => {
                            return (
                                <Link to={`/coins/${card.item.id}`} key={card.item.id}>
                                    <div className="card">
                                        <img src={card.item.large} alt="" />
                                        <div className="coin_details">
                                            <div className="coin_name">
                                                <div className="name">
                                                    {card.item.name}
                                                </div>
                                                <div className="thumb_symbol">
                                                    {card.item.symbol}
                                                </div>
                                            </div>
                                            <div className="coin_price">
                                                {card.item.price_btc.toFixed(15)} btc
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Trending