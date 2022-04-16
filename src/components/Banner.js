import React from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Image from '../images/banner.png';

const StyledContainer = styled(Container, {})({
    background: `url(${Image})`,
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'center',
    textAlign: 'center'
  });

const StyledTypography = styled(Typography, {})({
    marginBottom: 15,
    fontFamily: "Montserrat",                
    color: 'white',
    textTransform: 'capitalize'
})

const Banner = () => {
  return (
    <StyledContainer maxWidth={false}>
        <StyledTypography variant='h2' style={{height:'40%', fontWeight: 'bold'}}>
            Crypto Tracker
        </StyledTypography>
        <StyledTypography variant='subtitle2'>
            <span style={{background: 'black'}}>The place where you can find all important info about crypto in real time</span>
        </StyledTypography>
    </StyledContainer>
  )
}

export default Banner