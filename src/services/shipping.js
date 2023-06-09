const getCities = async (countryISO2) => {
  try {
    const res = await fetch(
      `https://secure.geonames.org/searchJSON?country=${countryISO2}&orderby=population&top=10&type=json&featureCode=PPL&featureCode=PPLA&featureCode=PPLC&username=${process.env.REACT_APP_API_COUNTRY_TOKEN}`
    );
    const data = await res.json();
    const cities = data.geonames.filter((city) => city.fcode === "PPL" || city.fcode === "PPLA" || city.fcode === "PPLC");
    return cities;
  } catch (error) {
    console.error(error);
  }
};

const getPoints = async (clientCity) => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${clientCity}&format=json&limit=1`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

const parisCoordinates = "2.3483915,48.8534951";

const getDistance = async (cityPoints) => {
  try {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${parisCoordinates};${cityPoints}?overview=false&geometries=geojson`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export { getCities, getPoints, getDistance };
