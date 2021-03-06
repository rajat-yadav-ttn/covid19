import React from "react";

import "./CountryList.css";

const CountryStat = (props) => {
  let flagUrl = "https://www.countryflags.io/" + props.code + "/flat/32.png";
  return (
    <div
      className="country_stat_container"
      style={{ background: props.isDark ? "#2e315d" : "#fff" }}
    >
      <div>
        <div className="flag_name_wrap">
          <img src={flagUrl} alt={props.name} className="flag_img" />
          <div
            className="country_name"
            style={{ color: props.isDark ? "#ccccea" : "#30313A" }}
          >
            {props.name}
          </div>
        </div>
        <div>
          <span
            className="stat"
            style={{ color: props.isDark ? "#7e83c2" : "#52586A" }}
          >
            {props.confirmed.toString().length > 3
              ? `${props.confirmed / 1000}k`
              : props.confirmed}{" "}
            Affected |{" "}
            {props.recovered.toString().length > 3
              ? `${props.recovered / 1000}k`
              : props.recovered}{" "}
            Recovered
          </span>
        </div>
      </div>
      <div>
        {props.increased ? (
          <img src={require("../Images/up-down/Up.svg")} alt="up" />
        ) : (
          <img src={require("../Images/up-down/Down.svg")} alt="down" />
        )}
      </div>
    </div>
  );
};

export default CountryStat;
