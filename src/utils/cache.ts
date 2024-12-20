import NodeCache from "node-cache";
import dotenv from "dotenv";

dotenv.config();

const ttl = parseInt(process.env.CACHE_TTL || "300", 10);

const cache = new NodeCache({ stdTTL: ttl });

export const getCachedData = (key: string) => {
  const data = cache.get(key);

  if (data) {
    console.log(`Cache hit for key: ${key}`);
  } else {
    console.log(`Cache miss for key: ${key}`);
  }

  return data;
};

export const setCachedData = (key: string, value: any) => {
  cache.set(key, value);
  console.log(
    `Setting cache for key: ${key} with value: ${JSON.stringify(value)}`
  );
};
