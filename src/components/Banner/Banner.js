import React from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Image from '../../images/banner.png';
import Carousel from './Carousel';

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
  textTransform: 'capitalize',
  display: 'flex',
  flexDirection: 'column',
});

const Banner = () => {
  return (
    <StyledContainer maxWidth={false}>
      <div style={{height:'40%'}}>
        <StyledTypography variant='h2' style={{fontWeight: 'bold'}}>
          Crypto Tracker
        </StyledTypography>
        <StyledTypography variant='subtitle2'>
          The place where you can find detailed info about crypto in real time
        </StyledTypography>
      </div>
      <Carousel stlye={{height:'50%'}}></Carousel>
    </StyledContainer>
  )
}

export default Banner