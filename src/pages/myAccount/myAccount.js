import "bootstrap/dist/css/bootstrap.min.css";
import "./myAccount.css";
import { readDBFromLocal } from "../../services/userAccount";
import { useEffect, useState } from "react";

const MyAccount = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(readDBFromLocal().username);
  }, []);

  console.log(readDBFromLocal());

  return (
    <div className="account_container">
      <div className="account_content">
        <span style={{ color: "white" }}>Hello, {username}</span> <br />
        <span style={{ color: "white" }}>Modaldddddffdd d dd- </span>
      </div>
    </div>
  );
};

export default MyAccount;
