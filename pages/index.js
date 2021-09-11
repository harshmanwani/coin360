import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useCallback, useEffect, useReducer, useState } from "react";
import axios from 'axios';

import * as actionTypes from "../store/actionTypes";
import { appReducer, initState } from "../store/reducer";
import { GET_COINS } from "../utils/API";

import Header from "../components/Header";
import CoinTable from "../components/CoinTable";
import Footer from "../components/Footer";
import Loader from "../components/Loader";


export default function Home() {

  const [isLoading, setLoading] = useState(false);

  const [interval, setDataInterval] = useState("24h")

  const [state, dispatch] = useReducer(appReducer, initState);

  // Fetch coins data
  const fetchData = useCallback(async (refereshing) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      axios.get(GET_COINS, {
        params: {
          currency: "USD",
          updates_from: 1629894793,
          // updates_from: Date.now(),
          // updates_from: Number(Date.now() /1000 ).toFixed(),
          period: interval,
          no_charts: true,
        }
      })
        .then(response => {
          const { status, data } = response;
          if (status === 200) {
            console.log(data);
            data.data = data.data.filter(coinItem => coinItem["p"] !== 0); // Normalize Data to remove zero price coins
            dispatch({ type: actionTypes.SET_COINS_DATA, payload: { coinsData: data } });
            setLoading(false);
            resolve(data);
          } else {
            alert("Something went wrong");
            if (interval !== "24h") setDataInterval("24h");
            reject(response)
          }
        })
        .catch(err => {
          alert("Something went wrong")
          setLoading(false);
          if (interval !== "24h") setDataInterval("24h");
          reject();
        });
    })
  }, [interval]);

  useEffect(() => {
    fetchData();
  }, [interval, fetchData])

  return (
    <div className={styles.main}>
      <Head>
        <title>Coin360</title>
        <meta name="description" content="Coin 360 application to compare cryptocurrency prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && <Loader />}
      
      <Header
        interval={interval}
        setDataInterval={setDataInterval}
      />
      <CoinTable
        dataset={state.coinsData.data}
      />
      <Footer
        timestamp={state.coinsData.timestamp}
        refereshData={fetchData}
      />
    </div>
  )
}
