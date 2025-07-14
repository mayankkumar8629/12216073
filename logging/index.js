import fetch from "node-fetch";

const logger = async (req, res, next) => {
  try {
    await fetch("http://29.244.56.144/eva1uation-service/10gs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stack: "backend",
        level: "info",
        package: "middleware",
        message: `${req.method} ${req.originalUrl}`
      })
    });
  } catch (err) {
    console.error("Failed to send log:", err.message);
    
  }

  next();
};

export default logger;