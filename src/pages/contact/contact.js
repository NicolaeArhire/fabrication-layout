import "./contact.css";
import { useEffect } from "react";

const Cart = () => {
  useEffect(() => {
    const pictures = document.querySelectorAll(".photo");
    pictures.forEach((photo) => {
      photo.addEventListener("click", () => {
        pictures.forEach((photo) => {
          photo.classList.toggle("arrow");
        });
      });
    });
    pictures[0].classList.add("first");
    pictures[pictures.length - 1].classList.add("last");
  }, []);

  return (
    <div className="contact_container">
      <div className="contact_left">
        <div className="photo one"></div>
        <div className="photo two"></div>
        <div className="photo three"></div>
        <div className="photo four"></div>
        <div className="photo five"></div>
        <div className="photo six"></div>
        <span>Hi there</span>
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
