import React from 'react';

import classes from './Description.module.css';

const description = (props) => {
    return(
        <div>
        <div className={classes.DescriptionWrapper}>
            <strong>{props.data.description}</strong>
        </div>
        <div className={classes.DescriptionWrapper}>
        <span className={classes.Description}>Feels Like:</span> {props.data.feelsLike}
        </div>
        <div className={classes.DescriptionWrapper}>
        <span className={classes.Description}>Humidity:</span> {props.data.humidity}
        </div>
        <div className={classes.DescriptionWrapper}>
        <span className={classes.Description}>Wind Speed:</span> {props.data.windSpeed}
        </div>
        </div>
    );
}

export default description;