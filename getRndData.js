import axios from "axios";
import { faker } from "@faker-js/faker";

const germanPostalCodes = [
  "10115",
  "80331",
  "30159",
  "86150",
  "52062",
  "06108",
  "39104",
  "79098",
  "99084",
  "18055",
  "55116",
  "34117",
  "45468",
  "67059",
  "26122",
  "51373",
  "49074",
  "69117",
  "44623",
  "33098",
  "93047",
  "85049",
  "97070",
  "63065",
  "89073",
  "74072",
  "75172",
  "54290",
  "45657",
  "56068",
  "51429",
  "07743",
  "57072",
  "31134",
  "38226",
  "07545",
  "33330",
  "35390",
  "58636",
  "08056",
  "19053",
  "52349",
  "73728",
  "71638",
  "26382",
  "72072",
  "47441",
  "35037",
  "44575",
  "53840",
  "32423",
  "46284",
  "24534",
  "45699",
];

export const realObjectId = [];

async function getValidZip() {
  const validZipCodes = [];

  for (const zipCodes of germanPostalCodes) {
    const zipData = await getRndZipData(zipCodes);
    const lon = Number(zipData.longitude);
    const lat = Number(zipData.latitude);
    if (!Number.isInteger(lon) && !Number.isInteger(lat))
      validZipCodes.push(zipCodes);
  }
  console.log(validZipCodes);
}

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

export function fakeReview() {
  return {
    firstName: faker.person.firstName(),
    content: faker.word.words({ count: { min: 8, max: 15 } }),
    rating: faker.number.int({ min: 1, max: 5 }),
    creationDate: faker.date.past(),
    secure_url: faker.image.urlLoremFlickr({ category: "selfie" }),
  };
}

export function getRandomNumber() {
  return Math.floor(Math.random() * 999);
}
