import React, { useState, useEffect } from 'react';
// import Navbar from '../Navbar/Navbar';
import
{
    packages as packImg, Vizag_Celebrities, Hello_Vizag, hcg, MVwelogo, Pobyt,
    SMS, Foxeylogo, SilverSandsLogo, logo, Ashoklogo, Jewelpark, MVS_Varna_Logo, Rizzle, Thumderbolt, SweetIndia, Sandy,
    Prosalon, Elza
} from '../../images/Images';
// import Footer from '../footer/Footer';
import { Grid, Container, Box } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import { FaRegHeart, FaRupeeSign } from "react-icons/fa";
import './dop.css';
// import defaultImg from '../../assets/defalt_image.jpg'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
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
        height: 200,
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
function Home()
{
    const classes = useStyles();
    const [ contest, setContest ] = useState([])
    const [ vote, setVote ] = useState([])
    const [ VotesCount, setVotesCount ] = useState([])
    // const [ packageDet, setPackageDet ] = useState([])
    const [ open, setOpen ] = React.useState(false);
    // const [ open2, setOpen2 ] = React.useState(false);
    const [ scroll, setScroll ] = React.useState('paper');
    // const [ expanded, setExpanded ] = React.useState(false);
    // const [ snackbar, setSnackbar ] = React.useState(false);
    // const [ transition, setTransition ] = React.useState(undefined);
    let history = useHistory();
    const user = JSON.parse(localStorage.getItem('custsess'));

    const handleClickOpen = (event) => () =>
    {
        // console.log(event)
        if (user)
        {
            if (VotesCount?.votes > 9)
            {
                swal("your 10 votes are completed", " ", "success").then(function()
                {
                    window.location.reload();
                });
            } else
            {
                voting(event)
            }

        } else
        {
            setOpen(true);
        }


    };
    // console.log(packageDet);
    const handleClose = () =>
    {
        setOpen(false);
    };






    const voting = (values) =>
    {
        // console.log(values)
        values.addvotes = 1;
        values.userId = user && user?.id;

        const votes = (values.votes ? values.votes : 0) + 1;
        // console.log(votes)
        axios.patch(apiHost + '/contest/' + values?.id, { votes })
            .then((response) =>
            {
                try
                {
                    async function fetchData()
                    {
                        const request = await axios.post(apiHost + '/vote', values)
                        if (request.data)
                        {
                            setVote(request.data);
                            swal("Thank you for Vote", " ", "success").then(function()
                            {
                                window.location.reload();
                            });
                        }
                        return request;
                    } fetchData()
                } catch (error)
                {
                    console.log(error);
                }
            })
            .catch((error) => console.log(error))


    };

    useEffect(() =>
    {
        try
        {
            async function fetchData()
            {
                const request = await axios.get(apiHost + '/celebrity')
                setContest(request.data);
                return request;
            } fetchData()
        } catch (error)
        {
            console.log(error);
        }

    }, [])
    useEffect(() =>
    {
        try
        {
            async function fetchData()
            {
                const request = await axios.get(apiHost + '/votesCount/' + user?.id)
                setVotesCount(request.data[ 0 ]);
                return request;
            } fetchData()
        } catch (error)
        {
            console.log(error);
        }

    }, [])


    // console.log(contest)
    // console.log(VotesCount)

    // const { packageId } = useParams();
    // console.log(packageId)

    const initialValues = {
        name: '' || '',
        mobile: '' || '',
        email: '' || '',
    }

    const onSubmit = values =>
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

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!'),
        mobile: Yup.string().required('Number is required!'),
        email: Yup.string().required('email is required!'),
    })

    return (
        <div className="bgcolor">
            <LandingAppBar />
            <div className="Banner2020">
                <img src={ packImg } />
            </div>
            <div className="LPRL_Des" style={ { background: "black", color: "white" } }>
                <Container >

                    <Typography style={ { background: "black", color: "white" } }><br />
                        <span style={ { color: 'orange' } } >  Miss Vizag 2021</span><br />
                        “Miss Vizag” Beauty Pageant Contest is one of its kind beauty pageant. Miss Vizag provides opportunities to aspiring girls who dream of establishing a career in the field of modeling and film industries as Actors. With several youngsters entering the modeling arena, beauty pageants now are just not confined to exhibiting the glamour facets. It involves toning the body, mind, and soul within.<br />
                        This spectacular platform is being provided & organized by Ajay Agarwal, CEO of Creative Plus Entertainment Network. This year Miss Vizag is focusing on showcasing the traditional beauty of Vizag girls, highlighting and enhancing them through the intricate beauty of South Indian garments.<br /><br />
                        <span style={ { color: 'orange' } } >Social Media Queen</span><br />

                        Social Media Queen is a crown awarded to the participant who bagged the highest number of votes. The voting parameters are based on :<br />
                        1. How active/updated the participant is on Social Media(Instagram/ Facebook)<br />
                        2.How well the participant is following the trends (reels/posts/stories)<br />
                        3.How well the participant is presenting herself on social media<br /><br />
                        <span style={ { color: 'orange' } } > Rules for Voting</span><br />
                        1.Voting should be carried out through the link.<br />
                        2.Each person can vote upto 10 times.<br />
                        3.The voting should be made considering the above parameters.<br />

                    </Typography>

                </Container>
            </div>

            <div className="dopSection">
                <Container>
                    <h2 style={ { color: 'white' } }><b>vote your favourite contestant</b> - <span style={ { color: 'orange' } } >(Remaining votes - { 10 - parseInt(VotesCount.votes) })  <Button variant="contained" color="secondary" onClick={ () => { history.push('/ticketNew') } } style={ { marginLefy: '20px' } }>Book Your seat</Button></span></h2>
                    <Grid container spacing={ 2 }>


                        {
                            contest && contest.map(cont => (
                                <Grid item xs={ 6 } sm={ 6 } md={ 2 } key={ cont?.id }>
                                    <div className="dopBlock">
                                        <Card className={ classes.root } >

                                            <CardActionArea>
                                                <CardMedia
                                                    className={ classes.media }
                                                    image={ cont?.image ? apiHost + "/img/getFile/" + cont?.image : apiHost + "/img/getFile/Mv_Logo_Final_white.png" }
                                                    title="Contemplative Reptile"
                                                />
                                                <div className="dopBlock_btn02">
                                                    <button type="button" className='btn_dop'  >{ cont?.votes ? cont?.votes : '0' } votes</button>
                                                </div>

                                                <div className="dopBlock_btn03">
                                                    <button type="button" className='btn_dop toplevel' onClick={ handleClickOpen(cont) } > Vote</button>
                                                </div>

                                                <CardContent>
                                                    <div className="dopInfo13 ">
                                                        <h4 className="hide1">{ cont?.name }  </h4>

                                                    </div>

                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                </Grid>
                            ))
                        }

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
                            <h5>SignUp</h5>
                        </DialogTitle>
                        <DialogContent dividers>
                            {/* <div className="dopInfoImage"><img src={ service2 } /></div> */ }
                            <div className="LPSection">
                                <Container maxWidth="md">

                                    <Formik
                                        initialValues={ initialValues }
                                        onSubmit={ onSubmit }
                                        validationSchema={ validationSchema }
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




                </Container><br /><br />


                <Container>
                    <h2 style={ { color: 'white' } }><b>our sponsors</b></h2>
                    <Grid container spacing={ 2 }>
                        {/* <Grid item xs={ 6 } sm={ 6 } md={ 2 }>
                            <img src={ SilverSandsLogo } className="lLogo_2021" alt="" />
                        </Grid> */}
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
                        {/* <div className="CampFooter_01">
                            <MdEmail />
                            <span>info@vizagcelebrities.in</span><br />
                            <img src={ MVS_Varna_Logo } className="lLogo_2021" alt="" />
                        </div> */}
                        {/* <div className="CampFooter_01">
                            <FaPhoneAlt />
                            <span>+91 9346 69 29 15</span>
                        </div> */}
                        {/* <div className="CampFooter_01">
                            <div className="campFooterSocialLinks">
                                <a href="https://www.facebook.com/vizagcelebritiesss" target="_blank"><FaFacebookF className="FaFacebookF" /></a>
                                <a href="https://twitter.com/Vizagcelebritis" target="_blank"><FaTwitter className="FaTwitter" /></a>
                                <a href="https://www.instagram.com/vizagcelebritiess/" target="_blank"><FaInstagram className="FaInstagram" /></a>
                                <a href="https://www.youtube.com/channel/UCnHZ-b3RHHTKmqP_FnMXnSg" target="_blank"><FaYoutube className="FaYoutube" /></a>
                                <a href="https://www.linkedin.com/company/vizagcelebrity" target="_blank"><FaLinkedin className="FaLinkedin" /></a>
                            </div>
                        </div> */}
                    </div>
                    <div className="Camp2021">
                        Copyright @Vizag Celebrities
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Home
