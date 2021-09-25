import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
// import { Typography, Container } from '@material-ui/core';
import { Vizag_Celebrities, logo } from '../../images/Images';
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
// import Typography from '@material-ui/core/Typography';

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
  // const [ expanded, setExpanded ] = React.useState(false);
  // const [ snackbar, setSnackbar ] = React.useState(false);
  // const [ transition, setTransition ] = React.useState(undefined);


  const handleClickOpen = () =>
  {
    setOpen(true);

  };
  const handleClose = () =>
  {
    setOpen(false);
  };




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

  return (
    <div className={ classes.root } >
      <AppBar position="static" className="LAB_BG" >
        <Container>
          <Toolbar >
            <Typography>
              <Link to="/"><img src={ Vizag_Celebrities } className="lLogo_2021" alt="" /></Link>
              {/* <Link to="/"><img src={ logo } className="lLogo_2021 imgHideMob" alt="" /></Link> */ }
              {
                user && user ?
                  <div className="dopBlock_btn03 dopBlock_btnmob">
                    <span className="usename"> <p style={ { color: 'white', right: '0' } }>{ user?.name }</p></span>
                    <button type="button" className='btn_dop' style={ { marginLeft: '20px' } } onClick={ logout }> Logout</button><br />

                  </div>
                  :
                  <div className="dopBlock_btn03">
                    <button type="button" className='btn_dop' onClick={ handleClickOpen }> Login</button>
                  </div>
              }


            </Typography>
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
