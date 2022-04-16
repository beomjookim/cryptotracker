import React, {createContext, useContext, useEffect, useState} from 'react';

const Crypto = createContext(null);

export const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");

    useEffect(()=>{
        // 나중에 객체를 활용한 switch 문으로 바꾸자!
        if (currency === "USD") setSymbol("$");
        else if (currency === "KRW") setSymbol("₩");
        else if (currency === "GBP") setSymbol("£");
        // console.log(currency, symbol);
    }, [currency]);

    return <Crypto.Provider value={{currency, symbol, setCurrency}}>{children}</Crypto.Provider>
};
export const CryptoState = () => useContext(Crypto);