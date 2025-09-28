import { HNItem, HNUser, type HNFeedType } from './types';

function createApiUrl(path: string) {
  return `https://hacker-news.firebaseio.com/v0/${path}.json`;
}

async function get<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return (await response.json()) as T;
}

async function fetchItemById(id: number): Promise<HNItem | null> {
  try {
    const url = createApiUrl(`item/${id}`);
    const itemDataResponse = await get(url);
    const itemObject = HNItem.parse(itemDataResponse);

    return itemObject;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchUserById(username: string): Promise<HNUser | null> {
  try {
    const url = createApiUrl(`user/${username}`);
    const userDataResponse = await get(url);
    const userObject = HNUser.parse(userDataResponse);

    return userObject;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchStoriesByFeedType(
  type: HNFeedType,
  page: number,
): Promise<HNItem[]> {
  const startIndex = (page - 1) * 30;
  const endIndex = startIndex + 30;

  const storyType = type === 'jobs' ? 'job' : type;
  const url = createApiUrl(`${storyType}stories`);

  const storyIds = await get<number[]>(url);
  const storyPromises = storyIds
    .slice(startIndex, endIndex)
    .map((id) => fetchItemById(id));

  const storyObjects = (await Promise.all(storyPromises)).filter(
    (story): story is NonNullable<typeof story> => story !== null,
  );

  return storyObjects;
}

export const HNClient = {
  fetchItemById,
  fetchUserById,
  fetchStoriesByFeedType,
};
