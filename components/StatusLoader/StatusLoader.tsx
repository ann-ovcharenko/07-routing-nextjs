"use client";

import React from "react";
import css from "./StatusLoader.module.css";

interface StatusLoaderProps {
  message: string;
}

const StatusLoader: React.FC<StatusLoaderProps> = ({ message }) => {
  return <div className={css.loader}>{message}</div>;
};

export default StatusLoader;
