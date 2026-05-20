const logos = [
  "Pharmacie Akwa",
  "Resto Bonanjo",
  "TechHub 237",
  "Clinique Bonamoussadi",
  "AfriExpress",
  "Maison Mbappé",
];

export function LogoCloud() {
  return (
    <section className="border-b border-slate-200 bg-white py-12">
      <div className="container-weza">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-400">
          Ils nous font confiance
        </p>
        <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-center text-sm font-bold uppercase tracking-wider text-slate-400 transition hover:text-weza-secondary"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
