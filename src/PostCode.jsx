import { TextField, Button, FormLabel } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Tweetr } from "./Tweetr";

import { MPs } from "./Data/MPs";
import { BtnStyle, BtnStyleSmall } from "./Shared";
import { useParams } from "react-router-dom";

//modal imports
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";

export const PostCode = ({ campaign }) => {
  const params = useParams();

  const channel = "twitter";

  const [postcode, setPostcode] = useState(null);

  const [constituency, setConstituency] = useState(null);

  const [constMP, setConstMP] = useState();

  const [invalid, setInvalid] = useState(false);

  const [loading, setLoading] = useState(false);

  const fetchPostcodeDeets = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}`
      );

      const data = await response.json();

      setConstituency(data.result.parliamentary_constituency);

      setConstMP(
        MPs.find(
          (mp) => mp.constituency == data.result.parliamentary_constituency
        )
      );
    } catch {
      setInvalid(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (invalid && constMP) setInvalid(false);
    if (loading && constMP) setLoading(false);
  }, [constMP]);

  //fade in
  const [fade, setFade] = useState("fadeIn");
  useEffect(() => {
    setFade("fadeFinished");
  }, []);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "270px",
  };

  return (
    <>
      <Modal
        open={loading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <center>
            <CircularProgress />{" "}
          </center>
        </Box>
      </Modal>
      <div className={`landing ${fade}`}>
        {invalid || !constMP ? (
          <>
            <div className="landingContainerSmall">
              <span className="bebas header header2">
                DEMAND YOUR MP VOTES FOR A CEASEFIRE
              </span>
              <br />
              <center>
                <p>
                  Use this tool to message your Member of Parliament on
                  Twitter/X and demand they back a ceasefire in Gaza in the vote
                  on Wednesday 15th November.
                </p>
                <FormLabel sx={{ color: "white" }}>
                  Enter your postcode to begin:
                </FormLabel>
                <br />
                <br />
                <TextField
                  autoFocus
                  id="postcodeInput"
                  sx={{
                    width: "75%",
                    border: invalid && "red 2px solid",
                    borderRadius: invalid && "5px",
                  }}
                  defaultValue={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                    },
                  }}
                />
                {invalid && (
                  <h5 style={{ marginBottom: "-10px" }}>
                    This postcode doesn't seem to be valid!
                    <br />
                    <br />
                    If you think that's wrong then try again.
                  </h5>
                )}
                <br />
                <br />
                <Button sx={BtnStyle} onClick={() => fetchPostcodeDeets()}>
                  Draft your message
                </Button>
              </center>

              <p style={{ marginBottom: "0" }}>
                <b>Not on Twitter?</b> You can email your MP{" "}
                <div
                  style={{
                    cursor: "pointer !important",
                    textDecoration: "underline",
                    display: "inline",
                  }}
                >
                  <a
                    href="https://palestinecampaign.eaction.online/ceasefire"
                    target="_blank"
                    style={{ cursor: "pointer !important" }}
                  >
                    using this tool from the Palestine Solidarity Campaign
                  </a>
                </div>
                .
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="landingContainer">
              {channel == "twitter" ? (
                <Tweetr
                  campaign={campaign}
                  constituency={constituency}
                  setConstituency={() => setConstituency(null)}
                  constMP={constMP}
                />
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>

      <br />
      <br />
    </>
  );
};
