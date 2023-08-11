'use client';

import { HNComment } from '@/lib/types';
import { useState } from 'react';
import CommentTile from './CommentTile';

type CommentsProps = {
  comments: HNComment[];
};

// function toggleCollpse(
//   comment: HNComment,
//   allComments: HNComment[],
// ): HNComment[] {
//   const updatedComments = [...allComments];
//   const isCollapsed = comment.collapsed;

//   let currentCommentIndex = updatedComments.findIndex(
//     (c) => c.id === comment.id,
//   );
//   let currentComment = updatedComments[currentCommentIndex];
//   currentComment.collapsed = !currentComment.collapsed;
//   while (currentComment.indent >= comment.indent) {
//     currentComment = updatedComments[++currentCommentIndex];

//     // If we've reached the end of the comments, or the next comment is at the
//     // same/smaller indent level, stop collapsing.
//     if (!currentComment || currentComment.indent <= comment.indent) {
//       break;
//     }

//     currentComment.hidden = isCollapsed ? false : true;
//     if (currentComment.collapsed) {
//       const collapsedComment = currentComment;
//       currentComment = updatedComments[++currentCommentIndex];
//       while (collapsedComment.indent >= currentComment.indent) {
//         currentComment = updatedComments[++currentCommentIndex];
//       }
//     }
//   }

//   return updatedComments;
// }

export default function Comments({ comments }: CommentsProps) {
  const [renderedComments, setRenderedComments] = useState(comments);

  return (
    <ul className='flex flex-col'>
      {renderedComments
        .filter((c) => !c.hidden)
        .map((comment) => (
          <li key={comment.id}>
            <CommentTile comment={comment} />
          </li>
        ))}
    </ul>
  );
}
