import React from 'react'

import classes from './SearchBar.module.css';
import InputField from '../../elements/InputField/InputField';
// import Button from '../../elements/Button/Button';
import { Grid, Button } from "@material-ui/core"

const searchBar = (props) => {
    return(
        <div className={classes.SearchBarWrapper}>
        <Grid container>
        <Grid item xs={3}></Grid>
            <Grid item xs={3}>
            <InputField
                type="number"
                name="zipcode"
                label="Enter Indian zipcode"
                placeholder="Zipcode" 
                value={props.value} 
                handleChange={props.onChangeHandler} 
                error={props.error} />
                </Grid>
                <Grid item xs={3}>
            <InputField
                type="number"
                name="days"
                label="Enter no of Days"
                placeholder="Days" 
                value={props.daysValue} 
                handleChange={props.onDaysChange} 
                // error={props.daysValue} 
                />
                </Grid>
            <Grid item xs={1} style={{display: "flex", alignItems: "center"}}>
            <Button 
                name="searchSubmit" 
                type="submit" 
                variant="contained"
                color="primary"
                onClick={props.onClickHandler}
                disabled={props.value.length > 0 && props.daysValue.length > 0 ? false : true}
                >Search</Button>
            </Grid>
        </Grid>
        </div>
    );
}

export default searchBar;