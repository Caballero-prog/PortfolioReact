import "./Contact.css";
import ContactImg from "../assets/Connect.svg";

const Contact = () => {
  return (
    <div className="contact-background">
      <article className="contact-container">
        <h2 className="contact-title">
          Let's connect<b className="dot">.</b>
        </h2>
        <div className="contact-image">
          <img src={ContactImg} alt="Connect" />
        </div>
        <p className="contact-description">
          Feel free to reach out for <b>collaborations</b>, <b>inquiries</b>, or
          potential <b>job opportunities</b>. I'm always open to connecting with{" "}
          <b>recruiters</b> and <b>professionals</b> for exciting{" "}
          <b>projects</b> or career advancements.
        </p>
      </article>
    </div>
  );
};
export default Contact;