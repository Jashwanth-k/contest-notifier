const axios = require("axios");

const apiHost = process.env.GREEN_API_HOST;
const idInstance = process.env.GREEN_INSTANCE_ID;
const tokenInstance = process.env.GREEN_TOKEN_INSTANCE;
const mobile = process.env.MOBILE;

const apiurl = `https://${apiHost}/waInstance${idInstance}/sendMessage/${tokenInstance}`;
const headers = {
  "Content-Type": "application/json",
};
const body = {
  chatId: `${mobile}@c.us`,
  message: "",
};

async function sendMessage(message) {
  try {
    if (!message) return true;
    body.message = message;
    const resp = await axios.post(apiurl, body, { headers });
    return resp?.status === 200;
  } catch (err) {
    console.log(`err in greenApi handler : ${err}`);
    return false;
  }
}

module.exports = sendMessage;
