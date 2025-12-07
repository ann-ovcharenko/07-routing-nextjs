import React from "react";
import css from "./StatusLoader.module.css";

const StatusLoader: React.FC = () => {
  return <div className={css.loader}>Завантаження нотаток...</div>;
};

export default StatusLoader;
