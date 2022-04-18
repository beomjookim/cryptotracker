import { Container } from '@mui/material';
import {styled} from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {CryptoState} from '../../CryptoContext'
import { TrendingCoins } from '../../config/api'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container, {})({
    height: '50%',
    display: 'flex',
    flexDirection: 'column'
    });

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const {currency, symbol} = CryptoState();

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(TrendingCoins(currency));
            setTrending(data);
        })();
}, [currency]);

    const items = trending.map((coin) => {
        const percent = coin.price_change_percentage_24h;

        return (
        <Link to={`/coins/${coin.id}`} style={{textDecoration: 'none'}}>
            <img
            src={coin?.image}
            alt={coin.name}
            height='80'
            style={{marginBottom: 10}}/>
            <div>
                <span style={{fontWeight: 500, color: 'gold'}}>{coin.symbol.toUpperCase()} &nbsp;</span>
                <span style={{fontWeight: 500, color: `${percent >= 0 ? 'green' : 'red'}`}}> {(percent >= 0) && '+'}{percent.toFixed(2)+'%'} </span>
                <div style={{fontSize: 22, fontWeight: 500, color:'white'}}>
                    {symbol} {coin?.current_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
            </div>
        </Link>
    )})

    return (
        <StyledContainer>
            <AliceCarousel
            mouseTracking
            infinite
            autoPlay
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={{0: {items: 2}, 512: {items: 4}}}
            items={items}/>
        </StyledContainer>
    )
}

export default Carousel