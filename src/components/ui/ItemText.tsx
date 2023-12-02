interface ItemTextProps {
  text: string;
}

export function ItemText({ text }: ItemTextProps) {
  return (
    <div className='prose prose-neutral max-w-screen-md text-neutral-900 dark:prose-invert prose-a:break-all prose-a:font-normal prose-a:text-blue-500 prose-pre:whitespace-pre-wrap prose-pre:px-0 prose-pre:[overflow-wrap:anywhere] dark:text-neutral-200 dark:prose-a:text-blue-400'>
      <span
        className='[&_*:last-child]:mb-0'
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
