import React, { useState, useEffect } from 'react';
// import Navbar from '../Navbar/Navbar';
import
{
    packages as packImg, Vizag_Celebrities, Hello_Vizag, hcg, MVwelogo, Pobyt,
    SMS, Foxeylogo, SilverSandsLogo, Ashoklogo, Jewelpark, MVS_Varna_Logo, Rizzle, Thumderbolt, SweetIndia, Sandy,
    Prosalon, Elza, ticket
} from '../../images/Images';
// import Footer from '../footer/Footer';
import { Grid, Container, Box } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
// import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// import { FaRegHeart, FaRupeeSign } from "react-icons/fa";
import './dop.css';
// import defaultImg from '../../assets/defalt_image.jpg'
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import Slide from '@material-ui/core/Slide';
// import clsx from 'clsx';
import LandingAppBar from './LandingAppBar';
import { MdEmail } from 'react-icons/md';
import
{
    FaFacebookF,
    FaTwitter,
    FaYoutube,
    FaInstagram,
    FaPinterest,
    FaLinkedin,
    FaPhoneAlt,
} from "react-icons/fa";

import axios from 'axios';
import swal from 'sweetalert';
import * as Yup from 'yup';
const useStyles = makeStyles({
    media: {
        height: 500,
    },
});

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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);



