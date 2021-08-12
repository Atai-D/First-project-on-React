import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import ImageCard from './ImageCard';


const useStyles = makeStyles((theme) => ({
    root1: {
        height: "100vh",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        // [theme.breakpoints.down('mb')]:{
        //     flexDirection:'column',
        // }

        
    },
}))

export default function () {
    const classes = useStyles();
    return (
        <div className={classes.root1}>
            <ImageCard />
        </div>
    );
};
