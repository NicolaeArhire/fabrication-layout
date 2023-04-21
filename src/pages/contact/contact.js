import "./contact.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faTwitter, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Cart = () => {
  const [isclicked, setIsClicked] = useState(false);

  const leftTextRef = useRef(null);
  const iconsRef = useRef(null);

  const photoNo = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

  const handlePhotoClick = () => {
    setIsClicked(!isclicked);
  };

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

    observer.observe(leftTextRef.current);
    observer.observe(iconsRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

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
          </span>
        </div>
      </div>
      <div className="contact_right">
        <span>Blablabla</span>
        <div className="contact_address">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.7052868780933!2d2.295054414788587!3d48.87377910783613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1e2915c7e5%3A0x7a0a3ed3a1d40ef3!2sArc%20de%20Triomphe!5e0!3m2!1sen!2sfr!4v1553497921355"
            title="Google Maps Embed"
            style={{
              width: "100%",
              height: "450px",
              border: "0",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Cart;
