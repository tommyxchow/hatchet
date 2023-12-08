'use client';

import { createContext } from 'react';
import CommentTile from './CommentTile';

interface CommentsProps {
  postAuthorUsername: string | null;
  ids: number[];
}

export const PostAuthorContext = createContext<string | null>(null);

export default function Comments({ postAuthorUsername, ids }: CommentsProps) {
  return (
    <PostAuthorContext.Provider value={postAuthorUsername}>
      <ul className='flex flex-col'>
        {ids.map((id) => (
          <li key={id}>
            <CommentTile id={id} level={0} />
          </li>
        ))}
      </ul>
    </PostAuthorContext.Provider>
  );
}
