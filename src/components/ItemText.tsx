interface ItemTextProps {
  text: string;
}

export function ItemText({ text }: ItemTextProps) {
  return (
    <div className='prose prose-neutral dark:prose-invert prose-a:break-all prose-a:font-normal prose-a:text-blue-600 prose-pre:whitespace-pre-wrap prose-pre:px-0 prose-pre:wrap-anywhere dark:prose-a:text-blue-400 text-foreground max-w-3xl'>
      <span
        className='[&_*:last-child]:mb-0'
        dangerouslySetInnerHTML={{ __html: text }} // eslint-disable-line @eslint-react/dom/no-dangerously-set-innerhtml
      />
    </div>
  );
}