// var apiHost = 'http://localhost:4000'
var apiHost = 'http://3.108.52.124:4000'
function Ticket()
{
    const classes = useStyles();
    const [ contest, setContest ] = useState([])
    const [ counter, setcounter ] = useState(0)
    const [ vote, setVote ] = useState([])
    const [ VotesCount, setVotesCount ] = useState([])
    // const [ packageDet, setPackageDet ] = useState([])
    const [ open, setOpen ] = React.useState(false);
    // const [ open2, setOpen2 ] = React.useState(false);
    const [ scroll, setScroll ] = React.useState('paper');
    // const [ expanded, setExpanded ] = React.useState(false);
    // const [ snackbar, setSnackbar ] = React.useState(false);
    // const [ transition, setTransition ] = React.useState(undefined);

    const user = JSON.parse(localStorage.getItem('custsess'));

    const handleClickOpen = () =>
    {
        setOpen(true);

    };
    const handleClose = () =>
    {
        setOpen(false);
    };

    function loadScript(src)
    {
        return new Promise((resolve) =>
        {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () =>
            {
                resolve(true);
            };
            script.onerror = () =>
            {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const bookTicket = () =>
    {
        if (user)
        {
            const orderDet = user && user;
            displayRazorpay();
            async function displayRazorpay()
            {
                const res = await loadScript(
                    "https://checkout.razorpay.com/v1/checkout.js"
                );

                if (!res)
                {
                    alert("Razorpay SDK failed to load. Are you online?");
                    return;
                }
                const tamount = 800 * parseInt(counter)
                const amount = tamount * 100;
                orderDet.tamount = tamount;
                orderDet.tickets = counter;
                const options = {
                    key: "rzp_live_wMHeTky4q53jIu", // Enter the Key ID generated from the Dashboard
                    amount: amount.toString(),
                    name: "VizagCelebrities",
                    description: "New Transaction",
                    image: '',

                    handler: async function(response)
                    {
                        const data = {
                            // orderCreationId: order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                        };
                        // console.log(response);
                        orderDet.payment = data;
                        if (response)
                        {
                            axios.post(apiHost + '/ticket', orderDet)
                                .then((resp) =>
                                {
                                    if (resp.data)
                                    {

                                        swal("Success", "Thank you for your Purchase . ", "success").then(function()
                                        {
                                            window.location.reload();
                                        });
                                    } else
                                    {
                                        swal("Error", "Something Wrong Please try again. ", "error")
                                    }


                                })
                                .catch((err) => console.log(err))

                        }

                    },




                    prefill: {
                        name: user?.name,
                        email: user?.email,
                        contact: user?.mobile,
                    },
                    notes: {
                        address: "vizag",
                    },
                    theme: {
                        color: "#61dafb",
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            }
        } else
        {
            handleClickOpen()
        }


    }


    const handleIncrement = () =>
    {
        setcounter(counter + 1)
    };

    const handleDecrement = () =>
    {
        setcounter(counter - 1)
    };
    console.log(counter)



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
                    console.log(response.data[ 0 ].Vizagcelebrities)
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




    const displayCounter = counter > 0;
    return (
        <div className="bgcolor">
            <LandingAppBar />


            <div className="dopSection">
                <Container>
                    <Grid container spacing={ 2 }>

                        <Grid item xs={ 12 } sm={ 12 } md={ 6 } >
                            <div className="dopBlock" style={ { textAlign: 'center' } }>
                                <Card className={ classes.root } >

                                    <CardActionArea>
                                        <CardMedia
                                            className={ classes.media }
                                            image={ ticket }
                                            title="Contemplative Reptile"
                                            style={ { objectFit: 'contain', textAlign: 'center' } }
                                        />

                                        <CardContent>
                                            <div className="dopInfo13 ">
                                                {/* <h4 className="hide1">{ cont?.name }  </h4> */ }
                                                <ButtonGroup size="small" aria-label="small outlined button group">
                                                    <Button onClick={ handleIncrement }>+</Button>
                                                    { displayCounter && <Button disabled>{ counter }</Button> }
                                                    { displayCounter && <Button onClick={ handleDecrement }>-</Button> }
                                                </ButtonGroup>

                                                <Button variant="contained" color="secondary" onClick={ bookTicket }>Book Ticket Now</Button>

                                            </div>

                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </Grid>


                    </Grid>


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


                </Container><br /><br />


                <Container>
                    <h2 style={ { color: 'white' } }><b>our sponsors</b></h2>
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ SilverSandsLogo } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ Pobyt } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ Rizzle } className="lLogo_2021" alt="" />
                        </Grid>

                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ MVS_Varna_Logo } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ Vizag_Celebrities } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ Hello_Vizag } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ SweetIndia } className="lLogo_2021" style={ { objectFit: 'contain' } } alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ Jewelpark } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ Ashoklogo } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ SMS } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ hcg } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ Thumderbolt } style={ { objectFit: 'contain ' } } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ MVwelogo } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ Foxeylogo } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ Sandy } style={ { objectFit: 'contain ' } } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ Elza } className="lLogo_2021" alt="" />
                        </Grid>
                        <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ Prosalon } className="lLogo_2021" alt="" />
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <hr />
            <div className="CampFooter">
                <Container>
                    <div className="CampFooterBlock">
                        <div className="CampFooter_01">
                            <MdEmail />
                            <span>info@vizagcelebrities.in</span>
                        </div>
                        <div className="CampFooter_01">
                            <FaPhoneAlt />
                            <span>+91 9346 69 29 15</span>
                        </div>
                        <div className="CampFooter_01">
                            <div className="campFooterSocialLinks">
                                <a href="https://www.facebook.com/vizagcelebritiesss" target="_blank"><FaFacebookF className="FaFacebookF" /></a>
                                <a href="https://twitter.com/Vizagcelebritis" target="_blank"><FaTwitter className="FaTwitter" /></a>
                                <a href="https://www.instagram.com/vizagcelebritiess/" target="_blank"><FaInstagram className="FaInstagram" /></a>
                                {/* <a href="https://in.pinterest.com/eventneedzkdspl" target="_blank"><FaPinterest className="FaPinterest" /></a> */ }
                                <a href="https://www.youtube.com/channel/UCnHZ-b3RHHTKmqP_FnMXnSg" target="_blank"><FaYoutube className="FaYoutube" /></a>
                                <a href="https://www.linkedin.com/company/vizagcelebrity" target="_blank"><FaLinkedin className="FaLinkedin" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="Camp2021">
                        Copyright @Vizag Celebrities
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Ticket
