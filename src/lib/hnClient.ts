import { HNFeedType, HNItem } from './types';

function createApiUrl(path: string) {
  return `https://hacker-news.firebaseio.com/v0/${path}.json`;
}

async function get(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return await response.json();
}

async function fetchItem(id: number) {
  const url = createApiUrl(`item/${id}`);
  const itemDataResponse: HNItem = await get(url);
  const itemObject = HNItem.parse(itemDataResponse);

  return itemObject;
}

async function fetchStories(type: HNFeedType, page: number) {
  const startIndex = (page - 1) * 30;
  const endIndex = startIndex + 30;

  const url = createApiUrl(`${type}stories`);
  const storyIds: number[] = await get(url);
  const storyPromises = storyIds
    .slice(startIndex, endIndex)
    .map((id) => fetchItem(id));

  const storyObjects = await Promise.all(storyPromises);

  return storyObjects;
}

export const HNClient = {
  fetchItem,
  fetchStories,
};
