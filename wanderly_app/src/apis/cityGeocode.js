const OPENCAGE_API_KEY =import.meta.env.VITE_OPENCAGE_API_KEY;

export const getCoordinates = async (cityName) => {
    const responce = await fetch(
       `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityName)}&key=${OPENCAGE_API_KEY}` 
    );

    if (!responce.ok) throw new Error("Failed to fetch geocode");
    const data = await responce.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found");
    }
    
    const { lat, lng } = data.results[0].geometry;
    return { latitude: lat, longitude: lng };
};