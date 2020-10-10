import React from 'react';

import classes from './WeatherDetails.module.css';
import Icon from '../../elements/Icon/Icon';
import Temperature from './Temperature/Temperature';
import Description from './Description/Description';
import Date from './Date/Date';
import {Grid} from "@material-ui/core";
import moment from "moment";

const weatherDetails = (props) => {
    let weatherData = props.data.map(a => { 
        let x = {...a}
        x.date = moment(x.date).calendar();
        return x;
    });
    let days = ["Today","Tomorrow","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let filteredDaysData = [];
    days.map(data => {
        let x = [];
        x = weatherData.filter(d => d.date.includes(data) && d);
        filteredDaysData.push({day: data, data: x})
    });
    let result = props.days && filteredDaysData.slice(0,props.days).map(d => {
        return d.data.map(a => {
            return(
                <div className={classes.WeatherDetailsWrapper}>
                    <Grid item>
                    <div className={classes.WeatherIconWrapper}>
                        <Date date={a.date}/>
                        <Icon type={a.description} />    
                    </div>
                    <div className={classes.WeatherDataWrapper}>
                        <Temperature degrees={a.temperature} />
                        <Description data={a}/>
                    </div>
                </Grid>
                </div>
            );
        })
    })
    return result;
}

export default weatherDetails;