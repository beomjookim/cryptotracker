import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import CoinInfo from '../components/CoinInfo'
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ReactHtmlParser from 'react-html-parser';

const StyledBox = styled(Box, {})({
  display:"flex", 
  flexDirection:"column", 
  width:"30%", 
  alignItems:"center", 
  borderRight:"2px solid grey", 
  marginTop: 20, 
  padding:10
})

const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState();
  const {currency, symbol} = CryptoState();
  const fetchCoin = async () => {
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  }
  useEffect(()=>{fetchCoin()}, []);

  return (
    <Box sx={{display:"flex"}}>
      <StyledBox>
        <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom:20}}/>
        <Typography variant="h3" sx={{fontWeight:"bold", marginBottom: 5, fontFamily:"Montserrat"}}>{coin?.name}</Typography>
        <Typography variant="subtitle1" sx={{fontFamily:"Montserrat", color:"grey", "& > a":{color:"yellow", textDecoration:"none"}}}>{ReactHtmlParser(coin?.description.en.split('. ')[0])}</Typography>
      </StyledBox>
      <CoinInfo coin={coin} sx={{display:"flex", width:"60%"}}/>
    </Box>
  )
}

export default CoinPage