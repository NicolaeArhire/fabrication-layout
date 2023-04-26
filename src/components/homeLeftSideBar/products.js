import { useState, useRef, useEffect } from "react";

const ProductDetails = ({ renderItem }) => {
  const imgRef = useRef(null);
  const imgRef2 = useRef(null);

  const [isImgScaled, setIsImgScaled] = useState(false);
  const [isImg2Scaled, setIsImg2Scaled] = useState(false);
  const [steelPlateLength, setSteelPlateLength] = useState("");
  const [steelPlateWidth, setSteelPlateWidth] = useState("");
  const [steelPlateThickness, setSteelPlateThickness] = useState("");
  const [steelPlateQty, setSteelPlateQty] = useState(1);
  const [stainlessSteelPlateLength, setStainlessSteelPlateLength] = useState("");
  const [stainlessSteelPlateWidth, setStainlessSteelPlateWidth] = useState("");
  const [stainlessSteelPlateThickness, setStainlessSteelPlateThickness] = useState("");
  const [stainlessSteelPlateQty, setStainlessSteelPlateQty] = useState(1);
  const [aluminiumPlateLength, setAluminiumPlateLength] = useState("");
  const [aluminiumPlateWidth, setAluminiumPlateWidth] = useState("");
  const [aluminiumPlateThickness, setAluminiumPlateThickness] = useState("");
  const [aluminiumPlateQty, setAluminiumPlateQty] = useState(1);
  const [woodenPlateLength, setWoodenPlateLength] = useState("");
  const [woodenPlateWidth, setWoodenPlateWidth] = useState("");
  const [woodenPlateThickness, setWoodenPlateThickness] = useState("");
  const [woodenPlateQty, setWoodenPlateQty] = useState(1);
  const [steelFlatLength, setSteelFlatLength] = useState("");
  const [steelFlatWidth, setSteelFlatWidth] = useState("");
  const [steelFlatThickness, setSteelFlatThickness] = useState("");
  const [steelFlatQty, setSteelFlatQty] = useState(1);
  const [stainlessSteelFlatLength, setStainlessSteelFlatLength] = useState("");
  const [stainlessSteelFlatWidth, setStainlessSteelFlatWidth] = useState("");
  const [stainlessSteelFlatThickness, setStainlessSteelFlatThickness] = useState("");
  const [stainlessSteelFlatQty, setStainlessSteelFlatQty] = useState(1);
  const [aluminiumFlatLength, setAluminiumFlatLength] = useState("");
  const [aluminiumFlatWidth, setAluminiumFlatWidth] = useState("");
  const [aluminiumFlatThickness, setAluminiumFlatThickness] = useState("");
  const [aluminiumFlatQty, setAluminiumFlatQty] = useState(1);
  const [steelAngleLeg1, setSteelAngleLeg1] = useState("");
  const [steelAngleLeg2, setSteelAngleLeg2] = useState("");
  const [steelAngleThickness, setSteelAngleThickness] = useState("");
  const [steelAngleLength, setSteelAngleLength] = useState("");
  const [steelAngleQty, setSteelAngleQty] = useState(1);
  const [stainlessSteelAngleLeg1, setStainlessSteelAngleLeg1] = useState("");
  const [stainlessSteelAngleLeg2, setStainlessSteelAngleLeg2] = useState("");
  const [stainlessSteelAngleThickness, setStainlessSteelAngleThickness] = useState("");
  const [stainlessSteelAngleLength, setStainlessSteelAngleLength] = useState("");
  const [stainlessSteelAngleQty, setStainlessSteelAngleQty] = useState(1);
  const [aluminiumAngleLeg1, setAluminiumAngleLeg1] = useState("");
  const [aluminiumAngleLeg2, setAluminiumAngleLeg2] = useState("");
  const [aluminiumAngleThickness, setAluminiumAngleThickness] = useState("");
  const [aluminiumAngleLength, setAluminiumAngleLength] = useState("");
  const [aluminiumAngleQty, setAluminiumAngleQty] = useState(1);
  const [steelHexSize1, setSteelHexSize1] = useState("");
  const [steelHexLength, setsteelHexLength] = useState("");
  const [steelHexQty, setSteelHexQty] = useState(1);
  const [stainlessSteelHexSize1, setStainlessSteelHexSize1] = useState("");
  const [stainlessSteelHexLength, setStainlessSteelHexLength] = useState("");
  const [stainlessSteelHexQty, setStainlessSteelHexQty] = useState(1);
  const [aluminiumHexSize1, setAluminiumHexSize1] = useState("");
  const [aluminiumHexLength, setAluminiumHexLength] = useState("");
  const [aluminiumHexQty, setAluminiumHexQty] = useState(1);
  const [steelRectBarSide1, setSteelRectBarSide1] = useState("");
  const [steelRectBarSide2, setSteelRectBarSide2] = useState("");
  const [steelRectBarLength, setSteelRectBarLength] = useState("");
  const [steelRectBarQty, setSteelRectBarQty] = useState(1);
  const [stainlessSteelRectBarSide1, setStainlessSteelRectBarSide1] = useState("");
  const [stainlessSteelRectBarSide2, setStainlessSteelRectBarSide2] = useState("");
  const [stainlessSteelRectBarLength, setStainlessSteelRectBarLength] = useState("");
  const [stainlessSteelRectBarQty, setStainlessSteelRectBarQty] = useState(1);
  const [aluminiumRectBarSide1, setAluminiumRectBarSide1] = useState("");
  const [aluminiumRectBarSide2, setAluminiumRectBarSide2] = useState("");
  const [aluminiumRectBarLength, setAluminiumRectBarLength] = useState("");
  const [aluminiumRectBarQty, setAluminiumRectBarQty] = useState(1);
  const [steelRoundBarDiam, setSteelRoundBarDiam] = useState("");
  const [steelRoundBarLength, setSteelRoundBarLength] = useState("");
  const [steelRoundBarX, setSteelRoundBarX] = useState("");
  const [steelRoundBarQty, setSteelRoundBarQty] = useState(1);
  const [stainlessSteelRoundBarDiam, setStainlessSteelRoundBarDiam] = useState("");
  const [stainlessSteelRoundBarLength, setStainlessSteelRoundBarLength] = useState("");
  const [stainlessSteelRoundBarX, setStainlessSteelRoundBarX] = useState("");
  const [stainlessSteelRoundBarQty, setStainlessSteelRoundBarQty] = useState(1);
  const [aluminiumRoundBarDiam, setAluminiumRoundBarDiam] = useState("");
  const [aluminiumRoundBarLength, setAluminiumRoundBarLength] = useState("");
  const [aluminiumRoundBarX, setAluminiumRoundBarX] = useState("");
  const [aluminiumRoundBarQty, setAluminiumRoundBarQty] = useState(1);
  const [steelRectTubeSide1, setSteelRectTubeSide1] = useState("");
  const [steelRectTubeSide2, setSteelRectTubeSide2] = useState("");
  const [steelRectTubeThickness, setSteelRectTubeThickness] = useState("");
  const [steelRectTubeLength, setSteelRectTubeLength] = useState("");
  const [steelRectTubeQty, setSteelRectTubeQty] = useState(1);
  const [stainlessSteelRectTubeSide1, setStainlessSteelRectTubeSide1] = useState("");
  const [stainlessSteelRectTubeSide2, setStainlessSteelRectTubeSide2] = useState("");
  const [stainlessSteelRectTubeThickness, setStainlessSteelRectTubeThickness] = useState("");
  const [stainlessSteelRectTubeLength, setStainlessSteelRectTubeLength] = useState("");
  const [stainlessSteelRectTubeQty, setStainlessSteelRectTubeQty] = useState(1);
  const [aluminiumRectTubeSide1, setAluminiumRectTubeSide1] = useState("");
  const [aluminiumRectTubeSide2, setAluminiumRectTubeSide2] = useState("");
  const [aluminiumRectTubeThickness, setAluminiumRectTubeThickness] = useState("");
  const [aluminiumRectTubeLength, setAluminiumRectTubeLength] = useState("");
  const [aluminiumRectTubeQty, setAluminiumRectTubeQty] = useState(1);
  const [steelRoundTubeDiam, setSteelRoundTubeDiam] = useState("");
  const [steelRoundTubeThickness, setSteelRoundTubeThickness] = useState("");
  const [steelRoundTubeLength, setSteelRoundTubeLength] = useState("");
  const [steelRoundTubeQty, setSteelRoundTubeQty] = useState(1);
  const [stainlessSteelRoundTubeDiam, setStainlessSteelRoundTubeDiam] = useState("");
  const [stainlessSteelRoundTubeThickness, setStainlessSteelRoundTubeThickness] = useState("");
  const [stainlessSteelRoundTubeLength, setStainlessSteelRoundTubeLength] = useState("");
  const [stainlessSteelRoundTubeQty, setStainlessSteelRoundTubeQty] = useState(1);
  const [aluminiumRoundTubeDiam, setAluminiumRoundTubeDiam] = useState("");
  const [aluminiumRoundTubeThickness, setAluminiumRoundTubeThickness] = useState("");
  const [aluminiumRoundTubeLength, setAluminiumRoundTubeLength] = useState("");
  const [aluminiumRoundTubeQty, setAluminiumRoundTubeQty] = useState(1);
  const [steelChannelSide1, setSteelChannelSide1] = useState("");
  const [steelChannelSide2, setSteelChannelSide2] = useState("");
  const [steelChannelSide3, setSteelChannelSide3] = useState("");
  const [steelChannelLength, setSteelChannelLength] = useState("");
  const [steelChannelQty, setSteelChannelQty] = useState(1);
  const [stainlessSteelChannelSide1, setStainlessSteelChannelSide1] = useState("");
  const [stainlessSteelChannelSide2, setStainlessSteelChannelSide2] = useState("");
  const [stainlessSteelChannelSide3, setStainlessSteelChannelSide3] = useState("");
  const [stainlessSteelChannelLength, setStainlessSteelChannelLength] = useState("");
  const [stainlessSteelChannelQty, setStainlessSteelChannelQty] = useState(1);
  const [aluminiumChannelSide1, setAluminiumChannelSide1] = useState("");
  const [aluminiumChannelSide2, setAluminiumChannelSide2] = useState("");
  const [aluminiumChannelSide3, setAluminiumChannelSide3] = useState("");
  const [aluminiumChannelLength, setAluminiumChannelLength] = useState("");
  const [aluminiumChannelQty, setAluminiumChannelQty] = useState(1);
  const [steelBeamSide1, setSteelBeamSide1] = useState("");
  const [steelBeamSide2, setSteelBeamSide2] = useState("");
  const [steelBeamSide3, setSteelBeamSide3] = useState("");
  const [steelBeamLength, setSteelBeamLength] = useState("");
  const [steelBeamQty, setSteelBeamQty] = useState(1);
  const [stainlessSteelBeamSide1, setStainlessSteelBeamSide1] = useState("");
  const [stainlessSteelBeamSide2, setStainlessSteelBeamSide2] = useState("");
  const [stainlessSteelBeamSide3, setStainlessSteelBeamSide3] = useState("");
  const [stainlessSteelBeamLength, setStainlessSteelBeamLength] = useState("");
  const [stainlessSteelBeamQty, setStainlessSteelBeamQty] = useState(1);
  const [aluminiumBeamSide1, setAluminiumBeamSide1] = useState("");
  const [aluminiumBeamSide2, setAluminiumBeamSide2] = useState("");
  const [aluminiumBeamSide3, setAluminiumBeamSide3] = useState("");
  const [aluminiumBeamLength, setAluminiumBeamLength] = useState("");
  const [aluminiumBeamQty, setAluminiumBeamQty] = useState(1);
  const [steelBulbSize, setSteelBulbSize] = useState("");
  const [steelBulbLength, setSteelBulbLength] = useState("");
  const [steelBulbX, setSteelBulbX] = useState("");
  const [steelBulbQty, setSteelBulbQty] = useState(1);
  const [stainlessSteelBulbSize, setStainlessSteelBulbSize] = useState("");
  const [stainlessSteelBulbLength, setStainlessSteelBulbLength] = useState("");
  const [stainlessSteelBulbX, setStainlessSteelBulbX] = useState("");
  const [stainlessSteelBulbQty, setStainlessSteelBulbQty] = useState(1);
  const [aluminiumBulbSize, setAluminiumBulbSize] = useState("");
  const [aluminiumBulbLength, setAluminiumBulbLength] = useState("");
  const [aluminiumBulbX, setAluminiumBulbX] = useState("");
  const [aluminiumBulbQty, setAluminiumBulbQty] = useState(1);

  useEffect(() => {
    function handleClickOutsideImg(event) {
      if (imgRef.current && !imgRef.current.contains(event.target)) {
        setIsImgScaled(false);
      }
    }
    window.addEventListener("click", handleClickOutsideImg);
    return () => {
      window.removeEventListener("click", handleClickOutsideImg);
    };
  }, [imgRef]);

  useEffect(() => {
    function handleClickOutsideImg2(event) {
      if (imgRef2.current && !imgRef2.current.contains(event.target)) {
        setIsImg2Scaled(false);
      }
    }
    window.addEventListener("click", handleClickOutsideImg2);
    return () => {
      window.removeEventListener("click", handleClickOutsideImg2);
    };
  }, [imgRef2]);

  useEffect(() => {
    setSteelPlateLength("");
    setSteelPlateWidth("");
    setSteelPlateThickness("");
    setSteelPlateQty(1);
    setStainlessSteelPlateLength("");
    setStainlessSteelPlateWidth("");
    setStainlessSteelPlateThickness("");
    setStainlessSteelPlateQty(1);
    setAluminiumPlateLength("");
    setAluminiumPlateWidth("");
    setAluminiumPlateThickness("");
    setAluminiumPlateQty(1);
    setWoodenPlateLength("");
    setWoodenPlateWidth("");
    setWoodenPlateThickness("");
    setWoodenPlateQty(1);
    setSteelFlatLength("");
    setSteelFlatWidth("");
    setSteelFlatThickness("");
    setSteelFlatQty(1);
    setStainlessSteelFlatLength("");
    setStainlessSteelFlatWidth("");
    setStainlessSteelFlatThickness("");
    setStainlessSteelFlatQty(1);
    setAluminiumFlatLength("");
    setAluminiumFlatWidth("");
    setAluminiumFlatThickness("");
    setAluminiumFlatQty(1);
    setSteelAngleLeg1("");
    setSteelAngleLeg2("");
    setSteelAngleThickness("");
    setSteelAngleLength("");
    setSteelAngleQty(1);
    setStainlessSteelAngleLeg1("");
    setStainlessSteelAngleLeg2("");
    setStainlessSteelAngleThickness("");
    setStainlessSteelAngleLength("");
    setStainlessSteelAngleQty(1);
    setAluminiumAngleLeg1("");
    setAluminiumAngleLeg2("");
    setAluminiumAngleThickness("");
    setAluminiumAngleLength("");
    setAluminiumAngleQty(1);
    setSteelHexSize1("");
    setsteelHexLength("");
    setSteelHexQty(1);
    setStainlessSteelHexSize1("");
    setStainlessSteelHexLength("");
    setStainlessSteelHexQty(1);
    setAluminiumHexSize1("");
    setAluminiumHexLength("");
    setAluminiumHexQty(1);
    setSteelRectBarSide1("");
    setSteelRectBarSide2("");
    setSteelRectBarLength("");
    setSteelRectBarQty(1);
    setStainlessSteelRectBarSide1("");
    setStainlessSteelRectBarSide2("");
    setStainlessSteelRectBarLength("");
    setStainlessSteelRectBarQty(1);
    setAluminiumRectBarSide1("");
    setAluminiumRectBarSide2("");
    setAluminiumRectBarLength("");
    setAluminiumRectBarQty(1);
    setSteelRoundBarDiam("");
    setSteelRoundBarLength("");
    setSteelRoundBarX("");
    setSteelRoundBarQty(1);
    setStainlessSteelRoundBarDiam("");
    setStainlessSteelRoundBarLength("");
    setStainlessSteelRoundBarX("");
    setStainlessSteelRoundBarQty(1);
    setAluminiumRoundBarDiam("");
    setAluminiumRoundBarLength("");
    setAluminiumRoundBarX("");
    setAluminiumRoundBarQty(1);
    setSteelRectTubeSide1("");
    setSteelRectTubeSide2("");
    setSteelRectTubeThickness("");
    setSteelRectTubeLength("");
    setSteelRectTubeQty(1);
    setStainlessSteelRectTubeSide1("");
    setStainlessSteelRectTubeSide2("");
    setStainlessSteelRectTubeThickness("");
    setStainlessSteelRectTubeLength("");
    setStainlessSteelRectTubeQty(1);
    setAluminiumRectTubeSide1("");
    setAluminiumRectTubeSide2("");
    setAluminiumRectTubeThickness("");
    setAluminiumRectTubeLength("");
    setAluminiumRectTubeQty(1);
    setSteelRoundTubeDiam("");
    setSteelRoundTubeThickness("");
    setSteelRoundTubeLength("");
    setSteelRoundTubeQty(1);
    setStainlessSteelRoundTubeDiam("");
    setStainlessSteelRoundTubeThickness("");
    setStainlessSteelRoundTubeLength("");
    setStainlessSteelRoundTubeQty(1);
    setAluminiumRoundTubeDiam("");
    setAluminiumRoundTubeThickness("");
    setAluminiumRoundTubeLength("");
    setAluminiumRoundTubeQty(1);
    setSteelChannelSide1("");
    setSteelChannelSide2("");
    setSteelChannelSide3("");
    setSteelChannelLength("");
    setSteelChannelQty(1);
    setStainlessSteelChannelSide1("");
    setStainlessSteelChannelSide2("");
    setStainlessSteelChannelSide3("");
    setStainlessSteelChannelLength("");
    setStainlessSteelChannelQty(1);
    setAluminiumChannelSide1("");
    setAluminiumChannelSide2("");
    setAluminiumChannelSide3("");
    setAluminiumChannelLength("");
    setAluminiumChannelQty(1);
    setSteelBeamSide1("");
    setSteelBeamSide2("");
    setSteelBeamSide3("");
    setSteelBeamLength("");
    setSteelBeamQty(1);
    setStainlessSteelBeamSide1("");
    setStainlessSteelBeamSide2("");
    setStainlessSteelBeamSide3("");
    setStainlessSteelBeamLength("");
    setStainlessSteelBeamQty(1);
    setAluminiumBeamSide1("");
    setAluminiumBeamSide2("");
    setAluminiumBeamSide3("");
    setAluminiumBeamLength("");
    setAluminiumBeamQty(1);
    setSteelBulbSize("");
    setSteelBulbLength("");
    setSteelBulbX("");
    setSteelBulbQty(1);
    setStainlessSteelBulbSize("");
    setStainlessSteelBulbLength("");
    setStainlessSteelBulbX("");
    setStainlessSteelBulbQty(1);
    setAluminiumBulbSize("");
    setAluminiumBulbLength("");
    setAluminiumBulbX("");
    setAluminiumBulbQty(1);
  }, [renderItem]);

  const handleClickImg = (event) => {
    if (event.target === imgRef.current) {
      setIsImgScaled(!isImgScaled);
    }
  };

  const handleClickImg2 = (event) => {
    if (event.target === imgRef2.current) {
      setIsImg2Scaled(!isImg2Scaled);
    }
  };

  const bulbTypes = {
    "60x4": 2.81,
    "60x5": 3.28,
    "60x6": 3.75,
    "80x5": 4.25,
    "80x6": 4.88,
    "100x6": 6.06,
    "100x7": 6.86,
    "100x8": 7.65,
    "120x6": 7.32,
    "120x7": 8.26,
    "120x8": 9.2,
    "140x7": 9.75,
    "140x8": 10.85,
    "140x9": 11.93,
    "140x10": 13.05,
    "160x7": 11.46,
    "160x8": 12.72,
    "160x9": 13.97,
    "160x10": 15.3,
    "160x11": 16.49,
    "160x11.5": 17.3,
    "180x8": 14.8,
    "180x9": 16.22,
    "180x10": 17.63,
    "180x11": 19.04,
    "180x11.5": 19.7,
    "200x8.5": 17.8,
    "200x9": 18.57,
    "200x10": 20.14,
    "200x11": 21.71,
    "200x11.5": 22.5,
    "200x12": 23.28,
    "220x9": 21,
    "220x10": 22.77,
    "220x11": 24.5,
    "220x11.5": 25.3,
    "220x12": 26.22,
    "230x11": 25.06,
    "240x9.5": 24.4,
    "240x10": 25.5,
    "240x10.5": 26.4,
    "240x11": 27.39,
    "240x11.5": 28.3,
    "240x12": 29.27,
    "260x10": 28.35,
    "260x11": 30.39,
    "260x12": 32.43,
    "260x13": 34.4,
    "280x10.5": 32.4,
    "280x11": 33.5,
    "280x12": 35.7,
    "280x13": 37.9,
    "300x11": 36.7,
    "300x12": 39.09,
    "300x13": 41.44,
    "320x11.5": 41.2,
    "320x12": 42.6,
    "320x12.5": 43.8,
    "320x13": 45.09,
    "320x13.5": 46.3,
    "320x14": 47.6,
    "340x12": 46.2,
    "340x12.5": 47.5,
    "340x13": 48.86,
    "340x14": 51.5,
    "340x15": 54.2,
    "370x12.5": 53.1,
    "370x13": 54.7,
    "370x14": 57.6,
    "370x15": 60.5,
    "370x16": 63.5,
    "400x13": 60.8,
    "400x14": 63.96,
    "400x15": 67.1,
    "400x16": 70.2,
    "430x14": 70.6,
    "430x15": 73.9,
    "430x17": 80.7,
    "430x18": 83.9,
    "430x19": 87.4,
    "430x20": 90.8,
  };

  const prices = {
    steel: 852,
    inox: 1200,
    aluminium: 2415,
    wood: 400,
  };

  const prodInfo = [
    {
      title: "Steel Plates",
      description:
        "are one of the most popular hot rolled, low  carbon steel plates used in manufacturing, fabrication, and repair projects. Steel plate adds strength and rigidity to anyproject at a lower price compared to other grades of steel plate. It is easy to weld, cut, form and machine. We stock hundreds of thicknesses and sizes of steel plate that you can buy online in ready to ship, precut or mill sizes.",
      properties: ["Yield = 248.2 N/mm²", "Tensile = 400.02 N/mm²", "Brinell Hardness = 112", "Melting Point = 1426° C", "Magnetic = YES"],
      img1: "profiles/plate.png",
      img2: "profiles/plate_dims.png",
      density: 7850,
      dimsText1: "Length (mm):",
      dimsText2: "Width (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 29,
      dimsText2Margin: 35,
      dimsText3Margin: 10,
      dimsText4Margin: 21,
      dims: [steelPlateLength, steelPlateWidth, steelPlateThickness, steelPlateQty],
      dimsFuncs: [
        (e) => {
          setSteelPlateLength(e.target.value);
        },
        (e) => {
          setSteelPlateWidth(e.target.value);
        },
        (e) => {
          setSteelPlateThickness(e.target.value);
        },
        (e) => {
          setSteelPlateQty(e.target.value);
        },
      ],
      weight: ((((((steelPlateLength / 1000) * steelPlateWidth) / 1000) * steelPlateThickness * 7850) / 1000) * steelPlateQty).toFixed(2),
      price: (
        ((((((steelPlateLength / 1000) * steelPlateWidth) / 1000) * steelPlateThickness * 7850) / 1000) * steelPlateQty * prices.steel) /
        1000
      ).toFixed(2),
    },
    {
      title: "Stainless Steel Plates",
      description:
        "offer excellent corrosion resistance to various chemicals, industrial atmospheres, and marine environments. They are made from high-quality stainless steel, providing durability and longevity. These plates are known for their high strength properties, making them ideal for structural and load-bearing applications. They are easy to work with, allowing for cutting, forming, and welding as needed.",
      properties: ["Yield = 234.47 N/mm²", "Tensile = 586.05 N/mm²", "Brinell Hardness = 170", "Melting Point = 1426° C", "Magnetic = NO"],
      img1: "profiles/st_plate.png",
      img2: "profiles/plate_dims.png",
      density: 7850,
      dimsText1: "Length (mm):",
      dimsText2: "Width (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 29,
      dimsText2Margin: 35,
      dimsText3Margin: 10,
      dimsText4Margin: 21,
      dims: [stainlessSteelPlateLength, stainlessSteelPlateWidth, stainlessSteelPlateThickness, stainlessSteelPlateQty],
      dimsFuncs: [
        (e) => {
          setStainlessSteelPlateLength(e.target.value);
        },
        (e) => {
          setStainlessSteelPlateWidth(e.target.value);
        },
        (e) => {
          setStainlessSteelPlateThickness(e.target.value);
        },
        (e) => {
          setStainlessSteelPlateQty(e.target.value);
        },
      ],
      weight: (
        (((((stainlessSteelPlateLength / 1000) * stainlessSteelPlateWidth) / 1000) * stainlessSteelPlateThickness * 7850) / 1000) *
        stainlessSteelPlateQty
      ).toFixed(2),
      price: (
        ((((((stainlessSteelPlateLength / 1000) * stainlessSteelPlateWidth) / 1000) * stainlessSteelPlateThickness * 7850) / 1000) *
          stainlessSteelPlateQty *
          prices.inox) /
        1000
      ).toFixed(2),
    },
    {
      title: "Aluminium Plates",
      description:
        "offer excellent weldability and formability, with good corrosion resistance that makes this kind of plate a popular and economical choice. Aluminium plates also have a smooth, shiny finish and is popular for many cosmetic and industrial applications, including decorative trim, fuel tanks, food & chemical handling, trailer siding & roofing, etc.",
      properties: ["Yield = 144.83 N/mm²", "Tensile = 151.73 N/mm²", "Brinell Hardness = 40", "Melting Point = 643° C", "Magnetic = NO"],
      img1: "profiles/al_plate.png",
      img2: "profiles/plate_dims.png",
      density: 2710,
      dimsText1: "Length (mm):",
      dimsText2: "Width (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 29,
      dimsText2Margin: 35,
      dimsText3Margin: 10,
      dimsText4Margin: 21,
      dims: [aluminiumPlateLength, aluminiumPlateWidth, aluminiumPlateThickness, aluminiumPlateQty],
      dimsFuncs: [
        (e) => {
          setAluminiumPlateLength(e.target.value);
        },
        (e) => {
          setAluminiumPlateWidth(e.target.value);
        },
        (e) => {
          setAluminiumPlateThickness(e.target.value);
        },
        (e) => {
          setAluminiumPlateQty(e.target.value);
        },
      ],
      weight: (
        (((((aluminiumPlateLength / 1000) * aluminiumPlateWidth) / 1000) * aluminiumPlateThickness * 2710) / 1000) *
        aluminiumPlateQty
      ).toFixed(2),
      price: (
        ((((((aluminiumPlateLength / 1000) * aluminiumPlateWidth) / 1000) * aluminiumPlateThickness * 2710) / 1000) *
          aluminiumPlateQty *
          prices.aluminium) /
        1000
      ).toFixed(2),
    },
    {
      title: "Oak Wooden Plates",
      description:
        "are versatile building materials that can be used in a variety of applications such as construction, furniture, and decorative projects. Our wooden plates offer a natural aesthetic appeal, durability, and can be easily customized to meet your specific project needs. We offer a wide range of wooden plate sizes and thicknesses that you can buy online.",
      properties: [
        "Yield = 56.5 N/mm²",
        "Tensile = 5.51 N/mm²",
        "Brinell Hardness = 3.7",
        "Flash Point = 300° C",
        "Fungic Resistant = YES",
      ],
      img1: "profiles/wood_plate.png",
      img2: "profiles/plate_dims.png",
      density: 1000,
      dimsText1: "Length (mm):",
      dimsText2: "Width (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 29,
      dimsText2Margin: 35,
      dimsText3Margin: 10,
      dimsText4Margin: 21,
      dims: [woodenPlateLength, woodenPlateWidth, woodenPlateThickness, woodenPlateQty],
      dimsFuncs: [
        (e) => {
          setWoodenPlateLength(e.target.value);
        },
        (e) => {
          setWoodenPlateWidth(e.target.value);
        },
        (e) => {
          setWoodenPlateThickness(e.target.value);
        },
        (e) => {
          setWoodenPlateQty(e.target.value);
        },
      ],
      weight: ((((((woodenPlateLength / 1000) * woodenPlateWidth) / 1000) * woodenPlateThickness * 1000) / 1000) * woodenPlateQty).toFixed(
        1
      ),
      price: (
        ((((((woodenPlateLength / 1000) * woodenPlateWidth) / 1000) * woodenPlateThickness * 1000) / 1000) * woodenPlateQty * prices.wood) /
        1000
      ).toFixed(2),
    },
    {
      title: "Steel Flat Bars",
      description:
        "are widely used for all general fabrication and repairs in industrial maintenance, agricultural implements, transportation equipment, etc. Flat bars can be stripped from coil or rolled as bars. We have hundreds of sizes in stock that you can buy online in ready to ship, precut or mill lengths in small or large quantity at wholesale prices.",
      properties: ["Yield = 248.2 N/mm²", "Tensile = 413.69 N/mm²", "Brinell Hardness = 133", "Melting Point = 1426° C", "Magnetic = YES"],
      img1: "profiles/flat_bar.png",
      img2: "profiles/flat_bar_dims.png",
      density: 7850,
      dimsText1: "Length (mm):",
      dimsText2: "Width (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 29,
      dimsText2Margin: 35,
      dimsText3Margin: 10,
      dimsText4Margin: 21,
      dims: [steelFlatLength, steelFlatWidth, steelFlatThickness, steelFlatQty],
      dimsFuncs: [
        (e) => {
          setSteelFlatLength(e.target.value);
        },
        (e) => {
          setSteelFlatWidth(e.target.value);
        },
        (e) => {
          setSteelFlatThickness(e.target.value);
        },
        (e) => {
          setSteelFlatQty(e.target.value);
        },
      ],
      weight: ((((((steelFlatLength / 1000) * steelFlatWidth) / 1000) * steelFlatThickness * 7850) / 1000) * steelFlatQty).toFixed(2),
      price: (
        ((((((steelFlatLength / 1000) * steelFlatWidth) / 1000) * steelFlatThickness * 7850) / 1000) * steelFlatQty * prices.steel) /
        1000
      ).toFixed(2),
    },
    {
      title: "Stainless Steel Flat Bars",
      description:
        "are the most economical stainless flat shape that are ideal for all applications where strength and superior corrosion resistance is required. Stainless flats have a durable dull, grainy mill finish and are widely used for all types of fabrication projects that are exposed to the elements. Stainless flats are sheared and edged.",
      properties: ["Yield = 234.47 N/mm²", "Tensile = 586.05 N/mm²", "Brinell Hardness = 170", "Melting Point = 1426° C", "Magnetic = NO"],
      img1: "profiles/st_flat_bar.png",
      img2: "profiles/flat_bar_dims.png",
      density: 7850,
      dimsText1: "Length (mm):",
      dimsText2: "Width (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 29,
      dimsText2Margin: 35,
      dimsText3Margin: 10,
      dimsText4Margin: 21,
      dims: [stainlessSteelFlatLength, stainlessSteelFlatWidth, stainlessSteelFlatThickness, stainlessSteelFlatQty],
      dimsFuncs: [
        (e) => {
          setStainlessSteelFlatLength(e.target.value);
        },
        (e) => {
          setStainlessSteelFlatWidth(e.target.value);
        },
        (e) => {
          setStainlessSteelFlatThickness(e.target.value);
        },
        (e) => {
          setStainlessSteelFlatQty(e.target.value);
        },
      ],
      weight: (
        (((((stainlessSteelFlatLength / 1000) * stainlessSteelFlatWidth) / 1000) * stainlessSteelFlatThickness * 7850) / 1000) *
        stainlessSteelFlatQty
      ).toFixed(2),
      price: (
        ((((((stainlessSteelFlatLength / 1000) * stainlessSteelFlatWidth) / 1000) * stainlessSteelFlatThickness * 7850) / 1000) *
          stainlessSteelFlatQty *
          prices.inox) /
        1000
      ).toFixed(2),
    },
    {
      title: "Aluminium Flat Bars",
      description:
        "are an extruded solid aluminum rectangle bar that is easy to work with and has a wide range of applications. Aluminium Flats are widely used for all types of fabrication projects where lightweight and corrosion resistance is a concern. We have hundreds of sizes in stock that you can buy online in ready to ship, precut or mill lengths.",
      properties: ["Yield = 144.83 N/mm²", "Tensile = 151.73 N/mm²", "Brinell Hardness = 40", "Melting Point = 643° C", "Magnetic = NO"],
      img1: "profiles/al_flat_bar.png",
      img2: "profiles/flat_bar_dims.png",
      density: 2710,
      dimsText1: "Length (mm):",
      dimsText2: "Width (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 29,
      dimsText2Margin: 35,
      dimsText3Margin: 10,
      dimsText4Margin: 21,
      dims: [aluminiumFlatLength, aluminiumFlatWidth, aluminiumFlatThickness, aluminiumFlatQty],
      dimsFuncs: [
        (e) => {
          setAluminiumFlatLength(e.target.value);
        },
        (e) => {
          setAluminiumFlatWidth(e.target.value);
        },
        (e) => {
          setAluminiumFlatThickness(e.target.value);
        },
        (e) => {
          setAluminiumFlatQty(e.target.value);
        },
      ],
      weight: (
        (((((aluminiumFlatLength / 1000) * aluminiumFlatWidth) / 1000) * aluminiumFlatThickness * 2710) / 1000) *
        aluminiumFlatQty
      ).toFixed(2),
      price: (
        ((((((aluminiumFlatLength / 1000) * aluminiumFlatWidth) / 1000) * aluminiumFlatThickness * 2710) / 1000) *
          aluminiumFlatQty *
          prices.aluminium) /
        1000
      ).toFixed(2),
    },
    {
      title: "Steel Angle Bars",
      description:
        "are one of the most popular hot rolled, low carbon steel shapes used in manufacturing, fabrication, and repair projects. It's 90 degree angle shape adds strength and rigidity to any project for a lower price compared to other shapes and types of metal. It is easy to weld and cut and you can buy it online in ready to ship, precut or mill lengths.",
      properties: ["Yield = 248.2 N/mm²", "Tensile = 413.69 N/mm²", "Brinell Hardness = 133", "Melting Point = 1426° C", "Magnetic = YES"],
      img1: "profiles/angle_bar.png",
      img2: "profiles/angle_bar_dims.png",
      density: 7850,
      dimsText1: "Leg 1 (mm):",
      dimsText2: "Leg 2 (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 39,
      dimsText2Margin: 39,
      dimsText3Margin: 10,
      dimsText4Margin: 21,
      dimsText5Margin: 42,
      angleBar: " ",
      dims: [steelAngleLeg1, steelAngleLeg2, steelAngleThickness, steelAngleQty, steelAngleLength],
      dimsFuncs: [
        (e) => {
          setSteelAngleLeg1(e.target.value);
        },
        (e) => {
          setSteelAngleLeg2(e.target.value);
        },
        (e) => {
          setSteelAngleThickness(e.target.value);
        },
        (e) => {
          setSteelAngleQty(e.target.value);
        },
        (e) => {
          setSteelAngleLength(e.target.value);
        },
      ],
      weight: (
        0.000001 *
        (parseInt(steelAngleLeg1) + parseInt(steelAngleLeg2) - parseInt(steelAngleThickness)) *
        parseInt(steelAngleThickness) *
        7850 *
        steelAngleLength *
        steelAngleQty
      ).toFixed(2),
      price: (
        (0.000001 *
          (parseInt(steelAngleLeg1) + parseInt(steelAngleLeg2) - parseInt(steelAngleThickness)) *
          parseInt(steelAngleThickness) *
          7850 *
          steelAngleLength *
          steelAngleQty *
          prices.steel) /
        1000
      ).toFixed(2),
    },
    {
      title: "Stainless Steel Angle Bars",
      description:
        "are made from a hot rolled stainless angle shape with inside radius corners that are ideal for all structural applications where greater strength and superior corrosion resistance is required. These profiles have a durable dull, grainy mill finish that is widely used for all types of fabrication projects that are exposed to chemical, acidic, fresh water, and salt water environments.",
      properties: ["Yield = 234.47 N/mm²", "Tensile = 586.05 N/mm²", "Brinell Hardness = 170", "Melting Point = 1426° C", "Magnetic = NO"],
      img1: "profiles/st_angle_bar.png",
      img2: "profiles/angle_bar_dims.png",
      density: 7850,
      dimsText1: "Leg 1 (mm):",
      dimsText2: "Leg 2 (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 39,
      dimsText2Margin: 39,
      dimsText3Margin: 10,
      dimsText4Margin: 21,
      dimsText5Margin: 42,
      angleBar: " ",
      dims: [
        stainlessSteelAngleLeg1,
        stainlessSteelAngleLeg2,
        stainlessSteelAngleThickness,
        stainlessSteelAngleQty,
        stainlessSteelAngleLength,
      ],
      dimsFuncs: [
        (e) => {
          setStainlessSteelAngleLeg1(e.target.value);
        },
        (e) => {
          setStainlessSteelAngleLeg2(e.target.value);
        },
        (e) => {
          setStainlessSteelAngleThickness(e.target.value);
        },
        (e) => {
          setStainlessSteelAngleQty(e.target.value);
        },
        (e) => {
          setStainlessSteelAngleLength(e.target.value);
        },
      ],
      weight: (
        0.000001 *
        (parseInt(stainlessSteelAngleLeg1) + parseInt(stainlessSteelAngleLeg2) - parseInt(stainlessSteelAngleThickness)) *
        parseInt(stainlessSteelAngleThickness) *
        7850 *
        stainlessSteelAngleLength *
        stainlessSteelAngleQty
      ).toFixed(2),
      price: (
        (0.000001 *
          (parseInt(stainlessSteelAngleLeg1) + parseInt(stainlessSteelAngleLeg2) - parseInt(stainlessSteelAngleThickness)) *
          parseInt(stainlessSteelAngleThickness) *
          7850 *
          stainlessSteelAngleLength *
          stainlessSteelAngleQty *
          prices.inox) /
        1000
      ).toFixed(2),
    },
    {
      title: "Aluminium Angle Bars",
      description:
        "are an extruded aluminum product with inside radius corners that is intended for all structural applications where greater strength is required. Aluminium Angle Bars are widely used for all types of fabrication projects where lightweight and corrosion resistance is a concern - frame work, braces, supports, trailers, truck beds, etc.",
      properties: ["Yield = 144.83 N/mm²", "Tensile = 151.73 N/mm²", "Brinell Hardness = 40", "Melting Point = 643° C", "Magnetic = NO"],
      img1: "profiles/al_angle_bar.png",
      img2: "profiles/angle_bar_dims.png",
      density: 2710,
      dimsText1: "Leg 1 (mm):",
      dimsText2: "Leg 2 (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 39,
      dimsText2Margin: 39,
      dimsText3Margin: 10,
      dimsText4Margin: 21,
      dimsText5Margin: 42,
      angleBar: " ",
      dims: [aluminiumAngleLeg1, aluminiumAngleLeg2, aluminiumAngleThickness, aluminiumAngleQty, aluminiumAngleLength],
      dimsFuncs: [
        (e) => {
          setAluminiumAngleLeg1(e.target.value);
        },
        (e) => {
          setAluminiumAngleLeg2(e.target.value);
        },
        (e) => {
          setAluminiumAngleThickness(e.target.value);
        },
        (e) => {
          setAluminiumAngleQty(e.target.value);
        },
        (e) => {
          setAluminiumAngleLength(e.target.value);
        },
      ],
      weight: (
        0.000001 *
        (parseInt(aluminiumAngleLeg1) + parseInt(aluminiumAngleLeg2) - parseInt(aluminiumAngleThickness)) *
        parseInt(aluminiumAngleThickness) *
        2710 *
        aluminiumAngleLength *
        aluminiumAngleQty
      ).toFixed(2),
      price: (
        (0.000001 *
          (parseInt(aluminiumAngleLeg1) + parseInt(aluminiumAngleLeg2) - parseInt(aluminiumAngleThickness)) *
          parseInt(aluminiumAngleThickness) *
          2710 *
          aluminiumAngleLength *
          aluminiumAngleQty *
          prices.aluminium) /
        1000
      ).toFixed(2),
    },
    {
      title: "Steel Hexagonal Bars",
      description:
        "are a steel product with dimensional accuracy, tolerances, and smoother surface finish than hot rolled bar. This is a general purpose low carbon steel with good case hardening qualities and is especially suited for cold forming and bending. Overall, cold finished steel hexagons tend to have higher tensile and yield strength and improved smoothness.",
      properties: ["Yield = 372.3 N/mm²", "Tensile = 441.26 N/mm²", "Brinell Hardness = 126", "Melting Point = 1426° C", "Magnetic = YES"],
      img1: "profiles/hexagonal_bar.png",
      img2: "profiles/hexagonal_bar_dims.png",
      density: 7850,
      dimsText1: "Thickness A (mm):",
      dimsText2: "Thickness B (mm):",
      dimsText3: "Length (m):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 9,
      dimsText2Margin: 10,
      dimsText3Margin: 56,
      dimsText4Margin: 35,
      dims: [steelHexSize1, steelHexSize1 ? (steelHexSize1 / 0.8660254).toFixed(2) : " ", steelHexLength, steelHexQty],
      dimsFuncs: [
        (e) => {
          setSteelHexSize1(e.target.value);
        },
        (e) => {},
        (e) => {
          setsteelHexLength(e.target.value);
        },
        (e) => {
          setSteelHexQty(e.target.value);
        },
      ],
      value: steelHexSize1 ? (steelHexSize1 / 0.8660254).toFixed(2) : " ",
      weight: (0.000000866 * 7850 * (parseInt(steelHexSize1) ** 2 * parseInt(steelHexLength)) * steelHexQty).toFixed(2),
      price: ((0.000000866 * 7850 * (parseInt(steelHexSize1) ** 2 * parseInt(steelHexLength)) * steelHexQty * prices.steel) / 1000).toFixed(
        2
      ),
    },
    {
      title: "Stainless Steel Hexagonal Bars",
      description:
        "are made from high-quality stainless steel, which offers excellent corrosion resistance and durability. These bars are ideal in industries such as construction, automotive, aerospace, and manufacturing, where their low carbon content makes them ideal for cold forming and bending applications, offering excellent machinability and weldability.",
      properties: ["Yield = 262.3 N/mm²", "Tensile = 641.26 N/mm²", "Brinell Hardness = 230", "Melting Point = 1426° C", "Magnetic = NO"],
      img1: "profiles/hexagonal_bar.png",
      img2: "profiles/hexagonal_bar_dims.png",
      density: 7850,
      dimsText1: "Thickness A (mm):",
      dimsText2: "Thickness B (mm):",
      dimsText3: "Length (m):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 9,
      dimsText2Margin: 10,
      dimsText3Margin: 56,
      dimsText4Margin: 35,
      dims: [
        stainlessSteelHexSize1,
        stainlessSteelHexSize1 ? (stainlessSteelHexSize1 / 0.8660254).toFixed(2) : " ",
        stainlessSteelHexLength,
        stainlessSteelHexQty,
      ],
      dimsFuncs: [
        (e) => {
          setStainlessSteelHexSize1(e.target.value);
        },
        (e) => {},
        (e) => {
          setStainlessSteelHexLength(e.target.value);
        },
        (e) => {
          setStainlessSteelHexQty(e.target.value);
        },
      ],
      value: stainlessSteelHexSize1 ? (stainlessSteelHexSize1 / 0.8660254).toFixed(2) : " ",
      weight: (
        0.000000866 *
        7850 *
        (parseInt(stainlessSteelHexSize1) ** 2 * parseInt(stainlessSteelHexLength)) *
        stainlessSteelHexQty
      ).toFixed(2),
      price: (
        (0.000000866 *
          7850 *
          (parseInt(stainlessSteelHexSize1) ** 2 * parseInt(stainlessSteelHexLength)) *
          stainlessSteelHexQty *
          prices.inox) /
        1000
      ).toFixed(2),
    },
    {
      title: "Aluminium Hexagonal Bars",
      description:
        " are used in various industries, including aerospace, automotive, construction, and marine, where lightweight, corrosion-resistant, and high-strength materials are required. They are commonly used in the production of architectural structures and interior design elements, where aesthetics is a must.",
      properties: [
        "Yield = 275.3 N/mm²",
        "Tensile = 310.26 N/mm²",
        "Brinell Hardness = 95",
        "Melting Point = 555° C",
        "Elasticity = 70 GPa",
      ],
      img1: "profiles/hexagonal_bar.png",
      img2: "profiles/hexagonal_bar_dims.png",
      density: 2710,
      dimsText1: "Thickness A (mm):",
      dimsText2: "Thickness B (mm):",
      dimsText3: "Length (m):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 9,
      dimsText2Margin: 10,
      dimsText3Margin: 56,
      dimsText4Margin: 35,
      dims: [aluminiumHexSize1, aluminiumHexSize1 ? (aluminiumHexSize1 / 0.8660254).toFixed(2) : " ", aluminiumHexLength, aluminiumHexQty],
      dimsFuncs: [
        (e) => {
          setAluminiumHexSize1(e.target.value);
        },
        (e) => {},
        (e) => {
          setAluminiumHexLength(e.target.value);
        },
        (e) => {
          setAluminiumHexQty(e.target.value);
        },
      ],
      value: aluminiumHexSize1 ? (aluminiumHexSize1 / 0.8660254).toFixed(2) : " ",
      weight: (0.000000866 * 2710 * (parseInt(aluminiumHexSize1) ** 2 * parseInt(aluminiumHexLength)) * aluminiumHexQty).toFixed(2),
      price: (
        (0.000000866 * 2710 * (parseInt(aluminiumHexSize1) ** 2 * parseInt(aluminiumHexLength)) * aluminiumHexQty * prices.aluminium) /
        1000
      ).toFixed(2),
    },
    {
      title: "Steel Rectangular Bars",
      description:
        "are hot rolled, mild steel solid steel bars with radius corners ideal for all structural applications, general fabrication, manufacturing and repairs. These are widely used in industrial maintenance, agricultural implements, transportation equipment, ornamental iron work, fencing, artwork, etc. This steel shape is easy to weld, cut, form and machine with the proper equipment and knowledge.",
      properties: ["Yield = 248.2 N/mm²", "Tensile = 399.89 N/mm²", "Brinell Hardness = 133", "Melting Point = 1426° C", "Magnetic = YES"],
      img1: "profiles/rectangular_bar.png",
      img2: "profiles/rectangular_bar_dims.png",
      density: 7850,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Length (m):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 33,
      dimsText2Margin: 33,
      dimsText3Margin: 41,
      dimsText4Margin: 20,
      dims: [steelRectBarSide1, steelRectBarSide2, steelRectBarLength, steelRectBarQty],
      dimsFuncs: [
        (e) => {
          setSteelRectBarSide1(e.target.value);
        },
        (e) => {
          setSteelRectBarSide2(e.target.value);
        },
        (e) => {
          setSteelRectBarLength(e.target.value);
        },
        (e) => {
          setSteelRectBarQty(e.target.value);
        },
      ],
      weight: ((((steelRectBarSide1 / 1000) * steelRectBarSide2) / 1000) * steelRectBarLength * 7850 * steelRectBarQty).toFixed(2),
      price: (
        ((((steelRectBarSide1 / 1000) * steelRectBarSide2) / 1000) * steelRectBarLength * 7850 * steelRectBarQty * prices.steel) /
        1000
      ).toFixed(2),
    },
    {
      title: "Stainless Steel Rectangular Bars",
      description:
        "are austenitic chromium-nickel bars containing molybdenum which provides superior corrosion resistance and increased strength at elevated temperatures. Widely known as a food grade stainless or marine grade, these stainless bars are ideally suited for corrosion resistance against a wide range of chemical and acidic corrodents.",
      properties: ["Yield = 241.31 N/mm²", "Tensile = 551.58 N/mm²", "Brinell Hardness = 170", "Melting Point = 1426° C", "Magnetic = NO"],
      img1: "profiles/st_rectangular_bar.png",
      img2: "profiles/rectangular_bar_dims.png",
      density: 7850,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Length (m):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 33,
      dimsText2Margin: 33,
      dimsText3Margin: 41,
      dimsText4Margin: 20,
      dims: [stainlessSteelRectBarSide1, stainlessSteelRectBarSide2, stainlessSteelRectBarLength, stainlessSteelRectBarQty],
      dimsFuncs: [
        (e) => {
          setStainlessSteelRectBarSide1(e.target.value);
        },
        (e) => {
          setStainlessSteelRectBarSide2(e.target.value);
        },
        (e) => {
          setStainlessSteelRectBarLength(e.target.value);
        },
        (e) => {
          setStainlessSteelRectBarQty(e.target.value);
        },
      ],
      weight: (
        (((stainlessSteelRectBarSide1 / 1000) * stainlessSteelRectBarSide2) / 1000) *
        stainlessSteelRectBarLength *
        7850 *
        stainlessSteelRectBarQty
      ).toFixed(2),
      price: (
        ((((stainlessSteelRectBarSide1 / 1000) * stainlessSteelRectBarSide2) / 1000) *
          stainlessSteelRectBarLength *
          7850 *
          stainlessSteelRectBarQty *
          prices.inox) /
        1000
      ).toFixed(2),
    },
    {
      title: "Aluminium Rectangular Bars",
      description:
        " are extruded solid aluminum bars that are quite versatile, easy to work with and has a wide range of applications. These bars are widely used for all types of fabrication projects where lightweight and corrosion resistance is a concern. We have in stock hundreds of sizes that you can buy online in ready to ship, precut or mill lengths.",
      properties: [
        "Yield = 275.79 N/mm²",
        "Tensile = 310.26 N/mm²",
        "Brinell Hardness = 95",
        "Melting Point = 660° C",
        "Elasticity = 68.94 N/mm²",
      ],
      img1: "profiles/al_rectangular_bar.png",
      img2: "profiles/rectangular_bar_dims.png",
      density: 2710,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Length (m):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 33,
      dimsText2Margin: 33,
      dimsText3Margin: 41,
      dimsText4Margin: 20,
      dims: [aluminiumRectBarSide1, aluminiumRectBarSide2, aluminiumRectBarLength, aluminiumRectBarQty],
      dimsFuncs: [
        (e) => {
          setAluminiumRectBarSide1(e.target.value);
        },
        (e) => {
          setAluminiumRectBarSide2(e.target.value);
        },
        (e) => {
          setAluminiumRectBarLength(e.target.value);
        },
        (e) => {
          setAluminiumRectBarQty(e.target.value);
        },
      ],
      weight: (
        (((aluminiumRectBarSide1 / 1000) * aluminiumRectBarSide2) / 1000) *
        aluminiumRectBarLength *
        2710 *
        aluminiumRectBarQty
      ).toFixed(2),
      price: (
        ((((aluminiumRectBarSide1 / 1000) * aluminiumRectBarSide2) / 1000) *
          aluminiumRectBarLength *
          2710 *
          aluminiumRectBarQty *
          prices.aluminium) /
        1000
      ).toFixed(2),
    },
    {
      title: "Steel Round Bars",
      description:
        "are made of hot rolled, mild steel solid bar that is ideal for all general fabrication, manufacturing and repairs. These bars are widely used in industrial maintenance, agricultural implements, transportation equipment, ornamental iron work, fencing, artwork, etc. This steel shape is easy to weld, cut, form and drill with the proper equipment and knowledge.",
      properties: ["Yield = 248.2 N/mm²", "Tensile = 399.89 N/mm²", "Brinell Hardness = 133", "Melting Point = 1426° C", "Magnetic = YES"],
      img1: "profiles/round_bar.png",
      img2: "profiles/round_bar_dims.png",
      density: 7850,
      dimsText1: "Diameter (mm):",
      dimsText2: "Length (m):",
      dimsText3: "X (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 15,
      dimsText2Margin: 44,
      dimsText3Margin: 41,
      dimsText4Margin: 23,
      roundBar: " ",
      dims: [steelRoundBarDiam, steelRoundBarLength, steelRoundBarX, steelRoundBarQty],
      dimsFuncs: [
        (e) => {
          setSteelRoundBarDiam(e.target.value);
        },
        (e) => {
          setSteelRoundBarLength(e.target.value);
        },
        (e) => {
          setSteelRoundBarX(e.target.value);
        },
        (e) => {
          setSteelRoundBarQty(e.target.value);
        },
      ],
      weight: (0.00000079 * 7850 * (parseInt(steelRoundBarDiam) ** 2 * parseInt(steelRoundBarLength)) * steelRoundBarQty).toFixed(2),
      price: (
        (0.00000079 * 7850 * (parseInt(steelRoundBarDiam) ** 2 * parseInt(steelRoundBarLength)) * steelRoundBarQty * prices.steel) /
        1000
      ).toFixed(2),
    },
    {
      title: "Stainless Steel Round Bars",
      description:
        "are an economical grade of stainless that is ideal for all applications where strength and superior corrosion resistance is required. These bars have a durable dull, mill finish that is widely used for all types of fabrication projects that are exposed to the elements - chemical, acidic, fresh water, and salt water environments.",
      properties: ["Yield = 241.31 N/mm²", "Tensile = 551.58 N/mm²", "Brinell Hardness = 170", "Melting Point = 1426° C", "Magnetic = NO"],
      img1: "profiles/st_round_bar.png",
      img2: "profiles/round_bar_dims.png",
      density: 7850,
      dimsText1: "Diameter (mm):",
      dimsText2: "Length (m):",
      dimsText3: "X (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 15,
      dimsText2Margin: 44,
      dimsText3Margin: 41,
      dimsText4Margin: 23,
      roundBar: " ",
      dims: [stainlessSteelRoundBarDiam, stainlessSteelRoundBarLength, stainlessSteelRoundBarX, stainlessSteelRoundBarQty],
      dimsFuncs: [
        (e) => {
          setStainlessSteelRoundBarDiam(e.target.value);
        },
        (e) => {
          setStainlessSteelRoundBarLength(e.target.value);
        },
        (e) => {
          setStainlessSteelRoundBarX(e.target.value);
        },
        (e) => {
          setStainlessSteelRoundBarQty(e.target.value);
        },
      ],
      weight: (
        0.00000079 *
        7850 *
        (parseInt(stainlessSteelRoundBarDiam) ** 2 * parseInt(stainlessSteelRoundBarLength)) *
        stainlessSteelRoundBarQty
      ).toFixed(2),
      price: (
        (0.00000079 *
          7850 *
          (parseInt(stainlessSteelRoundBarDiam) ** 2 * parseInt(stainlessSteelRoundBarLength)) *
          stainlessSteelRoundBarQty *
          prices.inox) /
        1000
      ).toFixed(2),
    },
    {
      title: "Aluminium Round Bars",
      description:
        " are an extruded solid bar that are highly versatile, easy to work with and has a wide range of applications. These bars are widely used for all types of fabrication projects where lightweight and corrosion resistance is a concern (pins, shafts, dowles). We have in stock hundreds of sizes that you can buy online in ready to ship, precut or mill lengths.",
      properties: [
        "Yield = 275.79 N/mm²",
        "Tensile = 310.26 N/mm²",
        "Brinell Hardness = 95",
        "Melting Point = 660° C",
        "Elasticity = 68.94 N/mm²",
      ],
      img1: "profiles/al_round_bar.png",
      img2: "profiles/round_bar_dims.png",
      density: 2710,
      dimsText1: "Diameter (mm):",
      dimsText2: "Length (m):",
      dimsText3: "X (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 15,
      dimsText2Margin: 44,
      dimsText3Margin: 41,
      dimsText4Margin: 23,
      roundBar: " ",
      dims: [aluminiumRoundBarDiam, aluminiumRoundBarLength, aluminiumRoundBarX, aluminiumRoundBarQty],
      dimsFuncs: [
        (e) => {
          setAluminiumRoundBarDiam(e.target.value);
        },
        (e) => {
          setAluminiumRoundBarLength(e.target.value);
        },
        (e) => {
          setAluminiumRoundBarX(e.target.value);
        },
        (e) => {
          setAluminiumRoundBarQty(e.target.value);
        },
      ],
      weight: (
        0.00000079 *
        2710 *
        (parseInt(aluminiumRoundBarDiam) ** 2 * parseInt(aluminiumRoundBarLength)) *
        aluminiumRoundBarQty
      ).toFixed(2),
      price: (
        (0.00000079 *
          2710 *
          (parseInt(aluminiumRoundBarDiam) ** 2 * parseInt(aluminiumRoundBarLength)) *
          aluminiumRoundBarQty *
          prices.aluminium) /
        1000
      ).toFixed(2),
    },
    {
      title: "Steel Rectangular Tubes",
      description:
        "are welded tubings ideal for all structural applications, general fabrication, manufacturing and repairs. These tubes are widely used in industrial maintenance, agricultural implements, transportation equipment, truck beds, trailers, frames, etc. It's box-shape configuration allows for much greater strength and rigidity compared to angles or channels.",
      properties: ["Yield = 427.47 N/mm²", "Tensile = 399.89 N/mm²", "Brinell Hardness = 133", "Melting Point = 1426° C", "Magnetic = YES"],
      img1: "profiles/rectangular_tube.png",
      img2: "profiles/rectangular_tube_dims.png",
      density: 7850,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 38,
      dimsText2Margin: 38,
      dimsText3Margin: 15,
      dimsText4Margin: 26,
      dimsText5Margin: 47,
      rectTube: " ",
      dims: [steelRectTubeSide1, steelRectTubeSide2, steelRectTubeThickness, steelRectTubeQty, steelRectTubeLength],
      dimsFuncs: [
        (e) => {
          setSteelRectTubeSide1(e.target.value);
        },
        (e) => {
          setSteelRectTubeSide2(e.target.value);
        },
        (e) => {
          setSteelRectTubeThickness(e.target.value);
        },
        (e) => {
          setSteelRectTubeQty(e.target.value);
        },
        (e) => {
          setSteelRectTubeLength(e.target.value);
        },
      ],
      weight: (
        0.000001 *
        (parseInt(steelRectTubeSide1) + parseInt(steelRectTubeSide2) - 2 * steelRectTubeThickness) *
        2 *
        steelRectTubeThickness *
        steelRectTubeLength *
        7850 *
        steelRectTubeQty
      ).toFixed(2),
      price: (
        (0.000001 *
          (parseInt(steelRectTubeSide1) + parseInt(steelRectTubeSide2) - 2 * steelRectTubeThickness) *
          2 *
          steelRectTubeThickness *
          steelRectTubeLength *
          7850 *
          steelRectTubeQty *
          prices.steel) /
        1000
      ).toFixed(2),
    },
    {
      title: "Stainless Steel Rectangular Tubes",
      description:
        "are welded tubings with inside and outside radius corners and a protruding interior weld seam. These tubes are ideal for all structural applications where greater strength and superior corrosion resistance is required, in all types of fabrication projects that are exposed to chemical, acidic, fresh water, and salt water environments.",
      properties: ["Yield = 241.31 N/mm²", "Tensile = 551.58 N/mm²", "Brinell Hardness = 170", "Melting Point = 1426° C", "Magnetic = NO"],
      img1: "profiles/st_rectangular_tube.png",
      img2: "profiles/rectangular_tube_dims.png",
      density: 7850,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 38,
      dimsText2Margin: 38,
      dimsText3Margin: 15,
      dimsText4Margin: 26,
      dimsText5Margin: 47,
      rectTube: " ",
      dims: [
        stainlessSteelRectTubeSide1,
        stainlessSteelRectTubeSide2,
        stainlessSteelRectTubeThickness,
        stainlessSteelRectTubeQty,
        stainlessSteelRectTubeLength,
      ],
      dimsFuncs: [
        (e) => {
          setStainlessSteelRectTubeSide1(e.target.value);
        },
        (e) => {
          setStainlessSteelRectTubeSide2(e.target.value);
        },
        (e) => {
          setStainlessSteelRectTubeThickness(e.target.value);
        },
        (e) => {
          setStainlessSteelRectTubeQty(e.target.value);
        },
        (e) => {
          setStainlessSteelRectTubeLength(e.target.value);
        },
      ],
      weight: (
        0.000001 *
        (parseInt(stainlessSteelRectTubeSide1) + parseInt(stainlessSteelRectTubeSide2) - 2 * stainlessSteelRectTubeThickness) *
        2 *
        stainlessSteelRectTubeThickness *
        stainlessSteelRectTubeLength *
        7850 *
        stainlessSteelRectTubeQty
      ).toFixed(2),
      price: (
        (0.000001 *
          (parseInt(stainlessSteelRectTubeSide1) + parseInt(stainlessSteelRectTubeSide2) - 2 * stainlessSteelRectTubeThickness) *
          2 *
          stainlessSteelRectTubeThickness *
          stainlessSteelRectTubeLength *
          7850 *
          stainlessSteelRectTubeQty *
          prices.inox) /
        1000
      ).toFixed(2),
    },
    {
      title: "Aluminium Rectangular Tubes",
      description:
        "are an extruded aluminum tube that is widely used for all types of fabrication projects where lightweight and corrosion resistance is a primary concern - frame work, support columns, gates, fencing, handrails, etc. These tubes have right corners inside/outside, with no weld seam. We have in stock hundreds of sizes that you can buy online in ready to ship, precut or mill lengths.",
      properties: [
        "Yield = 275.79 N/mm²",
        "Tensile = 310.26 N/mm²",
        "Brinell Hardness = 95",
        "Melting Point = 660° C",
        "Elasticity = 68.94 N/mm²",
      ],
      img1: "profiles/al_rectangular_tube.png",
      img2: "profiles/rectangular_tube_dims.png",
      density: 2710,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Thickness (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 38,
      dimsText2Margin: 38,
      dimsText3Margin: 15,
      dimsText4Margin: 26,
      dimsText5Margin: 47,
      rectTube: " ",
      dims: [aluminiumRectTubeSide1, aluminiumRectTubeSide2, aluminiumRectTubeThickness, aluminiumRectTubeQty, aluminiumRectTubeLength],
      dimsFuncs: [
        (e) => {
          setAluminiumRectTubeSide1(e.target.value);
        },
        (e) => {
          setAluminiumRectTubeSide2(e.target.value);
        },
        (e) => {
          setAluminiumRectTubeThickness(e.target.value);
        },
        (e) => {
          setAluminiumRectTubeQty(e.target.value);
        },
        (e) => {
          setAluminiumRectTubeLength(e.target.value);
        },
      ],
      weight: (
        0.000001 *
        (parseInt(aluminiumRectTubeSide1) + parseInt(aluminiumRectTubeSide2) - 2 * aluminiumRectTubeThickness) *
        2 *
        aluminiumRectTubeThickness *
        aluminiumRectTubeLength *
        2710 *
        aluminiumRectTubeQty
      ).toFixed(2),
      price: (
        (0.000001 *
          (parseInt(aluminiumRectTubeSide1) + parseInt(aluminiumRectTubeSide2) - 2 * aluminiumRectTubeThickness) *
          2 *
          aluminiumRectTubeThickness *
          aluminiumRectTubeLength *
          2710 *
          aluminiumRectTubeQty *
          prices.aluminium) /
        1000
      ).toFixed(2),
    },
    {
      title: "Steel Round Tubes",
      description:
        "are mechanical welded tubes with the internal weld seam removed creating a smooth internal surface. These tubes have been drawn over a mandrel to produce a tube with more precise dimensional accuracy and tolerances, with a very smooth inside and outside finish. These tubes are ideal for more stressful applications requiring uniformity, strength, and soundness.",
      properties: ["Yield = 482.63 N/mm²", "Tensile = 551.58 N/mm²", "Brinell Hardness = 80", "Melting Point = 1426° C", "Magnetic = YES"],
      img1: "profiles/round_tube.png",
      img2: "profiles/round_tube_dims.png",
      density: 7850,
      dimsText1: "Diameter (mm):",
      dimsText2: "Thickness (mm):",
      dimsText3: "Length (m):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 19,
      dimsText2Margin: 15,
      dimsText3Margin: 47,
      dimsText4Margin: 26,
      dims: [steelRoundTubeDiam, steelRoundTubeThickness, steelRoundTubeLength, steelRoundTubeQty],
      dimsFuncs: [
        (e) => {
          setSteelRoundTubeDiam(e.target.value);
        },
        (e) => {
          setSteelRoundTubeThickness(e.target.value);
        },
        (e) => {
          setSteelRoundTubeLength(e.target.value);
        },
        (e) => {
          setSteelRoundTubeQty(e.target.value);
        },
      ],
      weight: (
        0.00000314 *
        7850 *
        (parseInt(steelRoundTubeDiam) - parseInt(steelRoundTubeThickness)) *
        steelRoundTubeThickness *
        steelRoundTubeLength *
        steelRoundTubeQty
      ).toFixed(2),
      price: (
        (0.00000314 *
          7850 *
          (parseInt(steelRoundTubeDiam) - parseInt(steelRoundTubeThickness)) *
          steelRoundTubeThickness *
          steelRoundTubeLength *
          steelRoundTubeQty *
          prices.steel) /
        1000
      ).toFixed(2),
    },
    {
      title: "Stainless Steel Round Tubes",
      description:
        "are welded tubings with inside and outside radius corners and a protruding interior weld seam. These tubes are ideal for all structural applications where greater strength and superior corrosion resistance is required, in all types of fabrication projects that are exposed to chemical, acidic, fresh water, and salt water environments.",
      properties: ["Yield = 234.42 N/mm²", "Tensile = 592.94 N/mm²", "Brinell Hardness = 170", "Melting Point = 1426° C", "Magnetic = NO"],
      img1: "profiles/st_round_tube.png",
      img2: "profiles/round_tube_dims.png",
      density: 7850,
      dimsText1: "Diameter (mm):",
      dimsText2: "Thickness (mm):",
      dimsText3: "Length (m):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 19,
      dimsText2Margin: 15,
      dimsText3Margin: 47,
      dimsText4Margin: 26,
      dims: [stainlessSteelRoundTubeDiam, stainlessSteelRoundTubeThickness, stainlessSteelRoundTubeLength, stainlessSteelRoundTubeQty],
      dimsFuncs: [
        (e) => {
          setStainlessSteelRoundTubeDiam(e.target.value);
        },
        (e) => {
          setStainlessSteelRoundTubeThickness(e.target.value);
        },
        (e) => {
          setStainlessSteelRoundTubeLength(e.target.value);
        },
        (e) => {
          setStainlessSteelRoundTubeQty(e.target.value);
        },
      ],
      weight: (
        0.00000314 *
        7850 *
        (parseInt(stainlessSteelRoundTubeDiam) - parseInt(stainlessSteelRoundTubeThickness)) *
        stainlessSteelRoundTubeThickness *
        stainlessSteelRoundTubeLength *
        stainlessSteelRoundTubeQty
      ).toFixed(2),
      price: (
        (0.00000314 *
          7850 *
          (parseInt(stainlessSteelRoundTubeDiam) - parseInt(stainlessSteelRoundTubeThickness)) *
          stainlessSteelRoundTubeThickness *
          stainlessSteelRoundTubeLength *
          stainlessSteelRoundTubeQty *
          prices.inox) /
        1000
      ).toFixed(2),
    },
    {
      title: "Aluminium Round Tubes",
      description:
        "is a round hollow extruded tube that is widely used for all types of fabrication projects where strength along with lightweight and corrosion resistance is a primary concern. The interior is smooth with no seam and is available in a less expensive, extruded structural aluminum round tube or a more pricey drawn seamless aluminium round tube for higher precision applications.",
      properties: [
        "Yield = 275.79 N/mm²",
        "Tensile = 310.26 N/mm²",
        "Brinell Hardness = 95",
        "Melting Point = 660° C",
        "Elasticity = 68.94 N/mm²",
      ],
      img1: "profiles/al_round_tube.png",
      img2: "profiles/round_tube_dims.png",
      density: 2710,
      dimsText1: "Diameter (mm):",
      dimsText2: "Thickness (mm):",
      dimsText3: "Length (m):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 19,
      dimsText2Margin: 15,
      dimsText3Margin: 47,
      dimsText4Margin: 26,
      dims: [aluminiumRoundTubeDiam, aluminiumRoundTubeThickness, aluminiumRoundTubeLength, aluminiumRoundTubeQty],
      dimsFuncs: [
        (e) => {
          setAluminiumRoundTubeDiam(e.target.value);
        },
        (e) => {
          setAluminiumRoundTubeThickness(e.target.value);
        },
        (e) => {
          setAluminiumRoundTubeLength(e.target.value);
        },
        (e) => {
          setAluminiumRoundTubeQty(e.target.value);
        },
      ],
      weight: (
        0.00000314 *
        2710 *
        (parseInt(aluminiumRoundTubeDiam) - parseInt(aluminiumRoundTubeThickness)) *
        aluminiumRoundTubeThickness *
        aluminiumRoundTubeLength *
        aluminiumRoundTubeQty
      ).toFixed(2),
      price: (
        (0.00000314 *
          2710 *
          (parseInt(aluminiumRoundTubeDiam) - parseInt(aluminiumRoundTubeThickness)) *
          aluminiumRoundTubeThickness *
          aluminiumRoundTubeLength *
          aluminiumRoundTubeQty *
          prices.aluminium) /
        1000
      ).toFixed(2),
    },
    {
      title: "Steel Channels",
      description:
        "are a hot rolled, mild steel structural C shape with inside radius corners that are ideal for all structural applications, general fabrication, manufacturing and repairs, widely used in industrial maintenance, transportation equipment, truck beds, trailers, etc. It's C-shape or U-shape configuration is ideal for added strength and rigidity over steel angle when your project's load is vertical or horizontal.",
      properties: ["Yield = 248.63 N/mm²", "Tensile = 399.89 N/mm²", "Brinell Hardness = 133", "Melting Point = 1426° C", "Magnetic = YES"],
      img1: "profiles/channel.png",
      img2: "profiles/channel_dims.png",
      density: 7850,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Side C (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 26,
      dimsText2Margin: 26,
      dimsText3Margin: 26,
      dimsText4Margin: 15,
      dimsText5Margin: 36,
      channel: " ",
      dims: [steelChannelSide1, steelChannelSide2, steelChannelSide3, steelChannelQty, steelChannelLength],
      dimsFuncs: [
        (e) => {
          setSteelChannelSide1(e.target.value);
        },
        (e) => {
          setSteelChannelSide2(e.target.value);
        },
        (e) => {
          setSteelChannelSide3(e.target.value);
        },
        (e) => {
          setSteelChannelQty(e.target.value);
        },
        (e) => {
          setSteelChannelLength(e.target.value);
        },
      ],
      weight: (
        ((steelChannelSide1 - 2 * steelChannelSide3) * steelChannelSide3 + steelChannelSide2 * steelChannelSide3 * 2) *
        0.000001 *
        steelChannelLength *
        7850 *
        steelChannelQty
      ).toFixed(2),
      price: (
        (((steelChannelSide1 - 2 * steelChannelSide3) * steelChannelSide3 + steelChannelSide2 * steelChannelSide3 * 2) *
          0.000001 *
          steelChannelLength *
          7850 *
          steelChannelQty *
          prices.steel) /
        1000
      ).toFixed(2),
    },
    {
      title: "Stainless Steel Channels",
      description:
        "are a hot rolled stainless channel shape with inside radius corners that are ideal for all structural applications where greater strength and superior corrosion resistance is required. These profiles have a durable dull, grainy mill finish that is widely used for all types of fabrication projects that are exposed to chemical, acidic, fresh water, and salt water environments.",
      properties: ["Yield = 234.42 N/mm²", "Tensile = 586.06 N/mm²", "Brinell Hardness = 170", "Melting Point = 1426° C", "Magnetic = NO"],
      img1: "profiles/st_channel.png",
      img2: "profiles/channel_dims.png",
      density: 7850,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Side C (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 26,
      dimsText2Margin: 26,
      dimsText3Margin: 26,
      dimsText4Margin: 15,
      dimsText5Margin: 36,
      channel: " ",
      dims: [
        stainlessSteelChannelSide1,
        stainlessSteelChannelSide2,
        stainlessSteelChannelSide3,
        stainlessSteelChannelQty,
        stainlessSteelChannelLength,
      ],
      dimsFuncs: [
        (e) => {
          setStainlessSteelChannelSide1(e.target.value);
        },
        (e) => {
          setStainlessSteelChannelSide2(e.target.value);
        },
        (e) => {
          setStainlessSteelChannelSide3(e.target.value);
        },
        (e) => {
          setStainlessSteelChannelQty(e.target.value);
        },
        (e) => {
          setStainlessSteelChannelLength(e.target.value);
        },
      ],
      weight: (
        ((stainlessSteelChannelSide1 - 2 * stainlessSteelChannelSide3) * stainlessSteelChannelSide3 +
          stainlessSteelChannelSide2 * stainlessSteelChannelSide3 * 2) *
        0.000001 *
        stainlessSteelChannelLength *
        7850 *
        stainlessSteelChannelQty
      ).toFixed(2),
      price: (
        (((stainlessSteelChannelSide1 - 2 * stainlessSteelChannelSide3) * stainlessSteelChannelSide3 +
          stainlessSteelChannelSide2 * stainlessSteelChannelSide3 * 2) *
          0.000001 *
          stainlessSteelChannelLength *
          7850 *
          stainlessSteelChannelQty *
          prices.inox) /
        1000
      ).toFixed(2),
    },
    {
      title: "Aluminium Channels",
      description:
        "are an extruded aluminium product with inside radius corners that is intended for all structural applications where greater strength is required. These profiles are widely used for all types of fabrication projects where lightweight and corrosion resistance is a concern. We have in stock hundreds of sizes that you can buy online in ready to ship, precut or mill lengths.",
      properties: [
        "Yield = 275.79 N/mm²",
        "Tensile = 310.26 N/mm²",
        "Brinell Hardness = 95",
        "Melting Point = 660° C",
        "Elasticity = 68.94 N/mm²",
      ],
      img1: "profiles/al_channel.png",
      img2: "profiles/channel_dims.png",
      density: 2710,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Side C (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 26,
      dimsText2Margin: 26,
      dimsText3Margin: 26,
      dimsText4Margin: 15,
      dimsText5Margin: 36,
      channel: " ",
      dims: [aluminiumChannelSide1, aluminiumChannelSide2, aluminiumChannelSide3, aluminiumChannelQty, aluminiumChannelLength],
      dimsFuncs: [
        (e) => {
          setAluminiumChannelSide1(e.target.value);
        },
        (e) => {
          setAluminiumChannelSide2(e.target.value);
        },
        (e) => {
          setAluminiumChannelSide3(e.target.value);
        },
        (e) => {
          setAluminiumChannelQty(e.target.value);
        },
        (e) => {
          setAluminiumChannelLength(e.target.value);
        },
      ],
      weight: (
        ((aluminiumChannelSide1 - 2 * aluminiumChannelSide3) * aluminiumChannelSide3 + aluminiumChannelSide2 * aluminiumChannelSide3 * 2) *
        0.000001 *
        aluminiumChannelLength *
        2710 *
        aluminiumChannelQty
      ).toFixed(2),
      price: (
        (((aluminiumChannelSide1 - 2 * aluminiumChannelSide3) * aluminiumChannelSide3 + aluminiumChannelSide2 * aluminiumChannelSide3 * 2) *
          0.000001 *
          aluminiumChannelLength *
          2710 *
          aluminiumChannelQty *
          prices.aluminium) /
        1000
      ).toFixed(2),
    },
    {
      title: "Steel Beams",
      description:
        "are widely used throughout the construction industry when supporting heavy loads is required providing great load bearing support when used horizontally or standing as columns. This beam shape has a wider profile for added horizontal strength, making it ideal for sky scrapers or as a house beam, along with bridge beams, trailers, platforms, etc.",
      properties: ["Yield = 448.16 N/mm²", "Tensile = 448.16 N/mm²", "Brinell Hardness = 135", "Melting Point = 1426° C", "Magnetic = YES"],
      img1: "profiles/beam.png",
      img2: "profiles/beam_dims.png",
      density: 7850,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Side C (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 26,
      dimsText2Margin: 26,
      dimsText3Margin: 26,
      dimsText4Margin: 15,
      dimsText5Margin: 36,
      beam: " ",
      dims: [steelBeamSide1, steelBeamSide2, steelBeamSide3, steelBeamQty, steelBeamLength],
      dimsFuncs: [
        (e) => {
          setSteelBeamSide1(e.target.value);
        },
        (e) => {
          setSteelBeamSide2(e.target.value);
        },
        (e) => {
          setSteelBeamSide3(e.target.value);
        },
        (e) => {
          setSteelBeamQty(e.target.value);
        },
        (e) => {
          setSteelBeamLength(e.target.value);
        },
      ],
      weight: (
        ((steelBeamSide1 - 2 * steelBeamSide2) * steelBeamSide2 + steelBeamSide2 * steelBeamSide3 * 2) *
        0.000001 *
        steelBeamLength *
        7850 *
        steelBeamQty
      ).toFixed(2),
      price: (
        (((steelBeamSide1 - 2 * steelBeamSide2) * steelBeamSide2 + steelBeamSide2 * steelBeamSide3 * 2) *
          0.000001 *
          steelBeamLength *
          7850 *
          steelBeamQty *
          prices.steel) /
        1000
      ).toFixed(2),
    },
    {
      title: "Stainless Steel Beams",
      description:
        "are widely used throughout the construction industry when supporting heavy loads is required providing great load bearing support when used horizontally or standing as columns. This beam shape has a wider profile for added horizontal strength, making it ideal for sky scrapers or as a house beam, along with bridge beams, trailers, platforms, etc.",
      properties: ["Yield = 344.73 N/mm²", "Tensile = 551.58 N/mm²", "Brinell Hardness = 170", "Melting Point = 1426° C", "Magnetic = NO"],
      img1: "profiles/st_beam.png",
      img2: "profiles/beam_dims.png",
      density: 7850,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Side C (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 26,
      dimsText2Margin: 26,
      dimsText3Margin: 26,
      dimsText4Margin: 15,
      dimsText5Margin: 36,
      beam: " ",
      dims: [stainlessSteelBeamSide1, stainlessSteelBeamSide2, stainlessSteelBeamSide3, stainlessSteelBeamQty, stainlessSteelBeamLength],
      dimsFuncs: [
        (e) => {
          setStainlessSteelBeamSide1(e.target.value);
        },
        (e) => {
          setStainlessSteelBeamSide2(e.target.value);
        },
        (e) => {
          setStainlessSteelBeamSide3(e.target.value);
        },
        (e) => {
          setStainlessSteelBeamQty(e.target.value);
        },
        (e) => {
          setStainlessSteelBeamLength(e.target.value);
        },
      ],
      weight: (
        ((stainlessSteelBeamSide1 - 2 * stainlessSteelBeamSide2) * stainlessSteelBeamSide2 +
          stainlessSteelBeamSide2 * stainlessSteelBeamSide3 * 2) *
        0.000001 *
        stainlessSteelBeamLength *
        7850 *
        stainlessSteelBeamQty
      ).toFixed(2),
      price: (
        (((stainlessSteelBeamSide1 - 2 * stainlessSteelBeamSide2) * stainlessSteelBeamSide2 +
          stainlessSteelBeamSide2 * stainlessSteelBeamSide3 * 2) *
          0.000001 *
          stainlessSteelBeamLength *
          7850 *
          stainlessSteelBeamQty *
          prices.inox) /
        1000
      ).toFixed(2),
    },
    {
      title: "Aluminium Beams",
      description:
        "are an extruded aluminium product with inside radius corners that is intended for all structural applications where greater strength is required. These profiles are widely used for all types of fabrication projects where lightweight and corrosion resistance is a concern. We have in stock hundreds of sizes that you can buy online in ready to ship, precut or mill lengths.",
      properties: [
        "Yield = 275.79 N/mm²",
        "Tensile = 310.26 N/mm²",
        "Brinell Hardness = 95",
        "Melting Point = 660° C",
        "Elasticity = 68.94 N/mm²",
      ],
      img1: "profiles/al_beam.png",
      img2: "profiles/beam_dims.png",
      density: 2710,
      dimsText1: "Side A (mm):",
      dimsText2: "Side B (mm):",
      dimsText3: "Side C (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText5: "Length (m):",
      dimsText1Margin: 26,
      dimsText2Margin: 26,
      dimsText3Margin: 26,
      dimsText4Margin: 15,
      dimsText5Margin: 36,
      beam: " ",
      dims: [aluminiumBeamSide1, aluminiumBeamSide2, aluminiumBeamSide3, aluminiumBeamQty, aluminiumBeamLength],
      dimsFuncs: [
        (e) => {
          setAluminiumBeamSide1(e.target.value);
        },
        (e) => {
          setAluminiumBeamSide2(e.target.value);
        },
        (e) => {
          setAluminiumBeamSide3(e.target.value);
        },
        (e) => {
          setAluminiumBeamQty(e.target.value);
        },
        (e) => {
          setAluminiumBeamLength(e.target.value);
        },
      ],
      weight: (
        ((aluminiumBeamSide1 - 2 * aluminiumBeamSide2) * aluminiumBeamSide2 + aluminiumBeamSide2 * aluminiumBeamSide3 * 2) *
        0.000001 *
        aluminiumBeamLength *
        2710 *
        aluminiumBeamQty
      ).toFixed(2),
      price: (
        (((aluminiumBeamSide1 - 2 * aluminiumBeamSide2) * aluminiumBeamSide2 + aluminiumBeamSide2 * aluminiumBeamSide3 * 2) *
          0.000001 *
          aluminiumBeamLength *
          2710 *
          aluminiumBeamQty *
          prices.aluminium) /
        1000
      ).toFixed(2),
    },
    {
      title: "Steel Bulbs",
      description:
        "are the most cost-effective, efficient and corrosion-resistant solution for plate stiffening requirements. Key advantages include an excellent strength to weight ratio, delivering buckling resistance at a lower weight than with flat bars or angle bars. The rounded edges of the bulb profile mean there is no need for edge grinding prior to painting, saving time and money during fabrication.",
      properties: ["Yield = 448.16 N/mm²", "Tensile = 448.16 N/mm²", "Brinell Hardness = 135", "Melting Point = 1426° C", "Magnetic = YES"],
      img1: "profiles/bulb.png",
      img2: "profiles/bulb_dims.png",
      density: 7850,
      dimsText1: "A x B (mm):",
      dimsText2: "Length (m):",
      dimsText3: "X (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 37,
      dimsText2Margin: 37,
      dimsText3Margin: 41,
      dimsText4Margin: 15,
      bulb: " ",
      dims: [steelBulbSize, steelBulbLength, steelBulbX, steelBulbQty],
      dimsFuncs: [
        (e) => {
          setSteelBulbSize(e.target.value);
        },
        (e) => {
          setSteelBulbLength(e.target.value);
        },
        (e) => {
          setSteelBulbX(e.target.value);
        },
        (e) => {
          setSteelBulbQty(e.target.value);
        },
      ],
      weight: (bulbTypes[steelBulbSize] * steelBulbLength * steelBulbQty).toFixed(2),
      price: ((bulbTypes[steelBulbSize] * steelBulbLength * steelBulbQty * prices.steel) / 1000).toFixed(2),
    },
    {
      title: "Stainless Steel Bulbs",
      description:
        "are widely used throughout the construction industry when supporting heavy loads is required providing great load bearing support when used horizontally or standing as columns. This beam shape has a wider profile for added horizontal strength, making it ideal for sky scrapers or as a house beam, along with bridge beams, trailers, platforms, etc.",
      properties: ["Yield = 344.73 N/mm²", "Tensile = 551.58 N/mm²", "Brinell Hardness = 170", "Melting Point = 1426° C", "Magnetic = NO"],
      img1: "profiles/bulb.png",
      img2: "profiles/bulb_dims.png",
      density: 7850,
      dimsText1: "A x B (mm):",
      dimsText2: "Length (m):",
      dimsText3: "X (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 37,
      dimsText2Margin: 37,
      dimsText3Margin: 41,
      dimsText4Margin: 15,
      bulb: " ",
      dims: [stainlessSteelBulbSize, stainlessSteelBulbLength, stainlessSteelBulbX, stainlessSteelBulbQty],
      dimsFuncs: [
        (e) => {
          setStainlessSteelBulbSize(e.target.value);
        },
        (e) => {
          setStainlessSteelBulbLength(e.target.value);
        },
        (e) => {
          setStainlessSteelBulbX(e.target.value);
        },
        (e) => {
          setStainlessSteelBulbQty(e.target.value);
        },
      ],
      weight: (bulbTypes[stainlessSteelBulbSize] * stainlessSteelBulbLength * stainlessSteelBulbQty).toFixed(2),
      price: ((bulbTypes[stainlessSteelBulbSize] * stainlessSteelBulbLength * stainlessSteelBulbQty * prices.inox) / 1000).toFixed(2),
    },
    {
      title: "Aluminium Bulbs",
      description:
        "are an extruded aluminium product with inside radius corners that is intended for all structural applications where greater strength is required. These profiles are widely used for all types of fabrication projects where lightweight and corrosion resistance is a concern. We have in stock hundreds of sizes that you can buy online in ready to ship, precut or mill lengths.",
      properties: [
        "Yield = 275.79 N/mm²",
        "Tensile = 310.26 N/mm²",
        "Brinell Hardness = 95",
        "Melting Point = 660° C",
        "Elasticity = 68.94 N/mm²",
      ],
      img1: "profiles/bulb.png",
      img2: "profiles/bulb_dims.png",
      density: 2710,
      dimsText1: "A x B (mm):",
      dimsText2: "Length (m):",
      dimsText3: "X (mm):",
      dimsText4: "Quantity (pcs):",
      dimsText1Margin: 37,
      dimsText2Margin: 37,
      dimsText3Margin: 41,
      dimsText4Margin: 15,
      bulb: " ",
      dims: [aluminiumBulbSize, aluminiumBulbLength, aluminiumBulbX, aluminiumBulbQty],
      dimsFuncs: [
        (e) => {
          setAluminiumBulbSize(e.target.value);
        },
        (e) => {
          setAluminiumBulbLength(e.target.value);
        },
        (e) => {
          setAluminiumBulbX(e.target.value);
        },
        (e) => {
          setAluminiumBulbQty(e.target.value);
        },
      ],
      weight: (bulbTypes[aluminiumBulbSize] * aluminiumBulbLength * aluminiumBulbQty).toFixed(2),
      price: ((bulbTypes[aluminiumBulbSize] * aluminiumBulbLength * aluminiumBulbQty * prices.aluminium) / 1000).toFixed(2),
    },
  ];

  const products = prodInfo.map((item, index) => {
    const handleAddProducts = () => {
      sessionStorage.setItem("description", item.title.slice(0, -1));
      sessionStorage.setItem(
        "size",
        item.title.includes("Plates") ||
          item.title.includes("Flat") ||
          item.title.includes("Angle") ||
          item.title.includes("Rectangular Tube") ||
          item.title.includes("Channel")
          ? item.dims[0] + "x" + item.dims[1] + "x" + item.dims[2]
          : item.title.includes("Hex") || item.title.includes("Round Bar")
          ? "∅" + item.dims[0]
          : item.title.includes("Round Tube")
          ? "∅" + item.dims[0] + "x" + item.dims[1]
          : item.title.includes("Rectangular Bar")
          ? item.dims[0] + "x" + item.dims[1]
          : item.title.includes("Beam")
          ? item.dims[0] + "x" + item.dims[2] + "x" + item.dims[1]
          : item.title.includes("Bulb")
          ? item.dims[0]
          : item.dims[0] + "x" + item.dims[1] + "x" + item.dims[2]
      );
      sessionStorage.setItem(
        "length",
        item.title.includes("Plates") || item.title.includes("Flat")
          ? "-"
          : item.title.includes("Angle") ||
            item.title.includes("Rectangular Tube") ||
            item.title.includes("Channel") ||
            item.title.includes("Beam")
          ? item.dims[4]
          : item.title.includes("Hex") || item.title.includes("Rectangular Bar") || item.title.includes("Round Tube")
          ? item.dims[2]
          : item.title.includes("Round Bar") || item.title.includes("Bulb")
          ? item.dims[1]
          : item.dims[0]
      );
      sessionStorage.setItem("quantity", item.dims[3]);
      sessionStorage.setItem("weight", item.weight);
      sessionStorage.setItem("price", item.price);
    };

    return {
      [item.title]: {
        content: (
          <div className="content_plates" key={index}>
            <div className="product_intro">
              <span>
                <u style={{ marginLeft: 50, color: "yellow", fontSize: 18 }}>{item.title}</u> {item.description}
              </span>
            </div>
            <div className="product_props">
              <div>
                <span style={{ textDecoration: "underline", color: "yellow", marginBottom: 20 }}>Mechanical Properties:</span>
                <br />
                {item.properties.map((item, index) => {
                  return (
                    <div key={index} style={{ marginTop: 10 }}>
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
              <img
                src={item.img1}
                alt="prodImg"
                style={{ width: 200 }}
                className={`product_img ${isImgScaled ? "scaleImgProd" : ""}`}
                ref={imgRef}
                onClick={handleClickImg}
                key={index}
              />
              <img
                src={item.img2}
                alt="prodImg"
                style={{ width: 200 }}
                className={`product_img2 ${isImg2Scaled ? "scaleImg2Prod" : ""}`}
                ref={imgRef2}
                onClick={handleClickImg2}
                key={index + 1}
              />
            </div>
            <div className="product_size">
              <span style={{ textDecoration: "underline", color: "yellow" }}>Set dimensions:</span> <br />
              {item.bulb ? (
                <>
                  <span style={{ marginRight: item.dimsText1Margin }}>{item.dimsText1}</span>
                  <select id="with-value" type="text" required onChange={item.dimsFuncs[0]}>
                    <option value="">Your profile...</option>
                    {Object.keys(bulbTypes).map((item, index) => (
                      <option key={index}>{item}</option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <span style={{ marginRight: item.dimsText1Margin }}>{item.dimsText1}</span>
                  <input id="with-value" type="text" required onChange={item.dimsFuncs[0]} />
                </>
              )}
              <span style={{ marginLeft: 30, marginRight: 10 }}>Density (kg/m³):</span>
              <input
                type="text"
                readOnly
                value={item.density}
                style={{
                  background: "black",
                  color: "white",
                }}
              />
              <br />
              <span style={{ marginRight: item.dimsText2Margin }}>{item.dimsText2}</span>
              {item.value ? (
                <input type="text" required onChange={item.dimsFuncs[1]} value={item.value} />
              ) : (
                <input type="text" required onChange={item.dimsFuncs[1]} />
              )}
              <span style={{ marginLeft: 30, marginRight: 38 }}>Weight (kg):</span>
              <input
                type="text"
                readOnly
                value={
                  item.roundBar || item.bulb
                    ? item.dims[0] === "" || item.dims[1] === ""
                      ? ""
                      : item.weight
                    : item.rectTube || item.angleBar || item.channel || item.beam
                    ? item.dims[0] === "" || item.dims[1] === "" || item.dims[2] === "" || item.dims[4] === ""
                      ? ""
                      : item.weight
                    : item.dims[0] === "" || item.dims[1] === "" || item.dims[2] === ""
                    ? ""
                    : item.weight
                }
                style={{
                  background: "black",
                  color: "white",
                }}
                key={index}
              />
              <br />
              {item.roundBar || item.bulb ? (
                ""
              ) : (
                <>
                  <span style={{ marginRight: item.dimsText3Margin }}>{item.dimsText3}</span>
                  <input type="text" required onChange={item.dimsFuncs[2]} />
                  <span style={{ marginLeft: 30, marginRight: 63 }}>Price ($):</span>
                  <input
                    type="text"
                    readOnly
                    value={item.dims[0] === "" || item.dims[1] === "" || item.dims[2] === "" || item.dims[4] === "" ? "" : item.price}
                    style={{
                      background: "black",
                      color: "white",
                    }}
                  />
                  <br />
                </>
              )}
              {item.rectTube || item.angleBar || item.channel || item.beam ? (
                <>
                  <span style={{ marginRight: item.dimsText5Margin }}>{item.dimsText5}</span>
                  <input type="text" required onChange={item.dimsFuncs[4]} /> <br />
                </>
              ) : (
                ""
              )}
              {item.roundBar || item.bulb ? (
                <>
                  <span style={{ marginRight: item.dimsText4Margin }}>{item.dimsText4}</span>
                  <input type="number" min={1} defaultValue={1} onChange={item.dimsFuncs[3]} style={{}} />
                  <span style={{ marginLeft: 30, marginRight: 63 }}>Price ($):</span>
                  <input
                    type="text"
                    readOnly
                    value={item.dims[0] === "" || item.dims[1] === "" ? "" : item.price}
                    style={{
                      background: "black",
                      color: "white",
                    }}
                  />
                </>
              ) : (
                <>
                  <span style={{ marginRight: item.dimsText4Margin }}>{item.dimsText4}</span>
                  <input type="number" min={1} defaultValue={1} onChange={item.dimsFuncs[3]} style={{}} /> <br />
                </>
              )}
            </div>
            <div className="product_cart">
              <button
                className="product_cart_button"
                onClick={handleAddProducts}
                disabled={
                  item.roundBar || item.bulb
                    ? item.dims[0] === "" || item.dims[1] === ""
                    : item.dims[0] === "" || item.dims[1] === "" || item.dims[2] === "" || item.dims[4] === ""
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        ),
      },
    };
  });

  return products[products.findIndex((item) => Object.keys(item)[0] === renderItem)][renderItem].content;
};

export default ProductDetails;
