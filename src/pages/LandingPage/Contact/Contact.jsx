import React, {useState} from "react";
import styles from "./Contact.module.scss";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // You can send formData to your backend here
      };
  return (
    <div className={`${styles.container} cursor-invert-effect`}>
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
          <button
            className={`button button-sm button-dot dot-hover-effect`}
            onClick={handleSubmit}
          >
            <span data-text="Send Message">Send Message</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
