import React from "react";
import StatusLoader from "../components/StatusLoader/StatusLoader";

export default function Loading() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <StatusLoader />
    </div>
  );
}
