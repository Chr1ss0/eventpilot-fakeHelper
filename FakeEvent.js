import { faker, fakerDE } from "@faker-js/faker";
import mongoose from "mongoose";
import {
  eventCreatorIds,
  getRandomNumber,
  getRndZipData,
  userIds,
} from "./getRndData.js";

const fakeEventSchema = new mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventInfo: {
    title: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Sport", "Music", "Art", "Food"],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    location: {
      placeName: {
        type: String,
      },
      address: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    description: {
      type: String,
      trim: true,
    },
  },
  cover: {
    secure_url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },

  registeredUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const FakeEventModel = mongoose.model("Event", fakeEventSchema);

const postFakeEvent = async () => {
  const category = ["Sport", "Music", "Art", "Food"];
  const rndCategory = category[Math.floor(Math.random() * 4)];
  const startDate = faker.date.soon().toISOString();
  const originalDate = new Date(startDate);
  originalDate.setHours(
    originalDate.getHours() + Math.floor(Math.random() * 11),
  );
  const endDate = originalDate.toISOString();
  const { latitude, longitude, state, placeName } = await getRndZipData();
  const registeredUser = userIds.slice(
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * userIds.length),
  );

  const fakeEventData = {
    eventInfo: {
      location: {
        placeName,
        address: `${fakerDE.location.street()} Nr.${faker.number.int({
          min: 1,
          max: 39,
        })}`,
        state,
        coordinates: [latitude, longitude],
      },
      title: `${faker.commerce.department()} ${rndCategory}-Event`,
      category: rndCategory,
      startDate,
      endDate,
      description: `Join us at the ${rndCategory}event an have unforgettable time from ${new Date(
        startDate,
      ).toLocaleDateString()} to ${new Date(
        endDate,
      ).toLocaleDateString()} where creativity and innovation converge.We will come together in the the lovely hearth of ${state}. Our event promises to be a dynamic experience, bringing together industry experts, thought leaders, and visionaries to explore cutting-edge ideas. Whether you're an aspiring entrepreneur, a tech enthusiast, or just someone eager to expand your horizons, this event is designed for you. Get ready for inspiring talks, hands-on workshops, and plenty of networking opportunities. Don't miss this chance to be part of a community dedicated to fostering growth, learning, and collaboration.`,
    },
    cover: {
      secure_url: faker.image.urlLoremFlickr({ category: rndCategory }),
    },
    organizer:
      eventCreatorIds[Math.floor(Math.random() * eventCreatorIds.length)],
    registeredUser,
    __v: 0,
  };

  const event = new FakeEventModel(fakeEventData);

  try {
    await event.save();
    console.log(`Fake event: ${rndCategory} saved`);
  } catch (error) {
    console.error("Error saving fake event data:");
  }
};

export default postFakeEvent;
