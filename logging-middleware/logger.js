
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const LOG_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

async function Log(stack, level, pkg, message) {
  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message
  };

  try {
    const response = await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("✅ Log sent:", result.message);
  } catch (error) {
    console.error("❌ Failed to log:", error.message);
  }
}

module.exports = { Log };
