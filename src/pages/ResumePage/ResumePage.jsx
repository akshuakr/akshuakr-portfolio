import React, { useState } from "react";
import resume from "../../assets/Akshansh_Resume.pdf";
import styles from "./ResumePage.module.scss";

const ResumeViewer = () => {
  return (
    <div className={styles.container}>
      <iframe src={resume} title="Resume" className={styles.dimensions} />
    </div>
  );
};

export default ResumeViewer;
