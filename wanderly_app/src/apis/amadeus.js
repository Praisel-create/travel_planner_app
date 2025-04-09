const AMADEUS_API_KEY = import.meta.env.VITE_AMADEUS_CLIENT_ID;
const AMADEUS_API_SECRET = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

let accessToken = null;

// Helper: Get or refresh Amadeus OAuth token
const getAmadeusToken = async () => {
  if (accessToken) return accessToken;

  const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: AMADEUS_API_KEY,
      client_secret: AMADEUS_API_SECRET,
    }),
  });

  const data = await response.json();
  accessToken = data.access_token;
  return accessToken;
};

// Fetch IATA code for the city
export const getIataCode = async (cityName) => {
  const token = await getAmadeusToken();
  try {
    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${cityName}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch IATA code: ${response.status}`);
    }

    const data = await response.json();
    // Return the first IATA code found (prioritize airports over cities)
    return data.data?.[0]?.iataCode || null;
  } catch (error) {
    console.error("IATA code fetch error:", error);
    return null;
  }
};


// Fetch Points of Interest (POIs)
export const pointsOfInterest = async (lat, lon) => {
  const token = "CwvVPpBcSnyd8VfwTuMughPXkru8"; // Hardcoded token (replace with dynamic)
  const response = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${lat}&longitude=${lon}&radius=20&page[limit]=10`,
    {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`POI API error: ${errorText}`);
  }
  return response.json();
};

// Fetch activities
export const activities = async (lat, lon) => {
  const token = await getAmadeusToken();
  const response = await fetch(
    `https://test.api.amadeus.com/v1/shopping/activities?latitude=${lat}&longitude=${lon}&radius=20`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch activities");
  return response.json();
};

//Fetch flights
export const flights = async (
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  adults = 1,
  max = 10
) => {
  try {
    const token = await getAmadeusToken();

    const url = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
    url.searchParams.append("originLocationCode", originLocationCode);
    url.searchParams.append("destinationLocationCode", destinationLocationCode);
    url.searchParams.append("departureDate", departureDate);
    if (returnDate) url.searchParams.append("returnDate", returnDate); // Optional
    url.searchParams.append("adults", adults);
    url.searchParams.append("max", max);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Flight API error: ${errorText}`);
    }

    const data = await response.json();
    return { data: data.data };
  } catch (err) {
    console.error("Flight API fetch error:", err);
    return { error: err.message || "Failed to fetch flights." };
  }
};
