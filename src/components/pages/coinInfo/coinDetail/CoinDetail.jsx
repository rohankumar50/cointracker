import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './coinDetails.css'
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import Loading from '../../../loading/Loading';


const CoinDetail = () => {
    const [coinData, setCoinData] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const URL = `https://api.coingecko.com/api/v3/coins/${params.id}?localization=en&market_data=true&sparkline=true`;

    useEffect(() => {
        axios.get(URL).then((response) => {
            setCoinData(response.data);
            setLoading(true)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div id='coindDeatails'>
            <div className="container">
                {
                    loading ? (
                        <div className="details">
                            <div className="rank">
                                <p>RANK #</p>
                                <p>{coinData.coingecko_rank}</p>
                            </div>
                            <div className="coinName">
                                <div className="coinName_image">
                                    <img src={coinData.image ? coinData.image.large : null} alt="" />
                                </div>
                                <div className="coinName_name">
                                    <p>{coinData.name ? coinData.name : null}</p>
                                </div>
                            </div>
                            <div className="details_price">

                                <div className="price_in_inr">
                                    <p className='tag_text'>PRICE IN INR</p>
                                    <p>{coinData.market_data ? coinData.market_data.current_price.inr : null} &#x20B9;</p>
                                </div>
                                <div className="price_in_btc">
                                    <p className='tag_text'>PRICE IN BTC</p>
                                    <p>{coinData.market_data ? coinData.market_data.current_price.btc : null} BTC</p>
                                </div>
                                <div className="mkt_cap">
                                    <p className='tag_text'>MARKET CAP</p>
                                    <p>{coinData.market_data ? coinData.market_data.market_cap.inr : null} &#x20B9;</p>
                                </div>
                            </div>
                            <div className="mkt">
                                <h6>History</h6>
                                <div className="mkt_24h_change">
                                    <p className='tag_text'>24h CHANGE</p>
                                    <p>{coinData.market_data ? coinData.market_data.price_change_24h_in_currency.inr : null}</p>
                                </div>
                                <div className="mkt_7d_change">
                                    <p className='tag_text'>7d CHANGE</p>
                                    <p>{coinData.market_data ? coinData.market_data.price_change_percentage_7d : null} %</p>
                                </div>
                                <div className="mkt_14d_change">
                                    <p className='tag_text'>14d CHANGE</p>
                                    <p>{coinData.market_data ? coinData.market_data.price_change_percentage_14d : null} %</p>
                                </div>
                                <div className="mkt_30d_change">
                                    <p className='tag_text'>30d CHANGE</p>
                                    <p>{coinData.market_data ? coinData.market_data.price_change_percentage_30d : null} %</p>
                                </div>
                            </div>
                            <div className="description">
                                <p className='tag_text'>DESCRIPTION</p>
                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(coinData.description ? coinData.description.en : null) }}></p>
                            </div>
                        </div>
                    ) : <Loading />
                }

            </div>
        </div>
    )
}

export default CoinDetail