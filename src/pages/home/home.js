import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import LeftSideBar from "../../components/homeLeftSideBar/leftSideBar";
import { useState, useContext } from "react";
import ProductDetails from "../../components/homeLeftSideBar/products";
import { MyContext } from "../../App";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState();

  const { modalIsOpen } = useContext(MyContext);

  const handleOnSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div id="homePage_container" style={{ display: modalIsOpen ? "none" : "flex" }}>
      <div className="content_right_mobile">
        <div className="content_mobile">
          <div className="content_header_mobile">
            <img src="/homeSlider/home.gif" alt="homeSlider" />
          </div>
          <div className="content_main_mobile">
            <span>
              <em>Shop your products Online!</em>
              <br />
              &nbsp; &nbsp; &nbsp; Whether you're looking for a sturdy base for your construction project or a sleek finish for your
              interior design, our wide range of high-quality products will meet the specific requirements of your project. <br /> &nbsp;
              &nbsp; &nbsp; Besides the standard products, we offer custom plate surface calculation for your specific structural needs:
              various pipe intersections, frustums, adaptors, etc.
            </span>
          </div>
        </div>
      </div>
      <LeftSideBar onSelect={handleOnSelect} />
      <div className={` ${selectedItem ? "content_right" : "content_right noSelection"}`}>
        {selectedItem ? (
          <ProductDetails renderItem={selectedItem} />
        ) : (
          <div className="content">
            <div className="content_header">
              <img src="/homeSlider/home.gif" alt="homeSlider" width={648} />
            </div>
            <div className="content_main">
              <span>
                <em>Shop your products Online!</em>
                <br />
                &nbsp; &nbsp; &nbsp; Whether you're looking for a sturdy base for your construction project or a sleek finish for your
                interior design, our wide range of high-quality products will meet the specific requirements of your project. <br /> &nbsp;
                &nbsp; &nbsp; Besides the standard products, we offer custom plate surface calculation for your specific structural needs:
                various pipe intersections, frustums, adaptors, etc.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
