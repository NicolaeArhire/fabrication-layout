import "./leftSideBar.css";
import "./products.css";

import Accordion from "react-bootstrap/Accordion";

const LeftSideBar = ({ onSelect }) => {
  const productAccordion = [
    {
      product: "Plates",
      productMaterials: ["Steel Plates", "Stainless Steel Plates", "Aluminium Plates", "Oak Wooden Plates"],
      img: "leftSideBar_icons/plate.png",
      imgAlt: "plate",
    },
    {
      product: "Flat Bar",
      productMaterials: ["Steel Flat Bars", "Stainless Steel Flat Bars", "Aluminium Flat Bars"],
      img: "leftSideBar_icons/flatBar.png",
      imgAlt: "flatbar",
    },
    {
      product: "Angle Bar",
      productMaterials: ["Steel Angle Bars", "Stainless Steel Angle Bars", "Aluminium Angle Bars"],
      img: "leftSideBar_icons/angleBar.png",
      imgAlt: "angleBar",
    },
    {
      product: "Hexagonal Bar",
      productMaterials: ["Steel Hexagonal Bars", "Stainless Steel Hexagonal Bars", "Aluminium Hexagonal Bars"],
      img: "leftSideBar_icons/hexagonalBar.png",
      imgAlt: "hexagonalBar",
    },
    {
      product: "Rectangular Bar",
      productMaterials: ["Steel Rectangular Bars", "Stainless Steel Rectangular Bars", "Aluminium Rectangular Bars"],
      img: "leftSideBar_icons/rectangularBar.png",
      imgAlt: "rectangularBar",
    },
    {
      product: "Round Bar",
      productMaterials: ["Steel Round Bars", "Stainless Steel Round Bars", "Aluminium Round Bars"],
      img: "leftSideBar_icons/roundBar.png",
      imgAlt: "roundBar",
    },
    {
      product: "Rectangular Tube",
      productMaterials: ["Steel Rectangular Tubes", "Stainless Steel Rectangular Tubes", "Aluminium Rectangular Tubes"],
      img: "leftSideBar_icons/rectangularTube.png",
      imgAlt: "rectangularTube",
    },
    {
      product: "Round Tube",
      productMaterials: ["Steel Round Tubes", "Stainless Steel Round Tubes", "Aluminium Round Tubes"],
      img: "leftSideBar_icons/roundTube.png",
      imgAlt: "roundTube",
    },
    {
      product: "Channel",
      productMaterials: ["Steel Channels", "Stainless Steel Channels", "Aluminium Channels"],
      img: "leftSideBar_icons/channel.png",
      imgAlt: "channel",
    },
    {
      product: "Beam",
      productMaterials: ["Steel Beams", "Stainless Steel Beams", "Aluminium Beams"],
      img: "leftSideBar_icons/hBeam.png",
      imgAlt: "hBeam",
    },
    {
      product: "Bulb Flat",
      productMaterials: ["Steel Bulbs", "Stainless Steel Bulbs", "Aluminium Bulbs"],
      img: "leftSideBar_icons/bulbFlat.png",
      imgAlt: "bulbFlat",
    },
    {
      product: "Custom Plate Shape",
      productMaterials: ["Steel Shape", "Stainless Steel Shape", "Aluminium Shape"],
      img: "leftSideBar_icons/customShape.png",
      imgAlt: "customShape",
    },
  ];

  return (
    <div className="sidebar_left">
      <div className="title">
        <span>PICK YOUR PRODUCT:</span>
      </div>
      <Accordion>
        {productAccordion.map((item, index) => (
          <Accordion.Item key={index} eventKey={index}>
            <Accordion.Header>
              <img src={item.img} alt={item.imgAlt} style={{ width: 30, height: 30, marginRight: 10 }} /> {item.product}
            </Accordion.Header>
            <Accordion.Body>
              <ul style={{ marginBottom: 0 }}>
                {item.productMaterials.map((item, index) => (
                  <li
                    key={index}
                    className="sidebar_profileContent"
                    onClick={() => {
                      onSelect(item);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default LeftSideBar;
