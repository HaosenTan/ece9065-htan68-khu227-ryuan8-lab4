// reference: https://github.com/mui/material-ui/tree/v5.10.14/docs/data/material/getting-started/templates/sign-up

import React, { useState } from 'react';
import validator from 'validator';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { register } from '../actions/auth';
import { useNavigate, NavLink } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Net '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [confirmPassErr, setConfirmPassErr] = useState('');
  const [pass, setPass] = useState('');
  const [checked, setChecked] = useState(false);
  const [checkedErr, setCheckedErr] = useState('');

  const handleNameChange = e => {
    if (!e.currentTarget.value) {
      setNameErr('empty!');
    }
    else {
      setNameErr('');
    }
  }

  const handleEmailChange = e => {
    const email = e.currentTarget.value;
    if (validator.isEmail(email)) {
      setEmailErr('');
    }
    else {
      setEmailErr('invalid email');
    }
  };

  const handlePassChange = e => {
    const pass = e.currentTarget.value;
    if (!pass) {
      setPassErr('empty!')
    }
    setPass(pass);
  };

  const handleConfirmPassChange = e => {
    const confirmPass = e.currentTarget.value;
    if (!confirmPass) {
      setConfirmPassErr('empty!');
    }
    if (confirmPass == pass) {
      setConfirmPassErr('');
    }
    else {
      setConfirmPassErr('not correct')
    }
  };

  const handleCheck = event => {
    const checked = event.target.checked;
    setChecked(checked);
    if(checked){
      setCheckedErr('');
    }
    else{
      setCheckedErr('please confirm to sign up!');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('userName'),
      email: data.get('email'),
      password: data.get('password'),
      confirmPass: data.get('confirmpassword')
    });
    let ret = false;
    if (!data.get('userName')) {
      setNameErr('empty!');
      ret = true;
    }
    if (!data.get('email')) {
      setEmailErr('empty!');
      ret = true;
    }
    if (!data.get('password')) {
      setPassErr('empty!');
      ret = true;
    }
    if (!data.get('confirmpassword')) {
      setConfirmPassErr('empty!');
      ret = true;
    }
    if (!checked) {
      setCheckedErr('please confirm to sign up!');
      ret = true;
    }
    if (ret) {
      return;
    }
    else {
      dispatch(register(data.get('userName'), data.get('email'), data.get('password'))).then(
        () => {
          navigate('/verify');
        }
      )
        .catch(err => {
          console.log(err);
        });
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  helperText={nameErr}
                  error={nameErr}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={emailErr}
                  error={emailErr}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText={passErr}
                  error={passErr}
                  onChange={handlePassChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  // autoComplete="new-password"
                  helperText={confirmPassErr}
                  error={confirmPassErr}
                  onChange={handleConfirmPassChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Checkbox required onChange={handleCheck} /> Confirm&nbsp;
                <NavLink to='/agreement'>
                  Terms & Conditions agreement
                </NavLink>
                {checkedErr &&
                  <Typography variant="body2" sx={{ color: 'red' }}>
                    {checkedErr}
                  </Typography>
                }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}