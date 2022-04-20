import React, { useEffect, useState } from 'react';
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Button, Container, RadioGroup } from '@mui/material';
import { styled } from '@mui/system';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import { chartDays } from '../config/data';

const StyledContainer = styled(Container, {})({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  padding: 40
});

const StyledButton = styled(Button, {})({
  backgroundColor: "gold",
  color: "black",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  width: "20%",
  borderColor: "white",
  "&:hover":{
    color: "white",
    borderColor: "black",
    backgroundColor: "#14161a"
  },
  "& .MuiButton-selected":{
    color: "red"
  }
})

const CoinInfo = ({coin}) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const {currency} = CryptoState();
  const fetchHistoricData = async() => {
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  }

  useEffect(()=>{
    fetchHistoricData();
  }, [days, currency]) // currency, days 필요한지 함 보자.

  return (<StyledContainer>
      <Line 
      data={{
          labels: historicData.map(coin => {
            let date = new Date(coin[0]);
            let time = date.getHours() > 12 ? `${date.getHours()-12}:${date.getMinutes()} PM`: `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString()}),
          datasets: [{
            data: historicData.map(coin=>coin[1]), 
            borderColor:"gold",
            label: `Price for last ${days} days in ${currency}`
          }]
      }}
      />
      <div style={{display: "flex", marginTop: 20, justifyContent: "space-around", width: "100%"}}>
        {chartDays.map(day => <StyledButton key={day.value} selected={day.value === days} onClick={() => {setDays(day.value)}} variant='outlined'>{day.label}</StyledButton>)}
      </div>
    </StyledContainer>)












}

export default CoinInfo