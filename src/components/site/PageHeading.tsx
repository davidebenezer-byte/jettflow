export function PageHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="max-w-[620px]">
      {eyebrow && <div className="eyebrow eyebrow-dot mb-4">{eyebrow}</div>}
      <h1 className="font-display text-3xl leading-tight sm:text-4xl">{title}</h1>
      {lede && <p className="mt-3 text-[14.5px] text-muted-foreground">{lede}</p>}
    </div>
  );
}
