import { Button, FormLabel, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useState } from "react";
import { handles } from "./Data/HANDLES";
import { BtnStyle, BtnStyleSmall } from "./Shared";

import { useParams } from "react-router-dom";

//accordion imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { msps } from "./Data/MSPS";

//modal imports
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ModalContent } from "./ModalContent";
import { mobileStyle } from "./ModalContent";
import { EDINBURGHCLLRS } from "./Data/EDINBURGHCLLRS";

export const Tweetr = ({
  campaign,
  mspProp,
  constMP,
  constituency,

  setConstituency,
}) => {
  const params = useParams();

  const template =
    "I'm your constituent, horrified by the killing of thousands of civilians in Gaza. As the death toll continues to rise, we urgently need a ceasefire. Will you back the amendment? #CeasefireNow";

  const [target, setTarget] = useState(campaign?.target);

  const [mspHandle, setMspHandle] = useState("");
  const [tweetBody, setTweetBody] = useState("");
  const [msp, setMsp] = useState(mspProp);

  let Parties = ["SNP", "Labour", "Tory", "LibDem", "Green"];

  useEffect(() => {
    setMspHandle(constMP.handle);
  }, [constMP]);

  useEffect(() => {
    target !== "none"
      ? setTweetBody(`Hi ${mspHandle || constMP.name}, ` + template)
      : setTweetBody(template);
  }, [mspHandle]);

  const [flash, setFlash] = useState("");
  const refresh = () => {
    window.scrollTo(0, 0);
    setFlash("flash");
    setTimeout(() => {
      setFlash("");
    }, 1000);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openModal = () => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  const handleSend = () => {
    const sendLink = `https://twitter.com/intent/tweet?text=${tweetBody
      .replace("#", "%23")
      .replace(/\n/g, "%0A")}`;

    const width = 550;
    const height = 400;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;

    window.open(sendLink, "twitter", windowFeatures);

    setTimeout(() => {
      handleOpen();
    }, 2000);
  };

  return (
    <div>
      <span className="bebas header header2">Tweet your MP</span>
      {(target == "msps" || !target || Parties.includes(target)) && (
        <>
          <br /> It looks like you live in <b>{constituency}</b>. If that's
          wrong,{" "}
          <span onClick={() => setConstituency()} style={{ cursor: "pointer" }}>
            <u>click here to go back.</u>
          </span>
        </>
      )}

      {constMP.handle !== 'xxx' ? (
        <>
          {target == "msps" || !target || Parties.includes(target) ? (
            <span>
              <br />
              <br />
              You're tweeting:{" "}
              <b>
                {constMP.name} - {constMP.party}
              </b>. {constMP.handle == null && <>It looks like this MP isn't on Twitter, but you can still send your message.</>}
            </span>
          ) : target == "none" ? (
            <></>
          ) : target == "Edinburgh" ? (
            <></>
          ) : (
            <>
              <br />
              <br />
              You're tweeting <b>@{target}</b>. 
            </>
          )}
          <br />
          <br />
          <FormLabel sx={{ color: "white" }}>Your message:</FormLabel>
          <br />
          <TextField
            className={flash == "flash" ? "flash" : "notFlash"}
            fullWidth
            required
            id="user-tweet"
            multiline
            minRows={3}
            value={tweetBody}
            inputProps={{ maxLength: 280 }}
            onChange={(e) => setTweetBody(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />
          <div
            style={{
              textAlign: "right",
              color: `rgb(${255}, ${255 - tweetBody.length * 10}, ${
                255 - tweetBody.length * 10
              })`,
            }}
          >
            {tweetBody.length}/280
          </div>
        </>
      ) : (
        <>It looks like your MP isn't on Twitter.</>
      )}
      <center>
        <Button sx={BtnStyle} target="_blank" onClick={handleSend}>
          Send
        </Button>
      </center>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mobileStyle}>
          <span
            style={{
              float: "right",
              marginTop: "-23px",
              marginRight: "-20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            x
          </span>
          <ModalContent setOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
};
