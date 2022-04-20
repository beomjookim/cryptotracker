import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import CoinInfo from '../components/CoinInfo'
import { Box, LinearProgress, TextareaAutosize, Typography } from '@mui/material';
import { styled, textAlign } from '@mui/system';
import ReactHtmlParser from 'react-html-parser';

const StyledBox = styled(Box, {})({
  display:"flex", 
  flexDirection:"column", 
  width:"30%", 
  alignItems:"center", 
  borderRight:"2px solid grey", 
  textAlign:"center",
  marginTop: 50, 
  padding: 20
})

const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState();
  const {currency, symbol} = CryptoState();
  const fetchCoin = async () => {
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  }
  useEffect(()=>{fetchCoin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    coin?
    (<Box sx={{display:"flex"}}>  
      <StyledBox>
        <img src={coin?.image.large} alt={coin?.name} 
          height="200" style={{marginBottom:20}}/>    
        <Typography variant="h3" sx={{
          fontWeight:"bold", 
          marginBottom: 5, 
          fontFamily:"Montserrat"}}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" sx={{
          fontFamily:"Montserrat", 
          fontWeight: "500",
          color:"grey", 
          margin: 5,
          textAlign:"left",
          "& > a":{color:"yellow", textDecoration:"none"}}}>
          {ReactHtmlParser(coin?.description.en.split('. ')[0])}
        </Typography>
        <div>
          <Typography variant='h5' sx={{marginTop: 3, fontWeight:"bold"}}>
            Rank: {coin?.market_cap_rank}
          </Typography>
          <Typography variant='h5' sx={{marginTop: 2, fontWeight:"bold"}}>
            Current Price: {symbol} {coin?.market_data
            .current_price[currency.toLowerCase()]
            .toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Typography>
          <Typography variant='h5' sx={{marginTop: 2, fontWeight:"bold"}}>
            Market Cap: {symbol} {coin?.market_data
            .market_cap[currency.toLowerCase()]
            .toFixed(2).toString().slice(0,-6).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} M
          </Typography>
        </div>
      </StyledBox>
      <CoinInfo coin={coin} sx={{display:"flex", width:"60%"}}/>
    </Box>
  ):
  <LinearProgress style={{backgroundColor: "gold"}}/>
)}

export default CoinPage