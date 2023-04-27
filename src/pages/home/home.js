import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import LeftSideBar from "../../components/homeLeftSideBar/leftSideBar";
import { useState } from "react";
import ProductDetails from "../../components/homeLeftSideBar/products";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState();

  const handleOnSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div id="homePage_container">
      <LeftSideBar onSelect={handleOnSelect} />

      <div className="content_right">
        {selectedItem ? (
          <ProductDetails renderItem={selectedItem} />
        ) : (
          <div className="content">
            <div className="content_header"></div>
            <div className="content_main">
              <span>
                <em>Shop your products Online!</em>
                &nbsp; Whether you're looking for a sturdy base for your construction project or a sleek finish for your interior design,
                our wide range of high-quality products have got you covered. With a diverse selection of materials to choose from, we offer
                a variety of options that can meet the specific requirements of your project. So why wait? Unleash the power of metals today
                and transform your project from concept to reality with our convenient online shopping experience.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
