import React, { useState } from "react";
import resume from "../../assets/Akshansh_Resume.pdf";
import styles from "./ResumePage.module.scss";
import Navbar from "../../components/Navbar/Navbar";

const ResumeViewer = () => {
    const initialZoom = "75";
  return (
    <div className={styles.container}>
      {/* <Navbar /> */}
      <iframe src={`${resume}#zoom=${initialZoom}`} title="Resume" className={styles.dimensions} />
    </div>
  );
};

export default ResumeViewer;
