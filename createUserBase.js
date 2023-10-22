import postFakeUser, { getFakeUserId, postFakeOrganizer } from "./FakeUser.js";
import postFakeEvent from "./FakeEvent.js";
import { eventCreatorIds, userIds } from "./getRndData.js";

export async function createUsers(num) {
  for (let i = 0; i < num; ++i) {
    await postFakeUser().catch((error) => console.log(error));
  }
}
export async function createOrganizer(num) {
  for (let i = 0; i < num; ++i) {
    await postFakeOrganizer().catch((error) => console.log(error));
  }
}
export async function createEvent(num) {
  for (let i = 0; i < num; ++i) {
    await postFakeEvent().catch((error) => console.log(error));
  }
}

export async function createUserBase(user, orga, events) {
  try {
    await createUsers(user);
    const generatedUserIds = await getFakeUserId();
    userIds.push(...generatedUserIds);
    await createOrganizer(orga);
    const organizerIds = await getFakeUserId();
    if (!userIds.includes(organizerIds)) {
      eventCreatorIds.push(...organizerIds);
    }
    await createEvent(events);
    console.log("Finished");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
