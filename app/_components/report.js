export default function Report({ laboratory, analysis }) {
  return (
    <div className="bg-background text-foreground font-sans">
      <header className="bg-primary text-primary-foreground py-3 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center md:text-left">
              {laboratory.name}
            </h1>
          </div>
          <div className="text-center md:text-left mt-2 md:mt-0">
            <p className="text-sm md:text-base">{laboratory.address}</p>
            <p className="text-sm md:text-base">{laboratory.email}</p>
            <p className="text-sm md:text-base">{laboratory.phone}</p>
          </div>
        </div>
      </header>

      <main className="px-6 py-6 md:px-4 lg:px-14">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="mt-2 md:mt-0">
            <span className="text-sm md:text-lg font-medium">
              Rapor ID: {analysis.reportId} | Rapor Numarası:{" "}
              {analysis.reportNumber}
            </span>
          </div>
        </div>
        <section>
          <h3 className="text-lg md:text-xl font-bold mb-2">Örnek Bilgileri</h3>
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
            <div>
              <p className="text-sm md:text-base font-medium">Materyal ID:</p>
              <p className="text-sm md:text-lg">{analysis.sample.id}</p>
            </div>
            <div>
              <p className="text-sm md:text-base font-medium">Materyal Türü:</p>
              <p className="text-sm md:text-lg">{analysis.sample.type}</p>
            </div>
            <div>
              <p className="text-sm md:text-base font-medium">
                Numune Alınma Tarihi:
              </p>
              <p className="text-sm md:text-lg">
                {analysis.sample.collectedDate}
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base font-medium">
                Teslim Alınma Tarihi:
              </p>
              <p className="text-sm md:text-lg">
                {analysis.sample.receivedDate}
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base font-medium">Analiz Tarihi:</p>
              <p className="text-sm md:text-lg">
                {analysis.sample.analysisDate}
              </p>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 mt-4">
          <section className="mt-4">
            <h3 className="text-lg md:text-xl font-bold mb-2">
              Analiz Bilgileri
            </h3>
            <p className="text-sm md:text-lg">
              Örnek aşağıdaki standartlara göre analiz edilmiştir.
            </p>
            <ul className="mt-2">
              {analysis.methodology.map((method, index) => (
                <li key={index} className="text-sm md:text-lg">
                  {method}
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-4">
            <h3 className="text-lg md:text-xl font-bold mb-2">
              Teknisyen Bilgileri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
              <div>
                <p className="text-sm md:text-base font-medium">
                  Analizi Yapan:
                </p>
                <p className="text-sm md:text-lg">
                  {analysis.analysts.analyst}
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base font-medium">
                  Kontrol Eden:
                </p>
                <p className="text-sm md:text-lg">
                  {analysis.analysts.controller}
                </p>
              </div>
            </div>
          </section>
        </div>
        <section className="mt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="px-2 py-1 md:px-3 md:py-2 text-left">
                    Test Parametresi
                  </th>
                  <th className="px-2 py-1 md:px-3 md:py-2 text-left">Sonuç</th>
                  <th className="px-2 py-1 md:px-3 md:py-2 text-left">Birim</th>
                  <th className="px-2 py-1 md:px-3 md:py-2 text-left">Limit</th>
                </tr>
              </thead>
              <tbody>
                {analysis.results.map((result, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1 md:px-3 md:py-2">
                      {result.parameter}
                    </td>
                    <td className="border px-2 py-1 md:px-3 md:py-2">
                      {result.result}
                    </td>
                    <td className="border px-2 py-1 md:px-3 md:py-2">
                      {result.units}
                    </td>
                    <td className="border px-2 py-1 md:px-3 md:py-2">
                      {result.limit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-4">
          <h3 className="text-lg md:text-xl font-bold mb-2">Notlar</h3>
          {analysis.conclusion.map((line, index) => (
            <p key={index} className="text-sm md:text-lg">
              {line}
            </p>
          ))}
        </section>
      </main>
      <footer className="bg-muted text-muted-foreground mt-6 py-4 px-2 md:px-4 lg:px-6 text-sm md:text-base">
        <p>&copy; 2024 {laboratory.name}. Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
}
