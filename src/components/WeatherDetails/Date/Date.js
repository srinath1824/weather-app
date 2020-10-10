import React from 'react';

import dateformat from 'dateformat';

import classes from './Date.module.css';

const date = (props) => {
    return(
        <div className={classes.DateWrapper}>
            {props.date} 
        </div>
    );
}

export default date;