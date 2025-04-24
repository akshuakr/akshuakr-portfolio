import React, { useState } from "react";
import styles from "./Contact.module.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear messages while typing again
    setSuccess(false);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uuid = localStorage.getItem("uuid");

    const payload = {
      uuid,
      ...formData,
    };

    try {
      // const baseUrl = "http://localhost:8000";
      const baseUrl = "https://api.akshuakr.com";
      const response = await fetch(`${baseUrl}/api/v1/contact/save-contact-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form successfully submitted:", result);

        setSuccess(true);
        setError(false);

        // Clear form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        // Optionally reset form or show success message
      } else {
        const error = await response.json();
        console.error("Error submitting form:", error);

        setSuccess(false);
        setError(true);
      }
    } catch (error) {
      console.error("Network or server error:", error);

      setSuccess(false);
      setError(true);
    }
  };
  return (
    <div id="contact" className={`${styles.container} cursor-invert-effect`}>
      <div className={styles.left}>
        <div className={styles.sectionIntro}>Contact</div>
        <div className={styles.sectionHeading}>
          Let's <span className={styles.sectionHeadingGradient}>Talk</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.contactDetails}>
          <div className={styles.emailContainer}>
            <h6 className={styles.detailsTitle}>Email</h6>
            <h3 className={styles.detailsInfo}>akr.akshansh@gmail.com</h3>
          </div>

          <div className={styles.phoneContainer}>
            <h6 className={styles.detailsTitle}>Call</h6>
            <h3 className={styles.detailsInfo}>+91&nbsp;9992981775</h3>
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.nameAndEmailInputs}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.nameAndEmailClass} dot-hover-effect`}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.nameAndEmailClass} dot-hover-effect`}
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`${styles.generalInput} dot-hover-effect`}
          />
          <textarea
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`${styles.generalInput} dot-hover-effect`}
          ></textarea>
        </div>

        <div className={styles.formButton}>
          <button className={`button button-sm button-dot dot-hover-effect`} onClick={handleSubmit}>
            <span data-text="Send Message">Send Message</span>
          </button>
        </div>

        {success && (
          <div className={styles.successMessage}>Thank you! Your Message has been sent.</div>
        )}
        {error && (
          <div className={styles.errorMessage}>Something went wrong, Please try again!</div>
        )}
      </div>
    </div>
  );
};

export default Contact;
