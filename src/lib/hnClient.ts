import { HNItem } from './types';

export type HNFeedType = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';

export class HNClient {
  private async get<T>(path: string): Promise<T> {
    const url = `https://hacker-news.firebaseio.com/v0/${path}.json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }

    return await response.json();
  }

  private async fetchItem(id: number): Promise<HNItem> {
    const itemDataResponse = await this.get<HNItem>(`item/${id}`);
    const itemObject = HNItem.parse(itemDataResponse);

    return itemObject;
  }

  async fetchStories(type: HNFeedType, page: number): Promise<HNItem[]> {
    const startIndex = (page - 1) * 30;
    const endIndex = startIndex + 30;

    const storyIds = await this.get<number[]>(`${type}stories`);
    const storyPromises = storyIds
      .slice(startIndex, endIndex)
      .map((id) => this.fetchItem(id));

    const storyObjects = await Promise.all(storyPromises);

    return storyObjects;
  }
}
