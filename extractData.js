const axios = require("axios");
const cheerio = require("cheerio");

const scrap = async () => {
  // ใช้ axios ส่ง request เพื่อร้องขอข้อมูลแล้วให้ response ข้อมูลกลับ
  const html = await fetchData('https://www.goldtraders.or.th/');
  // เมื่อได้ HTML จาก axios แล้วก็ส่งไปสกัดเพื่อเอาเฉพาะข้อมูลที่ต้องการ
  const result = await extractData(html);
  console.log(result);
  return result;
};

const fetchData = (url) => {
  // ส่ง request เพื่อร้องขอข้อมูลหน้าเว็บเพจทั้งหน้า
  return axios.get(url).then(response => response.data);
};

const extractData = (html) => {
  const $ = cheerio.load(html);
  const title = $('#DetailPlace_uc_goldprices1_lblAsTime > b > font').text();
  const goldSell = $('#DetailPlace_uc_goldprices1_lblBLSell > b > font').text();
  const jewelrySell = $('#DetailPlace_uc_goldprices1_lblOMSell > b > font').text();
  return { title, goldSell, jewelrySell };
};

const extractDataApp = scrap();

module.exports = { extractDataApp };