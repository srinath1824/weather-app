import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import assetMapping from "../../assets/assetMapping.json";
import ErrorNotice from "../../components/ErrorNotice/ErrorNotice";
import Header from "../../components/Header/Header";
import Preview from "../../components/Preview/Preview";
import SearchBar from "../../components/SearchBar/SearchBar";
import WeatherDetails from "../../components/WeatherDetails/WeatherDetails";
import Card from "../../elements/Card/Card";
import classes from "./App.module.css";

function App() {
  const [searchBarInput, setSearchBarInput] = useState("");
  const [forecastList, setForecastList] = useState([]);
  const [cityName, setCityName] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [weatherDetails, setWeatherDetails] = useState({
    temperature: null,
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchBarHandler = (e) => {
    setSearchBarInput(e.target.value);
  };

  const tryAgainHandler = () => {
    setSearchBarInput("");
    setWeatherDetails({});
    setError(false);
  };

  // Fetch weather information and update state
  const setWeather = () => {
    const zipcode = searchBarInput;
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const API_URL = "https://api.openweathermap.org/data/2.5/forecast";
    const URL = API_URL + `?zip=${zipcode},in&appid=${API_KEY}&units=metric`;
    setWeatherDetails({});
    setForecastList([]);
    setLoading(true);
    setError(false);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod == 200) {
          setCityName(data.city.name);
          let list = [];
          data.list.map((d) => {
            list.push({
              temperature: d.main.temp,
              description: d.weather[0].main,
              date: d.dt_txt,
              feelsLike: d.main.feels_like,
              humidity: d.main.humidity,
              windSpeed: d.wind.speed,
            });
          });
          setForecastList(list);
          setLoading(false);
        } else {
          // If zipcode doesn't exist, throw error
          throw data.cod;
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  };

  let cardContent = <Preview />;
  if (loading) {
    cardContent = <PulseLoader />;
  } else if (error) {
    cardContent = <ErrorNotice onClickHandler={tryAgainHandler} />;
  } else if (forecastList.length > 0 && noOfDays) {
    cardContent = (
      <WeatherDetails data={forecastList} cityName={cityName} days={noOfDays} />
    );
  }

  return (
    <div className={classes.AppWrapper}>
      <Header
        color={
          assetMapping.colors[error ? "error" : weatherDetails.description]
        }
        onClickHandler={tryAgainHandler}
      />
      <main className={classes.AppMain}>
        <SearchBar
          value={searchBarInput}
          daysValue={noOfDays}
          onChangeHandler={searchBarHandler}
          onDaysChange={(e) => setNoOfDays(e.target.value)}
          onClickHandler={setWeather}
          error={error}
        />
        {searchBarInput && cityName && <h1>City: {cityName}</h1>}
        <Card>
          <Grid container spacing={10}>
            {cardContent}
          </Grid>
        </Card>
      </main>
      {/* <Footer onClickHandler={this.tryAgainHandler} /> */}
    </div>
  );
}

export default App;
