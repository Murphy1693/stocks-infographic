import io from "socket.io-client";

const client = io(`wss://ws.finnhub.io?token=${process.env.FINNHUB_API_KEY}`);

client.on("connect", () => {
  console.log('connected Finnhub')
})

export default client;