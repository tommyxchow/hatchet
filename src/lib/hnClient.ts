import { JSDOM } from 'jsdom';
import { HNComment, HNFeedType, HNItem } from './types';

export class HNClient {
  private createApiUrl(path: string): string {
    return `https://hacker-news.firebaseio.com/v0/${path}.json`;
  }

  private createWebUrl(path: string): string {
    return `https://news.ycombinator.com/${path}`;
  }

  private async get<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }

    return await response.json();
  }

  async fetchItem(id: number): Promise<HNItem> {
    const url = this.createApiUrl(`item/${id}`);
    const itemDataResponse = await this.get<HNItem>(url);
    const itemObject = HNItem.parse(itemDataResponse);

    return itemObject;
  }

  async fetchStories(type: HNFeedType, page: number): Promise<HNItem[]> {
    const startIndex = (page - 1) * 30;
    const endIndex = startIndex + 30;

    const url = this.createApiUrl(`${type}stories`);
    const storyIds = await this.get<number[]>(url);
    const storyPromises = storyIds
      .slice(startIndex, endIndex)
      .map((id) => this.fetchItem(id));

    const storyObjects = await Promise.all(storyPromises);

    return storyObjects;
  }

  async fetchCommentsWithParser(id: number): Promise<HNComment[]> {
    const url = this.createWebUrl(`item?id=${id}`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const comments = document.querySelectorAll('.comtr');

    const parsedComments: HNComment[] = [];
    for (const comment of comments) {
      const indent = parseInt(
        comment.querySelector('.ind')?.getAttribute('indent') ?? '0',
      );
      const commentId = parseInt(comment.id);
      const commentNode = comment.querySelector('.comment');
      commentNode?.querySelector('.reply')?.remove();
      const commentText = commentNode?.innerHTML ?? '';
      const commentAuthor = comment.querySelector('.hnuser')?.innerHTML ?? '';
      const commentTime =
        comment.querySelector('.age')?.getAttribute('title') ?? '';
      const commentTimestamp = new Date(commentTime).getTime() / 1000;

      const parsedComment: HNComment = {
        id: commentId,
        indent,
        text: commentText,
        by: commentAuthor,
        time: commentTimestamp,
        collapsed: false,
        hidden: false,
      };

      console.log(parsedComment);

      parsedComments.push(parsedComment);
    }

    return parsedComments;
  }
}
