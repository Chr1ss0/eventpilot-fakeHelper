import axios from "axios";
import { faker } from "@faker-js/faker";

const germanPostalCodes = [
  "30159",
  "86150",
  "52062",
  "79098",

  "69117",
  "33098",
  "93047",
  "85049",
  "97070",
  "21514",
  "89073",
  "74072",
  "75172",
  "45657",

  "57072",
  "31134",
  "33330",
  "35390",
  "58636",
  "52349",

  "72072",
  "47441",
  "35037",
  "44575",
  "53840",
  "32423",
  "46284",
  "45699",
];

export const userIds = [];
export const eventCreatorIds = [];

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
    // firstName: faker.person.firstName(),
    postUser: userIds[Math.floor(Math.random() * userIds.length)],
    content: faker.word.words({ count: { min: 8, max: 15 } }),
    rating: faker.number.int({ min: 1, max: 5 }),
    creationDate: faker.date.past(),
    // secure_url: faker.image.urlLoremFlickr({ category: "selfie" }),
  };
}

export function getRandomNumber() {
  return Math.floor(Math.random() * 999);
}
