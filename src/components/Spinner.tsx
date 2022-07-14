export default function Spinner({active = true, content }: { active?: boolean, content?: string }) {
  return (
    <div className='u-spinner pl-16'>
      <div
        className={['spinner', active && 'spinner--active'].join(' ')}
        role="progressbar"
        aria-busy={active ? 'true' : 'false'}
      />
      <span className="ml-16">{content}</span>
    </div>
  );
}