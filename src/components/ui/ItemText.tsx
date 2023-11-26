interface ItemTextProps {
  text: string;
}

export function ItemText({ text }: ItemTextProps) {
  return (
    <div
      className='prose prose-neutral prose-invert max-w-screen-md text-neutral-200 prose-a:break-all prose-a:font-normal prose-a:text-blue-400'
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
