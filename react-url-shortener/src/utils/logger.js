const LOG_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcmFrYXNobWF0aGkyMDA0QGdtYWlsLmNvbSIsImV4cCI6MTc1MjY1NzY0OSwiaWF0IjoxNzUyNjU2NzQ5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjE3OTZhMGMtOTQzMi00M2RmLTk4MDItOTQ1NmFmZWVlOWIxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJha2FzaCBtIiwic3ViIjoiMzVjZjk0NGItYzc5OS00YWM1LWI2ZmUtNWViMjJkMTg3NDIxIn0sImVtYWlsIjoicHJha2FzaG1hdGhpMjAwNEBnbWFpbC5jb20iLCJuYW1lIjoicHJha2FzaCBtIiwicm9sbE5vIjoiMjEyMjIyMTAwMDM1IiwiYWNjZXNzQ29kZSI6InFndUNmZiIsImNsaWVudElEIjoiMzVjZjk0NGItYzc5OS00YWM1LWI2ZmUtNWViMjJkMTg3NDIxIiwiY2xpZW50U2VjcmV0IjoicG5tUGFmdXlGYWh5anl2RCJ9.GPzeV64F31ZmTWuM4tvI6LVXnMjxuovtNiCp3IWL4RI"; 

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
