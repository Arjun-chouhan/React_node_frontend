import React from "react";
import { useParams } from "react-router-dom";

function Location() {
  const { region, province, city } = useParams();

  const renderLocationInfo = (label, value) => {
    if (!value) return null;
    return (
      <div className="info-item">
        <h2>{label}</h2>
        <p>{value.charAt(0).toUpperCase() + value.slice(1)}</p>
      </div>
    );
  };

  return (
    <div className="location">
      <h1>Location Details</h1>
      <div className="location-info">
        {renderLocationInfo("Region", region)}
        {renderLocationInfo("Province", province)}
        {renderLocationInfo("City", city)}
      </div>
      <div className="breadcrumb">
        <p>
          {region && `${region}`}
          {province && ` > ${province}`}
          {city && ` > ${city}`}
        </p>
      </div>
    </div>
  );
}

export default Location;
