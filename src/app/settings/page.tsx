import ThemeSelect from '@/components/ui/ThemeSelect';

export default function Settings() {
  return (
    <article className='flex flex-col gap-4'>
      <div>
        <h2 className='text-lg font-semibold'>theme</h2>
        <ThemeSelect />
      </div>
    </article>
  );
}
