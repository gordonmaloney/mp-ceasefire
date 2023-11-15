import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Landing } from "./Landing";

import stw from "./stw.jpeg";
import cnd from "./cnd.png";
import pfb from "./pfb.jpg";
import mab from "./mab.png";
import psc from "./psc.jpeg";
import foa from "./foa.png";

const LogoStyle = {
  height: "35px",
  padding: "3px",
  paddingBottom: "1px",
};

function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          alignItems: "center",
          backgroundColor: "white",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <a href="https://palestinecampaign.org" target="_blank">
          <img src={psc} style={LogoStyle} />
        </a>

        <a href="https://www.stopwar.org.uk" target="_blank">
          <img src={stw} style={LogoStyle} />
        </a>

        <a href="https://cnduk.org/" target="_blank">
          <img src={cnd} style={LogoStyle} />
        </a>

        <a href="https://www.foa.org.uk" target="_blank">
          <img src={foa} style={LogoStyle} />
        </a>

        <a
          href="https://www.facebook.com/PalestinianForumInBritain"
          target="_blank"
        >
          <img src={pfb} style={LogoStyle} />
        </a>

        <a href="https://www.mabonline.net" target="_blank">
          <img src={mab} style={LogoStyle} />
        </a>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
