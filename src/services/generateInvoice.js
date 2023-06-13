import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import { auth } from "../firebase";
import readUserData from "./readUserData";

const generateInvoice = async (index, invoiceCreationDate) => {
  try {
    const address = await getAddress();
    const phone = await getPhone();
    const orderItems = await getOrderItems(index);
    const orderDate = await getOrderDate(index);
    const orderTotalWeight = await getOrderTotalWeight(index);
    const orderShipping = await getOrderShippingCost(index);
    const orderTotalCost = await getOrderTotalCost(index);

    const props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: false,
      fileName: `Invoice_#${index + 1}_${auth.currentUser.displayName}`,
      orientationLandscape: false,
      compress: true,
      logo: {
        src: "/logo.png",
        type: "PNG",
        width: 30,
        height: 30,
        margin: {
          top: 0,
          left: 0,
        },
      },
      stamp: {
        inAllPages: true,
        src: "/qrCode.png",
        type: "PNG",
        width: 20,
        height: 20,
        margin: {
          top: 0,
          left: 0,
        },
      },
      business: {
        name: "SC Fabrication Layout SRL",
        address: "51 Av. d'Italie, Paris, France",
        phone: "(+40) 755 880 962",
        email: "nicolae.arhire10@gmail.com",
        email_1: "-",
        website: "https://fabrication-layout.vercel.app/",
      },
      contact: {
        label: "Invoice issued for:",
        name: auth.currentUser.displayName,
        address: `Address: ${address}`,
        phone: `Phone: ${phone}`,
        email: `Email: ${auth.currentUser.email}`,
      },
      invoice: {
        label: "Invoice #: ",
        num: index + 1,
        invDate: `Payment Date: ${orderDate}`,
        invGenDate: `Invoice Date: ${invoiceCreationDate}`,
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          { title: "#", style: { width: 10 } },
          { title: "Item", style: { width: 60 } },
          { title: "Size (mm)", style: { width: 30 } },
          { title: "Length (m)" },
          { title: "Qty (pcs)" },
          { title: "Weight (kg)" },
          { title: "Price ($)" },
        ],
        table: orderItems.map((item, index) => [
          index + 1,
          item.description,
          item.size.includes("∅") ? item.size.replace("∅", "D") : item.size,
          item.length,
          item.quantity,
          item.weight,
          item.price,
        ]),
        additionalRows: [
          {
            col1: "Total Weight:",
            col2: `${orderTotalWeight} kg`,
            style: {
              fontSize: 10,
            },
          },
          {
            col1: "SubTotal:",
            col2: `${orderTotalCost - orderShipping} $`,
            style: {
              fontSize: 10,
            },
          },
          {
            col1: "Shipping:",
            col2: `${orderShipping} $`,
            style: {
              fontSize: 10,
            },
          },
          {
            col1: "Total Order:",
            col2: `${orderTotalCost} $`,
            style: {
              fontSize: 14,
            },
          },
        ],
        invDescLabel: "Notes:",
        invDesc: "Pleasure doing business with you!",
      },
      footer: {
        text: "Invoice valid without any signatures.",
      },
      pageEnable: true,
      pageLabel: "Page ",
    };

    jsPDFInvoiceTemplate({ ...props });
  } catch (err) {
    console.log(err);
  }
};

const getAddress = async () => {
  try {
    const data = await readUserData(auth.currentUser.uid);
    return data?.info?.billingAddress;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getPhone = async () => {
  try {
    const data = await readUserData(auth.currentUser.uid);
    return data?.info?.phoneNumber;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getOrderItems = async (orderNo) => {
  try {
    const data = await readUserData(auth.currentUser.uid);
    const orderObject = Object.keys(data).filter((item) => item.includes("Order"))[orderNo];
    return data[orderObject];
  } catch (error) {
    console.log(error);
  }
};

const getOrderDate = async (orderNo) => {
  try {
    const data = await readUserData(auth.currentUser.uid);
    const orderTitle = Object.keys(data).filter((item) => item.includes("Order"))[orderNo];
    return `${orderTitle.split("_")[1].replaceAll("~", "/")} ${orderTitle.split("_")[2]}`;
  } catch (error) {
    console.log(error);
  }
};

const getOrderTotalWeight = async (orderNo) => {
  try {
    const data = await readUserData(auth.currentUser.uid);
    const orderTitle = Object.keys(data).filter((item) => item.includes("Order"))[orderNo];
    return Number(orderTitle.split("_")[3]) / 100;
  } catch (error) {
    console.log(error);
  }
};

const getOrderShippingCost = async (orderNo) => {
  try {
    const data = await readUserData(auth.currentUser.uid);
    const orderTitle = Object.keys(data).filter((item) => item.includes("Order"))[orderNo];
    return Number(orderTitle.split("_")[4]) / 100;
  } catch (error) {
    console.log(error);
  }
};

const getOrderTotalCost = async (orderNo) => {
  try {
    const data = await readUserData(auth.currentUser.uid);
    const orderTitle = Object.keys(data).filter((item) => item.includes("Order"))[orderNo];
    return Number(orderTitle.split("_")[5]) / 100;
  } catch (error) {
    console.log(error);
  }
};

export default generateInvoice;
