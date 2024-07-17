export default function Report({ laboratory, analysis }) {
  return (
    <div className="bg-background text-foreground font-sans">
      <header className="bg-primary text-primary-foreground py-6 px-8 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{laboratory.name}</h1>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-base">{laboratory.address}</p>
            <p className="text-base">{laboratory.email}</p>
            <p className="text-base">{laboratory.phone}</p>
          </div>
        </div>
      </header>
      <main className="px-8 py-12 md:px-12 lg:px-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold">Laboratory Analysis Report</h2>
          <div>
            <span className="text-lg font-medium">
              Report ID: {analysis.reportId}
            </span>
            <br />
            <span className="text-lg font-medium">
              Report Number: {analysis.reportNumber}
            </span>
          </div>
        </div>
        <section>
          <h3 className="text-2xl font-bold mb-4">Sample Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-base font-medium">Sample ID:</p>
              <p className="text-lg">{analysis.sample.id}</p>
            </div>
            <div>
              <p className="text-base font-medium">Sample Type:</p>
              <p className="text-lg">{analysis.sample.type}</p>
            </div>
            <div>
              <p className="text-base font-medium">Collected:</p>
              <p className="text-lg">{analysis.sample.collectedDate}</p>
            </div>
            <div>
              <p className="text-base font-medium">Received:</p>
              <p className="text-lg">{analysis.sample.receivedDate}</p>
            </div>
            <div>
              <p className="text-base font-medium">Analysis Date:</p>
              <p className="text-lg">{analysis.sample.analysisDate}</p>
            </div>
          </div>
        </section>
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Analysis Methodology</h3>
          <p className="text-lg">
            The sample was analyzed using the following methods:
          </p>
          <ul className="list-disc pl-8 mt-4">
            {analysis.methodology.map((method, index) => (
              <li key={index} className="text-lg">
                {method}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Analysis Performed By</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-base font-medium">Analyst:</p>
              <p className="text-lg">{analysis.analysts.analyst}</p>
            </div>
            <div>
              <p className="text-base font-medium">Analysis Controller:</p>
              <p className="text-lg">{analysis.analysts.controller}</p>
            </div>
          </div>
        </section>
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="px-6 py-4 text-left">Parameter</th>
                  <th className="px-6 py-4 text-left">Result</th>
                  <th className="px-6 py-4 text-left">Units</th>
                  <th className="px-6 py-4 text-left">Limit</th>
                </tr>
              </thead>
              <tbody>
                {analysis.results.map((result, index) => (
                  <tr key={index}>
                    <td className="border px-6 py-4">{result.parameter}</td>
                    <td className="border px-6 py-4">{result.result}</td>
                    <td className="border px-6 py-4">{result.units}</td>
                    <td className="border px-6 py-4">{result.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Conclusion</h3>
          {analysis.conclusion.map((line, index) => (
            <p key={index} className="text-lg">
              {line}
            </p>
          ))}
        </section>
      </main>
      <footer className="bg-muted text-muted-foreground py-6 px-8 md:px-12 lg:px-16 text-base">
        <p>&copy; 2023 {laboratory.name}. Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
}
