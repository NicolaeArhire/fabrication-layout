const readDB = async () => {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${process.env.REACT_APP_BIN_ID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": process.env.REACT_APP_BIN_MASTER_KEY,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

const addToDB = async (newAccount) => {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${process.env.REACT_APP_BIN_ID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": process.env.REACT_APP_BIN_MASTER_KEY,
      },
    });

    const data = await res.json();
    data.record.push(newAccount);

    const newRes = await fetch(`https://api.jsonbin.io/v3/b/${process.env.REACT_APP_BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": process.env.REACT_APP_BIN_MASTER_KEY,
      },
      body: JSON.stringify(data.record),
    });

    const updatedData = await newRes.json();
    return updatedData;
  } catch (error) {
    return error;
  }
};

export { readDB, addToDB };
