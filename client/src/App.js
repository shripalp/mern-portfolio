import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Loader from "./components/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  HideLoading,
  SetPortFolioData,
  ShowLoading,
  ReloadData,
} from "./redux/rootSlice";
import Login from "./pages/Admin/Login";

function App() {
  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.root
  );
  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading(true));
      const response = await axios.get("/api/portfolio/get-portfolio-data");
      dispatch(SetPortFolioData(response.data));
      dispatch(ReloadData(false));

      dispatch(HideLoading());
    } catch (error) {
      console.log(error);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
