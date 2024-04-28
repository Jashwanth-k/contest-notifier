const dotenv = require("dotenv");
dotenv.config();

const moment = require("moment-timezone");
const clistSerivce = require("./clist");
const greenAPIService = require("./greenApi");

const timeZone = process.env.TIMEZONE;
const startTimeStr = process.env.START_TIME;
const endTimeStr = process.env.END_TIME;
const triggerTimeStr = process.env.TRIGGER_TIME;
console.log("SERVER STARTED");
/* 
## MESSAGE FORMAT
{
    duration: 14400,
    end: '2024-04-29T14:30:00',
    event: 'CODE QUEST',
    host: 'codingninjas.com/codestudio',
    href: 'https://www.codingninjas.com/codestudio/contests/code-craze-1',
    id: 51241553,
    n_problems: null,
    n_statistics: null,
    parsed_at: null,
    problems: null,
    resource: 'codingninjas.com/codestudio',
    resource_id: 136,
    start: '2024-04-29T10:30:00'
  },

  start : start
  end : end
  host : host
  contest : event
  problems : n_problems
  duration : duration
  link : href
*/

async function main(date) {
  try {
    const currTimeStr = date.tz(timeZone).format("HH:mm:ss");
    const areEqual = currTimeStr === triggerTimeStr;
    if (!areEqual) return;
    const startDate = moment().tz(timeZone);
    startDate.hour(startTimeStr.split(":")[0]);
    startDate.minute(startTimeStr.split(":")[1]);
    startDate.second(0);
    const endDate = moment().tz(timeZone);
    endDate.hour(endTimeStr.split(":")[0]);
    endDate.minute(endTimeStr.split(":")[1]);
    endDate.second(0);
    const todayDate = `${startTimeStr}-${endTimeStr} ${moment(startDate)
      .tz(timeZone)
      .format("DD/MM/YYYY")}`;

    const data = await clistSerivce(startDate, endDate);
    let messages = data?.map((object) => {
      let message = "";
      const startDateStr = moment(object.start).tz(timeZone).format("HH:mm");
      const endDateStr = moment(object.end).tz(timeZone).format("HH:mm");
      const duration = Math.floor((object.duration || 0) / 60);
      message += `
start : ${startDateStr}
end : ${endDateStr}
host : ${object.host}
contest : ${object.event}
problems : ${object.n_problems}
duration : ${duration} min
`;
      return message;
    });

    messages.unshift(todayDate);
    messages = messages.join("\n");
    const isSent = await greenAPIService(messages);
    console.log(`Message Status : ${isSent}, Date : ${startDate}`);
    console.log(messages);
  } catch (err) {
    console.log(`err in main handler: ${err}`);
  }
}

setInterval(() => {
  const date = moment().tz(timeZone);
  main(date);
}, 1000);
