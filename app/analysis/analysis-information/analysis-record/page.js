"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  CircleSlashIcon,
  EraserIcon,
  PencilIcon,
  SaveIcon,
  PlusIcon,
  MinusIcon,
} from "lucide-react";

const initialData = [
  {
    id: 1,
    reportNumber: "6915 / 1",
    createdDate: "2024-07-01",
    updatedDate: "2024-07-05",
    status: "Onaylandı",
  },
  {
    id: 2,
    reportNumber: "6915 / 2",
    createdDate: "2024-07-02",
    updatedDate: "2024-07-06",
    status: "İşleniyor",
  },
];

const customers = [
  { name: "Firma A", materials: ["Zeytinyağı", "Çiçekyağı"] },
  { name: "Firma B", materials: ["Mısır Yağı"] },
  { name: "Firma C", materials: ["Zeytinyağı", "Mısır Yağı"] },
];

const standards = ["C.O.I", "B.O.I", "A.G.I"];
const notes = [
  "Bu analiz raporu adli-idari işlemlerde ve reklam amacı ile kullanılamaz.",
  "Bu analiz raporunun, hiçbir bölümü tek başına veya ayrı ayrı kullanılamaz.",
  "Bu analiz raporu yukarıda belirtilen numune için geçerlidir.",
];
const parameters = [
  { id: 1, parameter: "Asidite(% Oleik Asit)", unit: "-", limit: "<0.8" },
  { id: 2, parameter: "Peroksit(meq g)", unit: "O/kg", limit: "<20" },
  { id: 3, parameter: "Trilinolein", unit: "-", limit: "-" },
  {
    id: 4,
    parameter: "K(232)-Uv'de Özgül Absorbans",
    unit: "-",
    limit: "<2.5",
  },
  {
    id: 5,
    parameter: "K(270)-Uv'de Özgül Absorbans",
    unit: "-",
    limit: "<0.22",
  },
  { id: 6, parameter: "ΔK-Uv'de Özgül Absorbans", unit: "-", limit: "<0.01" },
];

const statuses = ["Onaylandı", "İşleniyor", "Arşiv", "Geçersiz"];
const personnel = ["Personel A", "Personel B", "Personel C"];

