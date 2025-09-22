import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({ logger: true });
await fastify.register(fastifyCors, { origin: "*" });

fastify.get("/weather", async (request, reply) => {
  try {
    const { city } = request.query;

    if (!city || !city.trim()) {
      return reply.status(400).send({ error: "City query parameter is required" });
    }

    const input = city.trim().toLowerCase();

    // Reject obvious gibberish
    if (input.length < 2 || !/^[a-z\s\-]+$/.test(input)) {
      return reply.status(404).send({ error: "City not found" });
    }

    // Geocode input
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return reply.status(404).send({ error: "City not found" });
    }

    // Only Finnish cities
    const finnishCities = geoData.results.filter(c => c.country_code === "FI");

    // Exact match or local name match
    let cityInfo = finnishCities.find(
      c =>
        c.name.toLowerCase() === input ||
        (c.local_names &&
          Object.values(c.local_names).some(n => n.toLowerCase() === input))
    );

    // fallback: first Finnish city if no exact/local match
    if (!cityInfo) cityInfo = finnishCities[0];

    // Reject if still nothing
    if (!cityInfo) {
      return reply.status(404).send({ error: "City not found" });
    }

    // Prefer Finnish or English local name
    const cityName = cityInfo.local_names?.fi || cityInfo.admin3 || cityInfo.name;

    const { latitude, longitude } = cityInfo;
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&timezone=Europe/Helsinki`
    );
    const weatherData = await weatherRes.json();

    if (!weatherData.current_weather) {
      return reply.status(500).send({ error: "Weather data unavailable" });
    }

    return reply.send({
      city: cityName,
      temperature: weatherData.current_weather.temperature,
      windspeed: weatherData.current_weather.windspeed,
      weathercode: weatherData.current_weather.weathercode,
      time: weatherData.current_weather.time,
    });
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ error: "Failed to fetch weather" });
  }
});

const port = process.env.PORT || 3000;
fastify.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening at ${address}`);
});
