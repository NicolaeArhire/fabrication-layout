import "bootstrap/dist/css/bootstrap.min.css";
import "./myAccount.css";
import { readDBFromLocal } from "../../services/userAccount";
import { useEffect, useState } from "react";

const MyAccount = () => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [dateCreated, setDateCreated] = useState("");

  useEffect(() => {
    setUsername(readDBFromLocal()?.username);
    setMail(readDBFromLocal()?.mail);
    setDateCreated(readDBFromLocal()?.created);
  }, []);

  return (
    <div className="account_container">
      <div className="account_content">
        <span style={{ color: "white" }}>Hewwweedllo, {username || ""}</span>
        <span style={{ color: "white" }}>Your e-mail - {mail || ""}</span>
        <span style={{ color: "white" }}>Account created on - {dateCreated || ""}</span>
      </div>
    </div>
  );
};

export default MyAccount;
