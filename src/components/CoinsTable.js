import { Container, LinearProgress, TableContainer, Table, TableHead, TableRow, TableCell, TextField, Typography, TableBody} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';

const CoinsTable = () => {
    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const {currency, symbol} = CryptoState();
    // const [loading, setLoading] = useState(false);

    const StyledTextField = styled(TextField, {})({
        marginBottom: 20,
        width: "100%",
        '& label': {color: 'white'},
        '& label.Mui-focused': {color: 'gold'},
        '& .MuiOutlinedInput-root': {
            '& fieldset': {borderColor: '#3c434a'},
            '&:hover fieldset': {borderColor: 'white'},
            '&.Mui-focused fieldset': {borderColor: 'gold'}
        },
        input: {color: "white", fontFamily: "Montserrat"}
    });
    
    const StyledTableRow = styled(TableRow, {})({
        cursor: "pointer",
        "&:hover": {backgroundColor: "black"},
        fontFamily: "Montserrat"
    })

    useEffect(() => {
        (async () => {
        // setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        // setLoading(false);
    })()}, [currency]);

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)))
    }

    return (
        <div>
            <Container style={{ textAlign: "center"}}>
                <Typography variant="h4" style={{margin: "60 10 20",  fontFamily: "Montserrat"}}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <StyledTextField 
                label="Search For Your Crypto" 
                variant="outlined"
                onChange={(e) => {setSearch(e.target.value);}} />
                <TableContainer>
                    {
                        // loading?
                        // <LinearProgress style={{background: 'gold'}}/>:
                            <Table>
                                <TableHead style={{backgroundColor: "white"}}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((val) => (
                                            <TableCell 
                                            style={{color: "black", fontSize: 20, fontWeight: "bold", fontFamily: "Montserrat", backgroundColor: "gold"}}
                                            key = {val}
                                            align={val === "Coin"?"left":"right"}>
                                                {val}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { handleSearch().map(coin => {
                                        const plus = coin.price_change_percentage_24h >= 0;

                                        return (
                                        <StyledTableRow
                                        onClick={() => navigate(`.coins/${coin.id}`)}
                                        key={coin.name}>
                                            <TableCell component="th" scopt="row"
                                            style={{display: "flex", gap: 15}}>
                                                <img
                                                src={coin.image}
                                                alt={coin.name}
                                                height="50"
                                                style={{marginBottom:10}}/>
                                                <div>
                                                    <span style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 35,
                                                        color: "white"
                                                    }}>{coin.symbol}</span>{" "}
                                                    <span style={{color: "wheat"}}>{coin.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right" style={{color: "white", fontSize: 20}}>
                                                {symbol}{" "}{coin.current_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            </TableCell>
                                            <TableCell
                                            align="right"
                                            style={{color: plus ? "green" : "red", fontSize: 18}}>
                                                {plus && "+"}{coin.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align="right" style={{color:"white", fontSize: 17}}>
                                                {symbol}{" "}{coin.market_cap.toString().slice(0, -6).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} M
                                            </TableCell>
                                        </StyledTableRow>
                                    )})}
                                </TableBody>
                            </Table>
                    }
                </TableContainer>
            </Container>
        </div>
    )

}

export default CoinsTable