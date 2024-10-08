// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MediaCard from "./Prayer";
import axios from "axios";
import moment from "moment";

import "moment/dist/locale/ar-dz";
moment.locale("ar");

function MainContent() {
  // STATES
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  const [timings, setTimings] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Sunset: "18:03",
    Isha: "19:33",
  });

  const [remainingTime, setRemainingTime] = useState("");

  const [selectedCity, setSelectedCity] = useState({
    displayName: "القدس",
    apiName: "Jerusalem",
  });

  const [today, setToday] = useState("");

  const avilableCities = [
    {
      displayName: "القدس",
      apiName: "Jerusalem",
    },
    {
      displayName: "غزة",
      apiName: "Gaza",
    },
    {
      displayName: "طولكرم",
      apiName: "tulkarm",
    },
  ];

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  const getTimings = async () => {
    console.log("calling the api");
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=PS&city=${selectedCity.apiName}`
    );
    setTimings(response.data.data.timings);
  };
  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupCountdownTimer = () => {
    const momentNow = moment();

    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    setNextPrayerIndex(prayerIndex);

    // now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDiffernce = midnightDiff + fajrToMidnightDiff;

      remainingTime = totalDiffernce;
    }

    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
    );
  };
  const handleCityChange = (event) => {
    const cityObject = avilableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    console.log("the new value is ", event.target.value);
    setSelectedCity(cityObject);
    console.log(cityObject);
  };

  return (
    <>
      {/* --------------- top row----------------- */}

      <Box className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between mt-2 ">
        <Box>
          <Typography className="text-white " style={{ fontSize: "16px" }}>
            {today}
          </Typography>
          <Typography
            className="text-white  "
            style={{ fontSize: "32px", fontWeight: "bolder" }}
          >
            {selectedCity.displayName}
          </Typography>
        </Box>
        <Box>
          <Typography className="text-white " style={{ fontSize: "16px" }}>
            متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}
          </Typography>
          <Typography
            className="text-white "
            style={{ fontSize: "32px", fontWeight: "bolder" }}
          >
            {remainingTime}
          </Typography>
        </Box>
      </Box>
      {/* --------------- top row----------------- */}

      <Divider style={{ borderColor: "white", opacity: ".1" }} />

      {/* ---------------------Prayers Card ---------------- */}
      <Stack
        direction={"row"}
        useFlexGap
        className="justify-around mt-5 flex-wrap gap-3 "
      >
        {" "}
        <MediaCard
          name={"الفجر"}
          time={timings.Fajr}
          prayerimage={
            "https://media.gettyimages.com/id/977673876/photo/sun-rise.jpg?s=612x612&w=0&k=20&c=5ZXbycmY9JsOLt9jkDIkW43CjFBabFiRXNrRanZJxgg="
          }
        />
        <MediaCard
          name={"الظهر"}
          time={timings.Dhuhr}
          prayerimage={
            "https://media.gettyimages.com/id/1697202522/photo/scenic-view-of-al-rahma-mosque-during-sunset-jeddah-kingdom-of-saudi-arabia-middle-east-asia.jpg?s=612x612&w=0&k=20&c=9wewV8ss0r3zgzuzfpkV-S-YSQQg1_3ktIpZ1D3l_Ss="
          }
        />
        <MediaCard
          name={"العصر"}
          time={timings.Asr}
          prayerimage={
            "https://media.gettyimages.com/id/1697217846/photo/scenic-view-of-al-rahma-mosque-during-sunset-jeddah-kingdom-of-saudi-arabia-middle-east-asia.jpg?s=612x612&w=0&k=20&c=42zrjOB2JU4TkZwDA9CGpLW4iwmhk6kFyYejZXw7lnc="
          }
        />
        <MediaCard
          name={"المغرب"}
          time={timings.Sunset}
          prayerimage={
            "https://media.gettyimages.com/id/981740546/photo/reflection-on-water-surface-of-beautiful-mosque.jpg?s=612x612&w=0&k=20&c=UY3bKLKqOZZufI-uY6Al_yOmXSW7S9tkxQnyYlTAWzQ="
          }
        />
        <MediaCard
          name={"العشاء"}
          time={timings.Isha}
          prayerimage={
            "https://media.gettyimages.com/id/995354306/photo/a-prayer-in-sea.jpg?s=612x612&w=0&k=20&c=DGvwE9Czbzaw-jCF_0dYyT9e8tKLJAZnlG2i_9Egug8="
          }
        />
      </Stack>
      {/* ---------------------Prayers Card ---------------- */}

      {/* --------------------- SELECT CITY ---------------- */}
      <Stack direction={"row"} className="justify-center mt-6">
        <FormControl
          style={{
            width: isSmallScreen ? "50%" : "20%",
          }}
        >
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <Select
            style={{
              color: "white",
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleCityChange}
            value={selectedCity.apiName}
          >
            {avilableCities.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* --------------------- SELECT CITY ---------------- */}
    </>
  );
}
export default MainContent;
