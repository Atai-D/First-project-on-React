import React, { useEffect, useState } from "react";
import { CssBaseline, IconButton, makeStyles } from "@material-ui/core";
import { display, fontSize, fontWeight, textAlign } from "@material-ui/system";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Collapse } from "@material-ui/core";
import History from "../History/History";

const useStyles = makeStyles((theme) => ({
    root:{
        minHeight: "150vh",
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/main4.jpeg'})`,
        // backgroundColor: "#b2d1ae",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "nunito",
        // fontWeight: "900"
        [theme.breakpoints.down('mb')]:{
            flexDirection:'column',
        }
        
    },
    title:{
        color: "#fff",
        fontSize: "3rem",
        fontWeight: "bold"
    },
    container:{
        textAlign: "center",
    },
    goDown: {
        color: "#fff",
        fontSize: "4rem"
    },
    header: {
        // marginBottom: 200
    }

}))
export default function Home () {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(()=> {
        setChecked(true);
    }, []);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Collapse in={checked}
            {...(checked ? {timeout: 1000} : {})}
            collapsedHeight={50}
            >
            <div className={classes.container}>
                <div className={classes.header}>
                    <h1 className={classes.title}>Welcome to <br /> The Best <br />
                    <span className={classes.colorText}>Bishkek Blog.</span>
                    </h1>
                    <IconButton>
                        <ExpandMoreIcon className={classes.goDown}/>
                    </IconButton>
                </div>
            <History/>
            </div>
            </Collapse>
        </div>
    )
    
}
            

            

            

