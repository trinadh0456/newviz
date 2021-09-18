import { Box, Breadcrumbs, Container, Grid, Typography } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react'
// import { img5 } from '../images/Images';
// import LandingAppBar from './LandingAppBar';
import { MdEmail } from 'react-icons/md';
import { Link } from "react-router-dom";
// import { Multiselect } from 'multiselect-react-dropdown'
import
{
    packages as packImg, logo, Vizag_Celebrities, ticketbanner, back
} from '../../images/Images';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
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
import "./campaign.css";
import LandingAppBar from './LandingAppBar';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';

// import apiHost from '../../baseUrl';
// import defaultImg from '../../assets/defalt_image.jpg';

// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { productSingleById } from '../../redux/actions/productAction';
// import { addOrderDetails } from '../../redux/actions/orderAction';
// import Helmet from 'react-helmet';
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

var apiHost = 'http://3.108.52.124:4000'
function ProductCampaign()
{
    const [ scroll, setScroll ] = React.useState('paper');
    const [ price, setPrice ] = useState([]);
    const [ comboName, setComboName ] = useState([]);
    const [ ticketCount, setTicketCount ] = useState([]);
    const [ quantity, setQuantity ] = useState([]);
    const [ open, setOpen ] = React.useState(false);
    const [ open2, setOpen2 ] = React.useState(false);


    const handleClickOpen2 = () =>
    {
        setOpen2(true);

    };
    const handleClose2 = () =>
    {
        setOpen2(false);
    };
    const handleClickOpen = () =>
    {
        setOpen(true);

    };
    const handleClose = () =>
    {
        setOpen(false);
    };
    const user = JSON.parse(localStorage.getItem('custsess'));

    useEffect(() =>
    {
        axios.get(apiHost + '/TicketCount')
            .then((response) =>
            {
                if (response.data)
                {
                    // console.log(response.data[ 0 ])
                    setTicketCount(response.data[ 0 ])

                }
            })
            .catch((error) => console.log(error))
    }, [])
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
    const initialValues1 = {
        mobile: '' || '',
    }
    const initialValues = {
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        city: '',

    }
    const validationSchema = Yup.object({
        firstName: Yup.string().required('FirstName is required!'),
        lastName: Yup.string().required('LastName is required!'),
        // quantity: Yup.string().required('Quantity is required!'),
        // deliveryCharge: Yup.string().required('Please Select City'),
        // productName: Yup.string().required('Please Select Product'),

    })

    const onSubmit1 = values =>
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
    const validationSchema1 = Yup.object({
        mobile: Yup.string().required('Please enter register number!'),
    })
    const onSubmit = values =>
    {
        // alert(JSON.stringify(values))
        var tid = "MV2021_0" + ticketCount?.ticketCount
        // console.log(tid);
        if (user)
        {
            if (counter > 0)
            {
                const values = user && user;
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
                    values.tamount = tamount;
                    values.tickets = counter;
                    values.ticketId = tid;
                    values.userId = user?.id;
                    const options = {
                        key: "rzp_live_wMHeTky4q53jIu", // Enter the Key ID generated from the Dashboard
                        amount: amount.toString(),
                        name: "Miss Vizag",
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
                            values.payment = data;
                            if (response)
                            {
                                axios.post(apiHost + '/ticket', values)
                                    .then((resp) =>
                                    {
                                        if (resp.data)
                                        {

                                            swal("Success", "Thank you for  Purchase . ", "success").then(function()
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
                            name: values?.firstName + values?.lastName,
                            email: values?.email,
                            contact: values?.mobile,
                        },
                        notes: {
                            address: values?.city,
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
                swal("", "Add Tickets. ", "error")
            }
        } else
        {
            handleClickOpen()
        }

    }
    const servicesList = (event) =>
    {
        const price = event.target[ event.target.selectedIndex ].getAttribute('data-price');
        const comboQuantity = event.target[ event.target.selectedIndex ].getAttribute('data-quantity');
        setComboName(event.target.value);
        setQuantity(comboQuantity);
        setPrice(price);
        // console.log(price);

    }
    // console.log(comboName);
    const [ options ] = useState();
    const [ counter, setcounter ] = useState(0)

    const handleIncrement = () =>
    {
        setcounter(counter + 1)
    };

    const handleDecrement = () =>
    {
        setcounter(counter - 1)
    };
    const displayCounter = counter > 0;
    // console.log(counter)


    return (
        <div>



            <LandingAppBar />

            <div className="LImg_2021">
                {/* <img src={ img5 } /> */ }
                <img src={ ticketbanner } style={ { height: '20% !important' } } alt="" />
            </div>
            <div className="LPRL_Des" style={ { background: "black", color: "white" } }>
                <Container >

                    <Typography style={ { background: "black", color: "white" } }><br />
                        <span style={ { color: 'orange' } }>About Miss Vizag</span><br />
                        “Miss Vizag 2021” the most-awaited beauty pageant in the city is all set for its launch. The event will be organized by Creative Plus Entertainment Network. It is the most popular event that provides opportunities for young talent in the field of modeling while it can also help a few to start their career in the movie industry.<br /><br />
                        <span style={ { color: 'orange' } }> Moto of our Pageant Show</span><br />
                        “The main motto of the event is Beauty for a cause and this event will provide a great opportunity for all the women aged between 18 to 25. We are providing all the constants with an opportunity to prove themselves. The event will be organized in a healthy environment keeping in mind the health of everybody.”<br /><br />
                        <span style={ { color: 'orange' } }>  The following are the Subtitles for the Miss Vizag 2021</span><br />
                        <ul>
                            <li> Miss Vizag 2021 Miss Vizag</li>
                            <li>1st Runner Up 2021Miss Vizag</li>
                            <li> Miss Vizag Beautiful eyes 2021</li>
                            <li>Miss Vizag Beautiful Hair 201</li>
                            <li>Miss Vizag Beautiful Smile 2021</li>
                            <li>  Miss Vizag Glowing Skin 2021</li>
                            <li>  Miss Vizag Glamorous Look 2021</li>
                            <li>  Miss Vizag Goodness Ambassador 2021</li>
                            <li>  Miss Vizag Ramp Walk 2021</li>
                            <li>  Miss Vizag Popularity 2021</li>
                            <li>  Miss Vizag Fashion Icon 2021</li>
                            <li>  Miss Vizag Social media Queen 2021</li>

                        </ul>
                        <br />
                        A total of 30 candidates will be participating in the Miss Vizag 2021 title. Each and every round will be updated by us shortly. The finale will be taking place in three different rounds which include,  an introduction round, a ramp walk, and a Q&A round. The final winners will be awarded the Miss Vizag 2021 title along with the crown and gift hampers.
                    </Typography>

                </Container>
            </div>
            <div className="LPSection">
                <Container maxWidth="md">

                    <Formik initialValues={
                        initialValues }
                        validationSchema={ validationSchema }
                        onSubmit={ onSubmit }
                    >
                        <Form>
                            <Grid container spacing={ 5 }>
                                <Grid item xs={ 12 } sm={ 12 } md={ 12 }>
                                    <div className="LPRL_2365">
                                        {/* <h2>Price : <span className="price_color">₹​ { product?.amount && product?.amount } </span></h2> */ }
                                        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                                            {/* <Link color="inherit" to="/event_services">
                                                Home
                                            </Link> */}
                                            <Typography color="textPrimary"><span className="activeLink" style={ { color: 'white', fontSize: '40px' } } > Add  Tickets</span></Typography>
                                            <div className="dopInfo13 ">
                                                {/* <h4 className="hide1">{ cont?.name }  </h4> */ }
                                                <ButtonGroup size="small" aria-label="small outlined button group">
                                                    <Button variant="contained" color="secondary" onClick={ handleIncrement }>+</Button>
                                                    { displayCounter && <Button variant="contained" color="primary" >{ counter }</Button> }
                                                    { displayCounter && <Button variant="contained" color="secondary" onClick={ handleDecrement }>-</Button> }
                                                </ButtonGroup>

                                                {/* <Button variant="contained" color="secondary" >Book Ticket Now</Button> */ }

                                            </div>


                                        </Breadcrumbs>

                                    </div>
                                    <Grid container spacing={ 1 }>
                                        <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
                                            <Field type="text" id="firstName" name="firstName" placeholder="First Name" className="formControl01" />
                                            <ErrorMessage name='firstName' />
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
                                            <Field type="text" id="lastName" name="lastName" placeholder="Last Name" className="formControl01" />
                                            <ErrorMessage name='lastName' />
                                        </Grid>

                                        <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
                                            <Field type="number" id="mobile" name="mobile" placeholder="Mobile" className="formControl01" />

                                        </Grid>

                                        <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
                                            <Field type="email" id="email" name="email" placeholder="Email" className="formControl01" />
                                        </Grid>

                                        <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
                                            <Field type="text" id="city" name="city" placeholder="City" className="formControl01" />
                                        </Grid>




                                    </Grid>

                                    <Box mt={ 1 }>
                                        <button type="submit" className="btn btn-common" >Book Now</button>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Form>
                    </Formik>

                </Container>
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
                                    initialValues={ initialValues1 }
                                    onSubmit={ onSubmit1 }
                                    validationSchema={ validationSchema1 }
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
            <hr />
            <div className="CampFooter">
                <Container>
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 12 } sm={ 12 } md={ 4 }>
                            <div className="CampFooter_01">
                                <span>Ticketing Partner</span>
                            </div><br />
                            <img src={ Vizag_Celebrities } className="lLogo_2021" alt="" />
                        </Grid>


                        <Grid item xs={ 12 } sm={ 12 } md={ 4 }>
                            <div className="CampFooter_01">
                                <span>Concent & Event By</span>
                            </div><br />
                            <img src={ logo } className="lLogo_2021" style={ { objectFit: 'contain ', height: '100px' } } alt="" />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 4 }>
                            <div className="CampFooter_01">
                                <span>Contact</span><br />
                                <span>Email:info@vizagcelebrities.in</span><br />
                                <span>Contact: 093466 92915, 09701228909</span><br />
                                <div className="campFooterSocialLinks">
                                    <a href="https://www.facebook.com/vizagcelebritiesss" target="_blank"><FaFacebookF className="FaFacebookF" /></a>
                                    <a href="https://twitter.com/Vizagcelebritis" target="_blank"><FaTwitter className="FaTwitter" /></a>
                                    <a href="https://www.instagram.com/vizagcelebritiess/" target="_blank"><FaInstagram className="FaInstagram" /></a>
                                    {/* <a href="https://in.pinterest.com/eventneedzkdspl" target="_blank"><FaPinterest className="FaPinterest" /></a> */ }
                                    <a href="https://www.youtube.com/channel/UCnHZ-b3RHHTKmqP_FnMXnSg" target="_blank"><FaYoutube className="FaYoutube" /></a>
                                    <a href="https://www.linkedin.com/company/vizagcelebrity" target="_blank"><FaLinkedin className="FaLinkedin" /></a>
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </Container>
                <Container>
                    <div className="CampFooterBlock">

                    </div>
                    <div className="Camp2021">
                        Copyright @Vizag Celebrities
                    </div>
                </Container>
            </div>



        </div >
    )
}

export default ProductCampaign
