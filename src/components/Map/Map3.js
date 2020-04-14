import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  // Sphere,
  // Graticule,
  ZoomableGroup
} from "react-simple-maps";

import './Map2.css';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/vulnerability.csv`).then(data => {
      setData(data);
    });}, []);

    console.log(data);
    
    return (
      <div className='map_container'>
      <ComposableMap
        projectionConfig={{
          rotate: [-30, 0, 0],
          scale:186
        }}
      >
        {data.length > 0 && (
          <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const d = data.find(s => s.ISO3 === geo.properties.ISO_A3);
                return (
                  <div>
                    {console.log(geographies)}
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["1996"]) : "#F5F4F6"}
                  />
                  </div>
                  );
            })
          }
        </Geographies>
        </ZoomableGroup>
      )}
    </ComposableMap>
    </div>
  );
};

export default MapChart;