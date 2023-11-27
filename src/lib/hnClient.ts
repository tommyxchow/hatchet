import { HNItem, HNUser, type HNFeedType } from './types';

function createApiUrl(path: string) {
  return `https://hacker-news.firebaseio.com/v0/${path}.json`;
}

async function get(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return response.json();
}

async function fetchItem(id: number) {
  const url = createApiUrl(`item/${id}`);
  const itemDataResponse = (await get(url)) as HNItem;
  const itemObject = HNItem.parse(itemDataResponse);

  return itemObject;
}

async function fetchUser(username: string) {
  const url = createApiUrl(`user/${username}`);
  const userDataResponse = (await get(url)) as HNUser;
  const userObject = HNUser.parse(userDataResponse);

  return userObject;
}

async function fetchStories(type: HNFeedType, page: number) {
  const startIndex = (page - 1) * 30;
  const endIndex = startIndex + 30;

  const url = createApiUrl(`${type}stories`);
  const storyIds = (await get(url)) as number[];
  const storyPromises = storyIds
    .slice(startIndex, endIndex)
    .map((id) => fetchItem(id));

  const storyObjects = await Promise.all(storyPromises);

  return storyObjects;
}

export const HNClient = {
  fetchItem,
  fetchUser,
  fetchStories,
};
