const LOG_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtcGVyYXJhc3UzMTE2QGdtYWlsLmNvbSIsImV4cCI6MTc1MjY1NzY4MCwiaWF0IjoxNzUyNjU2NzgwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzM5NzY3N2MtYzZhMi00Y2MxLTg4MzItNzM0N2M3Nzc2OGI5IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicGVyYXJhc3UgbSIsInN1YiI6IjllYjc4NDA4LTIxOTctNDVjMy05NTZjLWUyZmEzZDFhMTQzNCJ9LCJlbWFpbCI6Im1wZXJhcmFzdTMxMTZAZ21haWwuY29tIiwibmFtZSI6InBlcmFyYXN1IG0iLCJyb2xsTm8iOiIyMTIyMjIxMDAwMzMiLCJhY2Nlc3NDb2RlIjoicWd1Q2ZmIiwiY2xpZW50SUQiOiI5ZWI3ODQwOC0yMTk3LTQ1YzMtOTU2Yy1lMmZhM2QxYTE0MzQiLCJjbGllbnRTZWNyZXQiOiJablpndHdaTm5ERFB3bVFoIn0.V3L4rLygMXSBMyORp-uF7KQCYCrUfd671xGfgJzTbQk"; // use your actual token

export async function Log(stack, level, pkg, message) {
  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message
  };

  try {
    const response = await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("✅ Log sent:", result.message);
  } catch (error) {
    console.error("❌ Failed to log:", error.message);
  }
}
