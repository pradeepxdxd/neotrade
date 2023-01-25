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
import ForgetPassword from "./components/ForgetPassword";
import ChangePassword from "./components/ChangePassword";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginWithEmail from "./components/LoginWithEmail";

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

      {/* <CurrentMarketPriceOfGold/> */}

      {/* <Router>
        <Routes>
          <Route path="/" element={<ForgetPassword/>} />
          <Route path="/changepassword/:id/:token" element={<ChangePassword/>} />
        </Routes>
      </Router> */}

      <LoginWithEmail/>

    </>
  );
}

export default App;