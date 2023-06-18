import "./contact.css";
import { useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faTwitter, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Typewriter from "typewriter-effect";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { MyContext } from "../../App";

const Contact = () => {
  const [showMessageConfirmation, setShowMessageConfirmation] = useState(false);
  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const userNameInput = useRef(null);
  const userMailInput = useRef(null);
  const userMessageInput = useRef(null);
  const messageConfirmation = useRef(null);

  const { modalIsOpen } = useContext(MyContext);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleUserMail = (e) => {
    setUserMail(e.target.value);
  };

  const handleUserMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const emailData = {
    to_name: "Nick",
    from_name: userName,
    reply_to: userMail,
    message: userMessage,
  };

  const handleRecaptchaChange = (token) => {
    token ? setIsVerified(true) : setIsVerified(false);
  };

  const handleSendMessage = () => {
    setShowMessageConfirmation(true);

    if (userName === "" || userMail === "" || userMessage === "") {
      messageConfirmation.current.innerHTML = "Please fill in required fields.";
    } else if (!userMail.includes("@")) {
      messageConfirmation.current.innerHTML = 'Your e-mail must include "@".';
    } else if (!userMail.endsWith(".com")) {
      messageConfirmation.current.innerHTML = 'Your e-mail must end with ".com".';
    } else if (isVerified === false) {
      messageConfirmation.current.innerHTML = "Please check reCaptcha.";
    } else {
      emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE,
        process.env.REACT_APP_EMAILJS_TEMPLATE,
        emailData,
        process.env.REACT_APP_EMAILJS_KEY
      );

      userNameInput.current.value = "";
      userMailInput.current.value = "";
      userMessageInput.current.value = "";
      messageConfirmation.current.innerHTML = "Message sent!";
    }
  };

  return (
    <div className="contact_container" style={{ display: modalIsOpen ? "none" : "flex" }}>
      <div className="contact_right">
        <div className="contact_form">
          <div className="contact_text">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(2500)
                  .typeString(
                    `Let's discuss how we can create your project at a competitive pricing and a timely delivery. No strings attached.`
                  )
                  .pauseFor(2000)
                  .changeDeleteSpeed(10)
                  .deleteChars(20)
                  .pauseFor(1000)
                  .typeString('<span style="color: cyan;">Maybe one.')
                  .pauseFor(1000)
                  .deleteChars(10)
                  .pauseFor(1000)
                  .typeString('<span style="color: cyan;"> Our word.</span>')
                  .pauseFor(1000)
                  .deleteChars(10)
                  .pauseFor(1000)
                  .typeString('<span style="color: cyan;"> A welldone job.</span>')
                  .start();
              }}
              options={{
                delay: 30,
                cursor: "",
              }}
            />
          </div>
          <div className="right_floating_content" style={{ marginTop: 30 }}>
            <input
              type="text"
              className="right_floating_input"
              placeholder=" "
              required
              onChange={handleUserName}
              ref={userNameInput}
              name="userNameInput"
            />
            <label className="right_floating_label">Your Name</label>
          </div>
          <div className="right_floating_content">
            <input
              type="text"
              className="right_floating_input"
              placeholder=" "
              required
              onChange={handleUserMail}
              ref={userMailInput}
              name="userMailInput"
            />
            <label className="right_floating_label">Your E-mail</label>
          </div>
          <div className="right_floating_content" style={{ height: 200 }}>
            <textarea
              type="text"
              className="right_floating_input"
              placeholder=" "
              required
              style={{ height: 200, resize: "none" }}
              onChange={handleUserMessage}
              ref={userMessageInput}
              name="userMessageInput"
            />
            <label className="right_floating_label">Your Message</label>
          </div>
          <div className="contact_send">
            <input type="file" name="file" className="right_file" />
            <div>
              <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={handleRecaptchaChange} />
            </div>
            <div>
              <button className="contact_send_button" onClick={handleSendMessage}>
                Send <FontAwesomeIcon icon={faPaperPlane} className="icon_send" />
              </button>
              <span
                ref={messageConfirmation}
                className="message_confirmation"
                style={{ display: showMessageConfirmation ? "inline" : "none" }}
              ></span>
            </div>
          </div>
        </div>
        <div className="contact_address">
          <div className="address_text">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.pauseFor(500).typeString(`Easy to find us. Just follow the <span style="color: cyan;">Eiffel.`).start();
              }}
              options={{
                delay: 30,
                cursor: "",
              }}
            />
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104881.09486118425!2d2.277020427765447!3d48.85883760918865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1553497921355"
            title="Google Maps Embed"
            className="contact_address_map"
          ></iframe>
        </div>
        <div className="rightText_container">
          <div className="right_mail">
            <FontAwesomeIcon icon={faEnvelope} style={{ color: "white", width: 20, marginRight: 5 }} />
            <span>nicolae.arhire10@gmail.com</span>
          </div>
          <div className="right_icons">
            <FontAwesomeIcon icon={faPhone} style={{ color: "white", width: 20, marginRight: 5 }} />
            <span className="right_phone">0712345678</span>
            <a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGoogle} className="icon_google" />
            </a>
            <a href="https://twitter.com/freeCodeCamp" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="icon_twitter" />
            </a>
            <a href="https://www.youtube.com/c/Freecodecamp" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} className="icon_youtube" />
            </a>
            <a href="https://www.linkedin.com/school/free-code-camp" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="icon_linkedIn" style={{ marginRight: 0 }} />
            </a>
            <a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer">
              <span className="google"></span>
            </a>
          </div>
        </div>
      </div>
      <div className="contact_left">
        <span className="left_text">Let's get in touch and create something great together.</span>
        <span className="left_icons">
          <FontAwesomeIcon icon={faPhone} style={{ color: "white", width: 20, marginRight: 5 }} />
          <span style={{ fontSize: 20, color: "white", marginRight: 15, textDecoration: "underline" }}>0712345678</span>
          <a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGoogle} className="icon_google" />
          </a>
          <a href="https://twitter.com/freeCodeCamp" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="icon_twitter" />
          </a>
          <a href="https://www.youtube.com/c/Freecodecamp" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} className="icon_youtube" />
          </a>
          <a href="https://www.linkedin.com/school/free-code-camp" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="icon_linkedIn" />
          </a>
          <a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer">
            <span className="google"></span>
          </a>
          <span style={{ fontSize: 20, color: "white", marginRight: 0, textDecoration: "underline" }}>nicolae.arhire10@gmail.com</span>
        </span>
      </div>
    </div>
  );
};

export default Contact;
