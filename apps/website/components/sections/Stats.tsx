const stats = [
  { value: "1 000+", label: "Entreprises actives" },
  { value: "5", label: "Pays couverts" },
  { value: "99.9%", label: "Disponibilité" },
  { value: "24/7", label: "Support local" },
];

export function Stats() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="container-weza py-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold text-weza-primary sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-medium text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
