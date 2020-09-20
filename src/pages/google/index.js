import React, { useContext } from "react";
import { AppContext } from "../../App";
import GoogleImage from "./googleimage.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  makeStyles,
  Container,
  Card,
  Box,
  Typography,
  Button,
  Grid,
  Link,
  useTheme,
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(2),
    padding: "4em",
  },
  margintopx: {},
  cardborder: {
    borderRadius: theme.spacing(1),
  },
  cardbordersm: {
    border: "none",
  },
  bodypadding: {
    marginTop: "4em",
  },
  bodypaddingsm: {
    marginTop: "2em",
  },
  mt: {
    marginTop: theme.spacing(1),
  },
  mt2: {
    marginTop: theme.spacing(2),
    position: "fixed",
    bottom: "0",
  },
  mt22: {
    marginTop: theme.spacing(2),
  },
  spacing: {
    flexGrow: 1,
  },
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Homepage(props) {
  const classes = useStyles();
  const { loading } = useContext(AppContext);
  const preventDefault = (event) => event.preventDefault();

  return (
    <React.Fragment>
      {loading.loading ? <LinearProgress color="primary" /> : null}

      <Container
        maxWidth="sm"
        className={
          useMediaQuery(useTheme().breakpoints.up("sm"))
            ? classes.margintop
            : classes.margintopx
        }
      >
        <Card
          variant="outlined"
          className={
            useMediaQuery(useTheme().breakpoints.up("sm"))
              ? classes.cardborder
              : classes.cardbordersm
          }
        >
          <Box
            className={
              useMediaQuery(useTheme().breakpoints.up("sm"))
                ? classes.bodypadding
                : classes.bodypaddingsm
            }
          >
            <GoogleImage />
            {props.children}
          </Box>
        </Card>
        <Box
          display="flex"
          justifyContent="center"
          className={
            useMediaQuery(useTheme().breakpoints.up("sm"))
              ? classes.mt22
              : classes.mt2
          }
        >
          <Box>
            <Typography variant="caption">English (United States)</Typography>
            <Button startIcon={<ArrowDropDownIcon />} />
          </Box>
          <span className={classes.spacing} />
          <Box>
            <Typography variant="caption" className={classes.root}>
              {[
                { name: "Help", link: "Help" },
                { name: "Privacy", link: "privacy" },
                { name: "Terms", link: "terms" },
              ].map((lnk, index) => (
                <Link
                  key={index}
                  href="#"
                  onClick={preventDefault}
                  color="inherit"
                >
                  {lnk.name}
                </Link>
              ))}
            </Typography>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Homepage;
