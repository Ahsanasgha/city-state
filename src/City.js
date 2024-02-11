import React, { useEffect, useState } from "react";
import classes from "./City.module.css";
import axios from "axios";

function City() {
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");


  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );

        if (response.data && response.data[0].Status === "Success") {
          const data = response.data[0].PostOffice[0];
          setCity(data.District);
          setState(data.State);
        } else {
          setCity("City not found");
          setState("State not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (pincode) {
      fetchData();
    } else {
      setCity("");
      setState("");
    }
  }, [pincode]);

  return (
    <div className={classes.nearCategories}>
      <div className={classes.nearestInstitute}>
        <div className={classes.statePinDetail}>
          <h1>Enter the Pincode found City and State</h1>
          <div className={classes.statePinSelector}>
            <div className={classes.pinSelectorItem}>
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                maxLength={6}
                minLength={6}
                onChange={handlePincodeChange}
                required
                className={classes.statePinDetailPin1}
              />
              <h1>City:</h1>
              <div className={classes.statePinDetailPin2}>{city}</div>
            </div>
            <h1>State:</h1>
            <div className={classes.statePinDetailPin3}>{state}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default City;
