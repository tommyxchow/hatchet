import * as htmlparser2 from 'htmlparser2';
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
    const dom = htmlparser2.parseDocument(html);
    const domUtils = htmlparser2.DomUtils;

    const comments = domUtils.findAll(
      (element) => element.attribs?.class?.includes('athing comtr'),
      dom.children,
    );

    const parsedComments: HNComment[] = [];
    for (const comment of comments) {
      const indentNode = domUtils.findOne(
        (element) => element.attribs?.class?.includes('ind'),
        comment.children,
      );
      const indent = parseInt(indentNode?.attribs?.indent ?? '0');

      const commentId = parseInt(comment.attribs?.id);

      const commentNode = domUtils.findOne(
        (element) => element.attribs?.class?.includes('comment'),
        comment.children,
      );
      const commentText = domUtils.innerText(commentNode!).replace('reply', '');

      const commentAuthorNode = domUtils.findOne(
        (element) => element.attribs?.class?.includes('hnuser'),
        comment.children,
      );
      const commentAuthorText = domUtils.innerText(commentAuthorNode!);

      const commentTimeNode = domUtils.findOne(
        (element) => element.attribs?.class?.includes('age'),
        comment.children,
      );
      const commentTime = commentTimeNode?.attribs?.title;

      const commentTimestamp = new Date(commentTime + 'Z').getTime() / 1000;

      const parsedComment: HNComment = {
        id: commentId,
        indent,
        text: commentText,
        by: commentAuthorText,
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
