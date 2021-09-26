import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
// import { Typography, Container } from '@material-ui/core';
import { Vizag_Celebrities, logo, MvLogoFinal } from '../../images/Images';
import { Link } from "react-router-dom";
import "./dop.css";
// import Button from '@material-ui/core/Button';
import { Grid, Typography, Container, Box } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import * as Yup from 'yup';
import swal from 'sweetalert';
// import
// {
//   FaFacebookF,
//   FaTwitter,
//   FaYoutube,
//   FaInstagram,
//   FaPinterest,
//   FaLinkedin,
//   FaPhoneAlt,
// } from "react-icons/fa";
// import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  media: {
    height: 200,
  },
  root2: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


var apiHost = 'http://3.108.52.124:4000'
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[ 500 ],
  },
  expand: {
    transform: 'rotate(0deg)',
  },
  replyBtn: {
    border: '0',
    padding: '8px 12px',
    color: '#fff',
    backgroundColor: '#414d21',
  },
});
const Transition = React.forwardRef(function Transition(props, ref)
{
  return <Slide direction="up" ref={ ref } { ...props } />;
});
const DialogTitle = withStyles(styles)((props) =>
{
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={ classes.root } { ...other }>
      <Typography variant="h6">{ children }</Typography>
      { onClose ? (
        <IconButton aria-label="close" className={ classes.closeButton } onClick={ onClose }>
          <CloseIcon />
        </IconButton>
      ) : null }
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);
export default function LandingAppBar()
{
  const classes = useStyles();
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem('custsess'));

  const logout = () =>
  {
    window.localStorage.clear();
    window.location.reload()
    //\ history.push('/');
    // handleMenuClose5()
  }
  const [ scroll, setScroll ] = React.useState('paper');
  const [ open, setOpen ] = React.useState(false);
  const [ open2, setOpen2 ] = React.useState(false);
  const [ open3, setOpen3 ] = React.useState(false);
  const [ tickets, setTickets ] = useState([])
  // const [ expanded, setExpanded ] = React.useState(false);
  // const [ snackbar, setSnackbar ] = React.useState(false);
  // const [ transition, setTransition ] = React.useState(undefined);



  console.log(tickets);
  const handleClickOpen = () =>
  {
    setOpen(true);

  };
  const handleClickOpen2 = () =>
  {
    if (tickets.length > 0)
    {
      setOpen2(true);
    } else
    {
      swal("", "your tickets are empty Book now", "error")
    }


  };
  const handleClickOpen3 = () =>
  {

    setOpen3(true);

  };
  const handleClickOpen4 = () =>
  {

    swal("", "Your Tickets are empty", "error")

  };
  const handleClose = () =>
  {
    setOpen(false);
  };
  const handleClose2 = () =>
  {
    setOpen2(false);
  };
  const handleClose3 = () =>
  {
    setOpen3(false);
  };

  useEffect(() =>
  {
    axios.get(apiHost + '/tickets/all/' + user?.id)
      .then((response) =>
      {
        if (response.data)
        {
          console.log(response.data)
          setTickets(response.data)

        }
      })
      .catch((error) => console.log(error))
  }, [])


  const initialValues2 = {
    name: '' || '',
    mobile: '' || '',
    email: '' || '',
  }

  const onSubmit2 = values =>
  {
    // alert(JSON.stringify(values))

    // values.service = checkedItems;
    // values.type = "event";
    // dispatch(addCategory(values))
    axios.post(apiHost + '/user', values)
      .then((response) =>
      {
        if (response.status === 201)
        {
          let customer_data = response.data;
          localStorage.setItem('custsess', JSON.stringify(customer_data));
          window.location.reload();
        } else if (response.status == 409)
        {
          alert(response.message)
        }
      })
      .catch((error) => console.log(error))
  };

  const validationSchema2 = Yup.object({
    name: Yup.string().required('Name is required!'),
    mobile: Yup.string().required('Number is required!'),
    email: Yup.string().required('email is required!'),
  })

  const initialValues = {
    mobile: '' || '',
  }
  const onSubmit = values =>
  {


    axios.get(apiHost + '/userlogin/' + values?.mobile)
      .then((response) =>
      {
        if (response.data)
        {
          // console.log(response.data[ 0 ].Vizagcelebrities)
          let customer_data = response.data[ 0 ].Vizagcelebrities;
          localStorage.setItem('custsess', JSON.stringify(customer_data));
          window.location.reload();
        }
      })
      .catch((error) => console.log(error))
  };
  const validationSchema = Yup.object({
    mobile: Yup.string().required('Please enter register number!'),
  })


  // useEffect(() =>
  // {
  //   console.log(user?.id);
  //   async function fetchData()
  //   {
  //     const request = await axios.get(` http://3.108.52.124:4000/tickets/ ` + user && user?.id)
  //     setTickets(request?.data)
  //     return request;
  //   }
  //   fetchData()
  // }, [])

  return (
    <div className={ classes.root } >
      <AppBar position="static" className="LAB_BG" >
        <Container>
          <Toolbar >
            <Typography>
              <Link to="/"><img src={ Vizag_Celebrities } className="lLogo_2021" alt="" /></Link>
              {
                user && user ?
                  <div className="dopBlock_btn03 dopBlock_btnmob">
                    {/* <span className="usename"> <p style={ { color: 'white', right: '0' } }>{ user?.name }</p></span> */ }
                    <button type="button" className='btn_dop' style={ { marginLeft: '20px' } } onClick={ handleClickOpen2 }> View Ticket</button><br />
                    <button type="button" className='btn_dop' style={ { marginLeft: '20px' } } onClick={ logout }> Logout</button><br />

                  </div>
                  :
                  <div className="dopBlock_btn03">
                    <button type="button" className='btn_dop' onClick={ handleClickOpen }> Login</button>
                  </div>
              }


            </Typography>
            {/* <div className="campFooterSocialLinks" >
              <a href="https://www.facebook.com/vizagcelebritiesss" target="_blank"><FaFacebookF className="FaFacebookF" /></a>
              <a href="https://twitter.com/Vizagcelebritis" target="_blank"><FaTwitter className="FaTwitter" /></a>
              <a href="https://www.instagram.com/vizagcelebritiess/" target="_blank"><FaInstagram className="FaInstagram" /></a>
              <a href="https://www.youtube.com/channel/UCnHZ-b3RHHTKmqP_FnMXnSg" target="_blank"><FaYoutube className="FaYoutube" /></a>
              <a href="https://www.linkedin.com/company/vizagcelebrity" target="_blank"><FaLinkedin className="FaLinkedin" /></a>
            </div> */}
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        TransitionComponent={ Transition }
        keepMounted
        onClose={ handleClose }
        scroll={ scroll }
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        open={ open }
      >
        <DialogTitle id="scroll-dialog-title" onClose={ handleClose }>
          <h5>Login</h5>
        </DialogTitle>
        <DialogContent dividers>
          {/* <div className="dopInfoImage"><img src={ service2 } /></div> */ }
          <div className="LPSection">
            <Container maxWidth="md">

              <Formik
                initialValues={ initialValues }
                onSubmit={ onSubmit }
              >
                <Form>
                  <Grid container spacing={ 5 }>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 }>

                      <Grid container spacing={ 1 }>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 }>
                          <Field type="mobile" id="mobile" name="mobile" placeholder="Mobile" className="formControl01" />
                          <ErrorMessage name='mobile' />
                        </Grid>
                      </Grid>
                      <Box mt={ 1 }>
                        <button type="submit" className="btn btn-common">Login</button>
                        <button type="submit" className="btn btn-common" style={ { marginLeft: '10px' } } onClick={ handleClickOpen3 }>SignUp</button>
                      </Box>
                    </Grid>

                  </Grid>
                </Form>
              </Formik>

            </Container>
          </div>
        </DialogContent>

      </Dialog>
      <Dialog
        TransitionComponent={ Transition }
        keepMounted
        onClose={ handleClose }
        scroll={ scroll }
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        open={ open2 }
      >
        <DialogTitle id="scroll-dialog-title" onClose={ handleClose2 }>
          <h5>Tickets</h5>
        </DialogTitle>
        <DialogContent dividers>
          {/* <div className="dopInfoImage"><img src={ service2 } /></div> */ }
          <div className="LPSection">
            <Container maxWidth="md">

              {
                tickets && tickets.map(t => (
                  <Card className={ classes.root2 } key={ t?.id }>
                    <CardMedia
                      className={ classes.cover }
                      style={ { objectFit: 'contain', border: '1px solid black' } }
                      image={ MvLogoFinal }
                      title="Live from space album cover"
                    />
                    <div className={ classes.details }>
                      <CardContent className={ classes.content }>
                        <Typography component="h5" variant="h5">
                          { t?.ticketId }
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          { t?.name }
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Tickets - { t?.tickets }
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Date - 26/09/2021
                        </Typography>
                      </CardContent>

                    </div>
                  </Card>
                ))
              }


            </Container>
          </div>
        </DialogContent>

      </Dialog>
      <Dialog
        TransitionComponent={ Transition }
        keepMounted
        onClose={ handleClose3 }
        scroll={ scroll }
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        open={ open3 }
      >
        <DialogTitle id="scroll-dialog-title" onClose={ handleClose3 }>
          <h5>SignUp</h5>
        </DialogTitle>
        <DialogContent dividers>
          {/* <div className="dopInfoImage"><img src={ service2 } /></div> */ }
          <div className="LPSection">
            <Container maxWidth="md">

              <Formik
                initialValues={ initialValues2 }
                onSubmit={ onSubmit2 }
                validationSchema={ validationSchema2 }
              >
                <Form>
                  <Grid container spacing={ 5 }>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 }>

                      <Grid container spacing={ 1 }>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 }>
                          <Field type="text" id="name" name="name" placeholder=" Name" className="formControl01" />
                          <ErrorMessage name='name' />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 }>
                          <Field type="mobile" id="mobile" name="mobile" placeholder="Mobile" className="formControl01" />
                          <ErrorMessage name='mobile' />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 }>
                          <Field type="email" id="email" name="email" placeholder="Email" className="formControl01" />
                          <ErrorMessage name='email' />
                        </Grid>
                      </Grid>
                      <Box mt={ 1 }>
                        <button type="submit" className="btn btn-common">Submit</button>
                      </Box>
                    </Grid>

                  </Grid>
                </Form>
              </Formik>

            </Container>
          </div>
        </DialogContent>

      </Dialog>
    </div>
  );
}
