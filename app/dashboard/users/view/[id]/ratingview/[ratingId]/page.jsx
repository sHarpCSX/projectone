import React from "react";

//TODO: detailansicht weiter machen.

const RatingDetailPage = () => {
  // Überprüfe, ob das Fensterobjekt verfügbar ist (nur auf dem Client)
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const ratingDataString = urlParams.get("ratingview");

    if (ratingDataString) {
      const ratingData = JSON.parse(decodeURIComponent(ratingDataString));
    } else {
      console.log("Rating Daten nicht verfügbar");
    }
  }

  return (
    <div>
      <h2>Rating Detail Page</h2>
      <p>Rating Daten werden geladen...</p>
    </div>
  );
};

export default RatingDetailPage;
