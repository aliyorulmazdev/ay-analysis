import Report from "../_components/report";

const laboratory = {
  name: "Edremit Ticaret Borsası Zeytinyağı Analiz Laboratuvarı",
  address: " Camivasat, Menderes Blv. No:43, 10300 Edremit/Balıkesir",
  email: "info@edremitlab.com",
  phone: "(0266) 373 10 61",
};

const analysis = {
  reportId: "AR-11",
  reportNumber: "6915 / 1",
  sample: {
    id: "ED-M-123",
    type: "Zeytinyağı",
    collectedDate: "2024-07-13",
    receivedDate: "2024-07-14",
    analysisDate: "2024-07-15",
  },
  methodology: ["C.O.I"],
  analysts: {
    analyst: "Selda UZUNOĞLU",
    controller: "Servet YERLİ",
  },
  results: [
    {
      parameter: "Asidite(% Oleik Asit)",
      result: "0.75",
      units: "-",
      limit: "<0.8",
    },
    {
      parameter: "Peroksit(meq g)",
      result: "15.68",
      units: "O/kg",
      limit: "<20",
    },
    { parameter: "Trilinolein", result: "0.14", units: "-", limit: "-" },
    {
      parameter: "K(232)-Uv'de Özgül Absorbans",
      result: "2.4525",
      units: "-",
      limit: "<2.5",
    },
    {
      parameter: "K(270)-Uv'de Özgül Absorbans",
      result: "0.1477",
      units: "-",
      limit: "<0.22",
    },
    {
      parameter: "ΔK-Uv'de Özgül Absorbans",
      result: "0.0000",
      units: "-",
      limit: "<0.01",
    },
  ],
  conclusion: [
    "Bu analiz raporu adli-idari işlemlerde ve reklam amacı ile kullanılamaz.",
    "Bu analiz raporunun, hiçbir bölümü tek başına veya ayrı ayrı kullanılamaz.",
    "Bu analiz raporu yukarıda belirtilen numune için geçerlidir.",
  ],
};

export default function HomePage() {
  return <Report laboratory={laboratory} analysis={analysis} />;
}
