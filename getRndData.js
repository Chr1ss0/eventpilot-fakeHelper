import axios from "axios";
import { faker } from "@faker-js/faker";

const germanPostalCodes = [
  "10115",
  "20095",
  "80331",
  "50667",
  "60311",
  "70173",
  "40210",
  "44135",
  "45127",
  "04109",
  "30159",
  "90402",
  "01067",
  "44787",
  "28195",
  "42103",
  "33602",
  "68159",
  "53111",
  "45879",
  "76133",
  "65183",
  "48143",
  "86150",
  "41061",
  "52062",
  "38100",
  "09111",
  "24103",
  "06108",
  "39104",
  "79098",
  "46045",
  "23552",
  "99084",
  "18055",
  "55116",
  "34117",
  "59063",
  "66111",
  "45468",
  "14467",
  "67059",
  "26122",
  "51373",
  "49074",
  "42651",
  "69117",
  "44623",
  "41460",
  "64283",
  "33098",
  "93047",
  "85049",
  "97070",
  "38440",
  "63065",
  "89073",
  "74072",
  "75172",
  "37073",
  "46236",
  "54290",
  "45657",
  "72760",
  "27568",
  "56068",
  "51429",
  "07743",
  "42853",
  "91052",
  "47441",
  "57072",
  "31134",
  "38226",
  "03046",
  "07545",
  "33330",
  "35390",
  "58452",
  "58636",
  "08056",
  "19053",
  "52349",
  "73728",
  "71638",
  "26382",
  "72072",
  "47441",
  "78050",
  "27749",
  "35037",
  "44532",
  "44575",
  "53840",
  "32423",
  "47877",
  "46284",
  "24534",
  "45699",
];

async function getZipData(zipCode) {
  const url = `https://api.zippopotam.us/de/${zipCode}`;
  try {
    const result = await axios.get(url);
    const {
      state,
      "place name": placeName,
      latitude,
      longitude,
    } = result.data.places[0];
    return { state, placeName, latitude, longitude };
  } catch (error) {
    console.log(error);
    return "No valid ZipCode";
  }
}

export async function getRndZipData() {
  return getZipData(
    germanPostalCodes[Math.floor(Math.random() * germanPostalCodes.length)],
  );
}

console.log(await getRndZipData());

export function fakeReview() {
  return {
    firstName: faker.person.firstName(),
    content: "place",
    rating: faker.number.int({ min: 1, max: 5 }),
    creationDate: faker.date.past(),
    secure_url: faker.image.urlLoremFlickr({ category: "selfie" }),
  };
}
