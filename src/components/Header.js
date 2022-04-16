import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {AppBar, Box, Toolbar, Typography, Select, InputLabel} from '@mui/material';
import {MenuItem} from '@mui/material';
import {styled} from '@mui/system';
import {CryptoState} from '../CryptoContext';

const StyledTypography = styled(Typography, {})({
  flex: 1,
  color: 'gold',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  cursor: 'pointer',
});

const StyledSelect = styled(Select, {})({
  color: 'gold',
  fontFamily: 'Montserrat',
  cursor: 'pointer',
  backgroundColor: '#3c434a',
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'gold',
  },
});

const Header = () => {
  const navigate = useNavigate();
  function handleClick() {navigate("/")}
  const {currency, setCurrency} = CryptoState();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor: "#1d2327"}}>
        <Toolbar>
          <StyledTypography onClick={handleClick} variant="h6" component="div">
            Crypto Tracker
          </StyledTypography>
          <InputLabel id="demo-simple-select-label" style={{color:"gold"}}>Currency</InputLabel>
          <StyledSelect
            variant="outlined"
            style={{ width: 100, height: 40, marginLeft: 15}}
            label="Currency"
            value={currency || "USD"}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"KRW"}>KRW</MenuItem>
            <MenuItem value={"GBP"}>GBP</MenuItem>
          </StyledSelect>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header