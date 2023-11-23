import CommentTile from './CommentTile';

interface CommentsProps {
  ids: number[];
}

export default function Comments({ ids }: CommentsProps) {
  return (
    <ul className='flex flex-col'>
      {ids.map((id) => (
        <li key={id}>
          <CommentTile id={id} level={0} />
        </li>
      ))}
    </ul>
  );
}
