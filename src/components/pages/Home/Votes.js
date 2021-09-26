import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Container, Box } from '@material-ui/core';

export const Votes = () =>
{
    var apiHost = 'http://3.108.52.124:4000';

    const [ votesAll, setvotesAll ] = useState([])

    useEffect(() =>
    {
        try
        {
            async function fetchData()
            {
                const request = await axios.get(apiHost + '/votesList')
                setvotesAll(request.data);
                return request;
            } fetchData()
        } catch (error)
        {
            console.log(error);
        }

    }, [])

    const counts = {};
    votesAll && votesAll.forEach(function(x, Index)
    {
        counts[ x.name ] = (counts[ x.name ] || 0) + 1;
    });
    // console.log(counts)
    var vn = counts;


    return (
        <div>
            <Container>
                <h2 style={ { color: 'orange' } }><b>contestant  votes count</b></h2>
                {
                    vn && vn ?
                        <Grid container spacing={ 2 }>
                            {/* <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                <CircularProgress />
                            </Grid> */}
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Adhi Shree" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Adhi Shree - " + vn[ "Adhi Shree" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Bindhu Priya" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Bindhu Priya - " + vn[ "Bindhu Priya" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Bornita" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Bornita - " + vn[ "Bornita" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Charishma" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Charishma - " + vn[ "Charishma" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Muskan" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Muskan - " + vn[ "Muskan" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Nanda Devi" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Nanda Devi - " + vn[ "Nanda Devi" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Neha" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Neha - " + vn[ "Neha" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Neha Gupta" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Neha Gupta - " + vn[ "Neha Gupta" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Pavithra" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Pavithra - " + vn[ "Pavithra" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Rachana" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Rachana - " + vn[ "Rachana" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Ramya" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Ramya - " + vn[ "Ramya" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Revathi" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Revathi - " + vn[ "Revathi" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Ruchitha" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Ruchitha - " + vn[ "Ruchitha" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Sandhya" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Sandhya - " + vn[ "Sandhya" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Sowmya" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Sowmya - " + vn[ "Sowmya" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Srujitha" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Srujitha - " + vn[ "Srujitha" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Supraja" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Supraja - " + vn[ "Supraja" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Swathi" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Swathi - " + vn[ "Swathi" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Tara Chowdary" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Tara Chowdary - " + vn[ "Tara Chowdary" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Vennila Kiran" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Vennila Kiran - " + vn[ "Vennila Kiran" ] } /> : <CircularProgress /> }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 } md={ 2 }>
                                { vn[ "Vijaya" ] ? <Chip size="small" style={ { padding: '10px', fontSize: '17px', background: '#c91f42', color: '#fff' } } label={ "Vijaya - " + vn[ "Vijaya" ] } /> : <CircularProgress /> }
                            </Grid>
                        </Grid>
                        : <CircularProgress />
                }

            </Container>
        </div>
    )
}
