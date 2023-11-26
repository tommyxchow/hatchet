interface ItemTextProps {
  text: string;
}

export function ItemText({ text }: ItemTextProps) {
  return (
    <div
      className='prose prose-neutral prose-invert max-w-screen-md text-neutral-200'
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
