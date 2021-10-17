import { useState } from "react";
import { useHistory } from "react-router";
import Tags from "../Tags/Tags";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./EditProfileModal.css";
import { baseUrl } from "../../utils/constants";
import { notifyError } from "../../utils/notifyToasts";
import { getUser } from "../../utils/auth";

const user = getUser();

const EditProfileModal = ({ open, handleClose }) => {
  const history = useHistory();
  const [pic, setPic] = useState(null);
  const [cover, setCover] = useState(null);
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [skills, setSkills] = useState([]);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const editProfile = async (e) => {
    e.preventDefault();

    const submitData = {
      pic,
      cover,
      bio,
      city,
      country,
      skills,
      github,
      linkedin,
      twitter,
      portfolio,
    };

    // upload profile pic
    if (pic && typeof pic !== "string") {
      const formData = new FormData();
      formData.append("image", pic);

      try {
        const res = await fetch(`${baseUrl}/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          submitData.pic = data.imageUrl;
        } else {
          notifyError("Failed to upload profile picture");
        }
      } catch (err) {
        notifyError("Failed to upload profile picture");
        return;
      }
    }

    // upload cover pic
    if (cover && typeof cover !== "string") {
      const formData = new FormData();
      formData.append("image", cover);

      try {
        const res = await fetch(`${baseUrl}/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          submitData.cover = data.imageUrl;
        } else {
          notifyError("Failed to upload cover picture");
        }
      } catch (err) {
        notifyError("Failed to upload cover picture");
        return;
      }
    }

    // edit/update profile
    try {
      const res = await fetch(`${baseUrl}/profile/${user.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(submitData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        handleClose();
        history.push(`/profile/${user.username}`);
      } else {
        notifyError(data.message);
      }
    } catch (err) {
      notifyError("Failed to update profile");
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Edit Profile
          {handleClose ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers>
          <label htmlFor="profile-pic">Profile Picture</label>
          <br />
          <input
            type="file"
            id="profile-pic"
            style={{ marginTop: "0.5rem" }}
            onChange={(e) => {
              if (e.target.files.length) {
                setPic(e.target.files[0]);
              }
            }}
          />
          <br />
          <br />
          <label htmlFor="cover-pic">Header Image</label>
          <br />
          <input
            type="file"
            id="cover-pic"
            style={{ marginTop: "0.5rem" }}
            onChange={(e) => {
              if (e.target.files.length) {
                setCover(e.target.files[0]);
              }
            }}
          />
          <br />
          <br />
          <OutlinedInput
            placeholder="Bio"
            multiline
            minRows="1"
            style={{
              marginTop: "0.5rem",
            }}
            className="full-width-input"
            onChange={(e) => setBio(e.target.value)}
          />
          <br />
          <br />
          <OutlinedInput
            placeholder="City"
            sx={{ width: "49%", marginRight: "2px" }}
            onChange={(e) => setCity(e.target.value)}
          />
          &nbsp; &nbsp;
          <OutlinedInput
            placeholder="Country"
            sx={{ width: "48%" }}
            onChange={(e) => setCountry(e.target.value)}
          />
          <br />
          <br />
          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={skills}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          /> */}
          <Tags setSkills={setSkills} />
          <br />
          <OutlinedInput
            placeholder="Github"
            className="full-width-input"
            onChange={(e) => setGithub(e.target.value)}
          />
          <br />
          <br />
          <OutlinedInput
            placeholder="LinkedIn"
            className="full-width-input"
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <br />
          <br />
          <OutlinedInput
            placeholder="Twitter"
            className="full-width-input"
            onChange={(e) => setTwitter(e.target.value)}
          />
          <br />
          <br />
          <OutlinedInput
            placeholder="Portfolio website"
            className="full-width-input"
            onChange={(e) => setPortfolio(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="error"
            variant="contained"
            disableElevation
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            size="small"
            variant="contained"
            disableElevation
            onClick={(e) => {
              editProfile(e);
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfileModal;