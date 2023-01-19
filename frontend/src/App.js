import { useEffect } from "react";
import GoldChart from "./components/GoldChart";
import Counter from "./components/Counter";
import Register from "./components/Register";
import { getGoldData } from "./services/trade.api";
import SilverChart from "./components/SilverChart";
import LastMonthChart from "./components/LastMonthChart";
import OneMonthGoldChart from "./components/OneMonthGoldChart";
import OneMonthSilverChart from "./components/OneMonthSilverChart";
import CurrentMarketPriceOfGold from "./components/CurrentMarketPriceOfGold";

const App = () => {
  return (
    <>
      {/* <GoldChart />
      <br />
      <SilverChart />
      <br />
      <OneMonthGoldChart />
      <br />
      <OneMonthSilverChart /> */}

      <CurrentMarketPriceOfGold/>
    </>
  );
}

export default App;