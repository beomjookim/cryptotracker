import { Pagination } from '@material-ui/lab';
import { Container, LinearProgress, TableContainer, Table, TableHead, TableRow, TableCell, TextField, Typography, TableBody} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';

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
    "&:hover": {backgroundColor: "#2E2E2E"},
    fontFamily: "Montserrat"
})

const StyledPagination = styled(Pagination, {})({
    ul: {"& .MuiPaginationItem-root": {color: "gold"},
        '& .Mui-selected': {backgroundColor: 'gold', color: 'black'}},
    display: "flex",
    justifyContent: "center",
    padding: 20
})

const CoinsTable = () => {
    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const {currency, symbol} = CryptoState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    })()}, [currency]);

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)))
    }

    return (
        <div>
            <Container style={{ textAlign: "center"}}>
                <Typography variant="h4" style={{marginTop: 50, marginBottom:30, fontFamily: "Montserrat"}}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <StyledTextField 
                label="Search For Your Crypto" 
                variant="outlined"
                onChange={(e) => {setSearch(e.target.value);}} />
                <TableContainer>
                    {
                        loading?
                        <LinearProgress style={{background: 'gold'}}/>:
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
                                {handleSearch().slice((page-1)*10, page*10).map(coin => {
                                    const plus = coin.price_change_percentage_24h >= 0;

                                    return (
                                    <StyledTableRow
                                    onClick={() => navigate(`coins/${coin.id}`)}
                                    key={coin.name}
                                    >
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
                <StyledPagination
                count={parseInt((handleSearch()?.length/10).toFixed(0))}
                onChange={(_, val) => {
                    setPage(val);
                    window.scroll(0, 450);
                }}
                page={page}/>
            </Container>
        </div>
    )
}

export default CoinsTable