import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "../Image/1685451507690.jpg";
import styles from "./City.module.css";

function City() {
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>City and State Lookup</h1>
        <p>Enter a valid 6-digit PIN code to find the corresponding city and state.</p>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter PIN code"
          value={pincode}
          maxLength={6}
          onChange={handlePincodeChange}
          className={styles.input}
        />
        {loading && <p className={styles.loading}>Loading...</p>}
      </div>
      <div className={styles.resultContainer}>
        <div className={styles.result}>
          <h2>City</h2>
          <p>{city || "-"}</p>
        </div>
        <div className={styles.result}>
          <h2>State</h2>
          <p>{state || "-"}</p>
        </div>
      </div>
      <img
        className={styles.img}
        src={Image}
        alt="Decorative"
      />
    </div>
  );
}

export default City;