const AnalysisRecord = () => {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnalysis, setNewAnalysis] = useState({
    reportNumber: "",
    customer: "",
    material: "",
    standards: [],
    notes: [],
    parameterResults: [],
    checkedBy: "",
    approvedBy: "",
  });
  const [newParameterResult, setNewParameterResult] = useState({
    parameterId: "",
    result: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [tempAnalysis, setTempAnalysis] = useState(null);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);

  useEffect(() => {
    if (newAnalysis.customer) {
      const selectedCustomer = customers.find(
        (customer) => customer.name === newAnalysis.customer
      );
      setFilteredMaterials(selectedCustomer ? selectedCustomer.materials : []);
    }
  }, [newAnalysis.customer]);

  const handleSaveAnalysis = () => {
    const newId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
    const createdDate = new Date().toISOString().split("T")[0];
    const updatedDate = createdDate;
    setData([
      ...data,
      {
        id: newId,
        reportNumber: newAnalysis.reportNumber,
        createdDate,
        updatedDate,
        status: "Teslim Alındı",
        ...newAnalysis,
      },
    ]);
    setNewAnalysis({
      reportNumber: "",
      customer: "",
      material: "",
      standards: [],
      notes: [],
      parameterResults: [],
      checkedBy: "",
      approvedBy: "",
    });
    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTempAnalysis({ ...data[index] });
  };

  const handleSave = () => {
    const updatedData = [...data];
    updatedData[editIndex] = tempAnalysis;
    setData(updatedData);
    setEditIndex(null);
    setTempAnalysis(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setTempAnalysis(null);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleAddParameterResult = () => {
    if (newParameterResult.parameterId && newParameterResult.result) {
      setNewAnalysis({
        ...newAnalysis,
        parameterResults: [...newAnalysis.parameterResults, newParameterResult],
      });
      setNewParameterResult({ parameterId: "", result: "" });
    }
  };

  const handleRemoveParameterResult = (parameterId) => {
    setNewAnalysis({
      ...newAnalysis,
      parameterResults: newAnalysis.parameterResults.filter(
        (result) => result.parameterId !== parameterId
      ),
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Yeni Analiz Ekle</h2>
        <Button onClick={() => setIsModalOpen(true)} variant="outline">
          <PlusIcon /> Analiz Ekle
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="bg-white rounded-lg shadow-lg w-3/4 p-6 z-10">
            <h2 className="text-xl font-semibold mb-4">Yeni Analiz Ekle</h2>
            <div className="mb-2 flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Rapor Numarası"
                  value={newAnalysis.reportNumber}
                  onChange={(e) =>
                    setNewAnalysis({
                      ...newAnalysis,
                      reportNumber: e.target.value,
                    })
                  }
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex-1">
                <Select
                  onValueChange={(value) =>
                    setNewAnalysis({ ...newAnalysis, customer: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Müşteri Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer, index) => (
                      <SelectItem key={index} value={customer.name}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select
                  onValueChange={(value) =>
                    setNewAnalysis({ ...newAnalysis, material: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Materyal Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredMaterials.map((material, index) => (
                      <SelectItem key={index} value={material}>
                        {material}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-2">
              <Select
                onValueChange={(value) =>
                  setNewAnalysis({
                    ...newAnalysis,
                    standards: [...newAnalysis.standards, value],
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Analiz Standartları Seçin" />
                </SelectTrigger>
                <SelectContent>
                  {standards.map((standard, index) => (
                    <SelectItem key={index} value={standard}>
                      {standard}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div>
                {newAnalysis.standards.map((standard, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <span className="text-xs">{standard}</span>
                    <Button
                      size="xs"
                      onClick={() =>
                        setNewAnalysis({
                          ...newAnalysis,
                          standards: newAnalysis.standards.filter(
                            (s) => s !== standard
                          ),
                        })
                      }
                      variant="outline"
                    >
                      <MinusIcon />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <Select
                onValueChange={(value) =>
                  setNewAnalysis({
                    ...newAnalysis,
                    notes: [...newAnalysis.notes, value],
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Analiz Notları Seçin" />
                </SelectTrigger>
                <SelectContent>
                  {notes.map((note, index) => (
                    <SelectItem key={index} value={note}>
                      {note}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div>
                {newAnalysis.notes.map((note, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <span className="text-xs">{note}</span>
                    <Button
                      size="xs"
                      onClick={() =>
                        setNewAnalysis({
                          ...newAnalysis,
                          notes: newAnalysis.notes.filter((n) => n !== note),
                        })
                      }
                      variant="outline"
                    >
                      <MinusIcon />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-2 flex items-center gap-4">
              <Select
                onValueChange={(value) =>
                  setNewParameterResult({
                    ...newParameterResult,
                    parameterId: value,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Parametre Seçin" />
                </SelectTrigger>
                <SelectContent>
                  {parameters.map((parameter) => (
                    <SelectItem key={parameter.id} value={parameter.id}>
                      {parameter.parameter} | {parameter.unit} |{" "}
                      {parameter.limit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="Sonuç"
                value={newParameterResult.result}
                onChange={(e) =>
                  setNewParameterResult({
                    ...newParameterResult,
                    result: e.target.value,
                  })
                }
                className="border p-2 w-full max-w-xs"
              />
              <Button onClick={handleAddParameterResult} variant="outline">
                <PlusIcon />
              </Button>
            </div>

            <div className="mb-2">
              {newAnalysis.parameterResults.map((result, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <span className="text-xs">
                    {
                      parameters.find((p) => p.id === result.parameterId)
                        ?.parameter
                    }
                    : {result.result}
                  </span>
                  <Button
                    onClick={() =>
                      handleRemoveParameterResult(result.parameterId)
                    }
                    size="xs"
                    variant="outline"
                  >
                    <MinusIcon />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mb-2 flex gap-4">
              <Select
                onValueChange={(value) =>
                  setNewAnalysis({ ...newAnalysis, checkedBy: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kontrol Eden Personel Seçin" />
                </SelectTrigger>
                <SelectContent>
                  {personnel.map((person, index) => (
                    <SelectItem key={index} value={person}>
                      {person}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) =>
                  setNewAnalysis({ ...newAnalysis, approvedBy: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Onaylayan Personel Seçin" />
                </SelectTrigger>
                <SelectContent>
                  {personnel.map((person, index) => (
                    <SelectItem key={index} value={person}>
                      {person}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={handleSaveAnalysis} variant="solid">
                Tamamla
              </Button>
              <Button onClick={() => setIsModalOpen(false)} variant="outline">
                İptal
              </Button>
            </div>
          </div>
        </div>
      )}

      <Table>
        <TableCaption>Analiz Kayıtları</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[200px]">Rapor Numarası</TableHead>
            <TableHead className="w-[200px]">Oluşturulma Tarihi</TableHead>
            <TableHead className="w-[200px]">Güncellenme Tarihi</TableHead>
            <TableHead className="w-[200px]">Durum</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.reportNumber}</TableCell>
              <TableCell>{item.createdDate}</TableCell>
              <TableCell>{item.updatedDate}</TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Select
                    onValueChange={(value) =>
                      setTempAnalysis({ ...tempAnalysis, status: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Durum Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status, i) => (
                        <SelectItem key={i} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  item.status
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleSave}
                      className="mr-2 text-green-500 hover:text-green-700"
                    >
                      <SaveIcon />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      <CircleSlashIcon />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(index)}
                      className="mr-2"
                    >
                      <PencilIcon />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(index)}
                    >
                      <EraserIcon />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnalysisRecord;
