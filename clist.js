const moment = require("moment");
const axios = require("axios");

const clistApiKey = process.env.CLIST_API_KEY;
const headers = {
  Authorization: clistApiKey,
  "Content-Type": "application/json",
};

const clistUrl =
  "https://clist.by/api/v4/contest/?start__gt=${startDate}&end__lt=${endDate}&order_by=start";

async function getContestData(startDate, endDate) {
  try {
    startDate = moment(startDate).toISOString();
    endDate = moment(endDate).toISOString();

    let apiurl = clistUrl;
    apiurl = apiurl.replace("${startDate}", startDate);
    apiurl = apiurl.replace("${endDate}", endDate);

    const resp = await axios.get(apiurl, { headers });
    const objects = resp?.data?.objects;
    return objects;
  } catch (err) {
    console.log(`err while getting contest data from clist :${err}`);
    return false;
  }
}

module.exports = getContestData;
