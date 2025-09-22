import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import dotenv from "dotnev";

dotenv.config();

const fastify = Fastify({ logger: true });
await fastify.register(fastifyCors, { origin: "*" });

fastify.get("/weather", async (request, reply) => {
  try {
    const { city } = request.query;
    console.log("Incoming city:", city);

    if (!city || !city.trim()) {
      console.log("No city provided");
      return reply.status(400).send({ error: "City query parameter is required" });
    }

    const input = city.trim().toLowerCase();
    console.log("Input after trim:", input);

    // Reject obvious gibberish
    if (input.length < 2 || !/^[a-z\s\-]+$/.test(input)) {
      console.log("Rejected gibberish input");
      return reply.status(404).send({ error: "City not found" });
    }

    // Geocode input
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
    );
    const geoData = await geoRes.json();
    console.log("Geocoding results:", geoData);

    if (!geoData.results || geoData.results.length === 0) {
      console.log("No geocoding results found");
      return reply.status(404).send({ error: "City not found" });
    }

    // Only accept exact matches or local names
    const cityInfo = geoData.results.find(
      (c) =>
        c.name.toLowerCase() === input ||
        (c.local_names && Object.values(c.local_names).some((n) => n.toLowerCase() === input))
    );

    if (!cityInfo) {
      console.log("No exact or local match found, rejecting input");
      return reply.status(404).send({ error: "City not found" });
    }

    console.log("Final cityInfo:", cityInfo);

    const { latitude, longitude, name } = cityInfo;
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&timezone=Europe/Helsinki`
    );
    const weatherData = await weatherRes.json();

    if (!weatherData.current_weather) {
      console.log("Weather data unavailable after geocoding");
      return reply.status(500).send({ error: "Weather data unavailable" });
    }

    console.log("Weather data:", weatherData);

    return reply.send({
      city: name,
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
