// local-server/pushToVercel.js

async function pushToCloud(data) {
  await fetch("https://your-vercel-app.vercel.app/api/push", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((out) => console.log("Pushed:", out))
    .catch((err) => console.error("Failed:", err));
}

setInterval(() => {
  const sensorData = {
    temperature: Math.random() * 30,
    humidity: Math.random() * 100,
    time: Date.now(),
  };

  pushToCloud(sensorData);
}, 3000);
