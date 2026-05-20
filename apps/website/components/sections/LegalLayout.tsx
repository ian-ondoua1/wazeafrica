export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-radial-fade py-16">
        <div className="container-weza max-w-4xl">
          <span className="eyebrow">Légal</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-weza-dark sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-slate-500">Dernière mise à jour : {updated}</p>
        </div>
      </section>
      <section className="section pt-12">
        <div className="container-weza max-w-3xl">
          <div className="prose prose-slate max-w-none space-y-6 text-slate-700 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-weza-dark [&_h3]:font-bold [&_h3]:text-weza-dark [&_ul]:list-disc [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
