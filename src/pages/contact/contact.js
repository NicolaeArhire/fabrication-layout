import "./contact.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faTwitter, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Typewriter from "typewriter-effect";

const Cart = () => {
  const [isclicked, setIsClicked] = useState(false);

  const leftTextRef = useRef(null);

  const iconsRef = useRef(null);
  const rightEmailRef = useRef(null);
  const rightIconsRef = useRef(null);
  const rightPanelInput1Ref = useRef(null);
  const rightPanelInput2Ref = useRef(null);
  const rightPanelInput3Ref = useRef(null);
  const rightPanelButtonRef = useRef(null);

  const photoNo = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          leftTextRef.current.classList.add("animate");
          iconsRef.current.classList.add("animate");
        } else {
          leftTextRef.current.classList.remove("animate");
          iconsRef.current.classList.remove("animate");
        }
      });
    });

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          rightPanelInput1Ref.current.classList.add("animate");
          rightPanelInput2Ref.current.classList.add("animate");
          rightPanelInput3Ref.current.classList.add("animate");
          rightPanelButtonRef.current.classList.add("animate");
        } else {
          rightPanelInput1Ref.current.classList.remove("animate");
          rightPanelInput2Ref.current.classList.remove("animate");
          rightPanelInput3Ref.current.classList.remove("animate");
          rightPanelButtonRef.current.classList.remove("animate");
        }
      });
    });

    const observer3 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          rightEmailRef.current.classList.add("animate");
          rightIconsRef.current.classList.add("animate");
        } else {
          rightEmailRef.current.classList.remove("animate");
          rightIconsRef.current.classList.remove("animate");
        }
      });
    });

    observer.observe(leftTextRef.current);
    observer.observe(iconsRef.current);
    observer2.observe(rightPanelInput1Ref.current);
    observer2.observe(rightPanelInput2Ref.current);
    observer2.observe(rightPanelInput3Ref.current);
    observer2.observe(rightPanelButtonRef.current);
    observer3.observe(rightEmailRef.current);
    observer3.observe(rightIconsRef.current);

    return () => {
      observer.disconnect();
      observer2.disconnect();
      observer3.disconnect();
    };
  }, []);

  const handlePhotoClick = () => {
    setIsClicked(!isclicked);
  };

  const handleSendMessage = () => {
    alert("Sorry. We don't accept messages from ugly people.");
  };

  return (
    <div className="contact_container">
      <div className="contact_left">
        {photoNo.map((item, index) => (
          <div
            key={index}
            className={`photo ${item} ${isclicked ? "arrow" : ""} ${item === "one" ? "first" : ""} ${item === "ten" ? "last" : ""}`}
            onClick={handlePhotoClick}
          ></div>
        ))}
        <div className="leftText_container">
          <span ref={leftTextRef} className="left_text">
            Let's get in touch and create something great together.
          </span>
          <span ref={iconsRef} className="left_icons">
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
      <div className="contact_right">
        <div className="contact_text">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pauseFor(2500)
                .typeString(
                  `<span>LET'S DISCUSS HOW WE CAN CREATE YOUR PROJECT AT A COMPETITIVE PRICING AND A TIMELY DELIVERY.</span><br /><span style="color: rgba(20, 65, 77, 0.8);">.</span>NO STRINGS ATTACHED.`
                )
                .pauseFor(2000)
                .changeDeleteSpeed(10)
                .deleteChars(20)
                .pauseFor(1000)
                .typeString('<span style="color: cyan;">MAYBE ONE.</span>')
                .pauseFor(1000)
                .deleteChars(10)
                .pauseFor(1000)
                .typeString('<span style="color: cyan;"> OUR WORD.</span>')
                .pauseFor(1000)
                .deleteChars(10)
                .pauseFor(1000)
                .typeString('<span style="color: cyan;"> A WELLDONE JOB.</span>')
                .start();
            }}
            options={{
              delay: 30,
              cursor: "",
            }}
          />
        </div>
        <div className="right_floating_content" ref={rightPanelInput1Ref} style={{ marginTop: 10 }}>
          <input type="text" className="right_floating_input" placeholder=" " required />
          <label className="right_floating_label">Your Name</label>
        </div>
        <div className="right_floating_content" ref={rightPanelInput2Ref}>
          <input type="text" className="right_floating_input" placeholder=" " required />
          <label className="right_floating_label">Your E-mail</label>
        </div>
        <div className="right_floating_content" ref={rightPanelInput3Ref} style={{ height: 100 }}>
          <textarea type="text" className="right_floating_input" placeholder=" " required style={{ height: 100, resize: "none" }} />
          <label className="right_floating_label">Your Message</label>
        </div>
        <div className="contact_send">
          <button className="contact_send_button" ref={rightPanelButtonRef} onClick={handleSendMessage}>
            Send <FontAwesomeIcon icon={faPaperPlane} className="icon_send" />
          </button>
        </div>
        <div className="rightText_container">
          <div ref={rightEmailRef} className="right_mail">
            <FontAwesomeIcon icon={faEnvelope} style={{ color: "white", width: 20, marginRight: 5 }} />
            <span>nicolae.arhire10@gmail.com</span>
          </div>
          <div ref={rightIconsRef} className="right_icons">
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
        <div className="contact_address">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104881.09486118425!2d2.277020427765447!3d48.85883760918865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1553497921355"
            title="Google Maps Embed"
            className="contact_address_map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Cart;
