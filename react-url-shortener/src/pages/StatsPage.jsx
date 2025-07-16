import React, { useEffect } from "react";
import { Log } from "../utils/logger";

function StatsPage() {
  useEffect(() => {
    Log("frontend", "info", "page", "StatsPage loaded");
  }, []);

  return <h2>Statistics Page (to be implemented)</h2>;
}

export default StatsPage;
