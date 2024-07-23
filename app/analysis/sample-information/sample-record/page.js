"use client";
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CircleSlashIcon, EraserIcon, PencilIcon, SaveIcon, PlusIcon } from 'lucide-react';

// Sample data
const sampleTypes = [
  { value: "zeytinyagi", label: "Zeytinyağı" },
  { value: "cicek", label: "Çiçekyağı" },
  { value: "ayciçek", label: "Ayçiçek Yağı" }
];

const companies = [
  { value: "firma1", label: "Firma 1" },
  { value: "firma2", label: "Firma 2" }
];

// Initial data
const initialData = [
  { id: "ED-M-123", company: "firma1", type: "zeytinyagi", date: "2024-07-13", status: "Teslim Alındı" },
  { id: "ED-M-124", company: "firma2", type: "cicek", date: "2024-07-15", status: "Analiz Edildi" },
  { id: "ED-M-125", company: "firma1", type: "ayciçek", date: "2024-07-20", status: "Bekliyor" },
];

const SampleRecord = () => {
  const [data, setData] = useState(initialData);
  const [newRecord, setNewRecord] = useState({
    company: companies[0].value,
    type: sampleTypes[0].value,
    date: '',
    status: 'Teslim Alındı',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [tempStatus, setTempStatus] = useState('');

  const handleAdd = () => {
    const newId = `ED-M-${(data.length + 123).toString().padStart(3, '0')}`;
    setData([...data, { id: newId, ...newRecord }]);
    setNewRecord({
      company: companies[0].value,
      type: sampleTypes[0].value,
      date: '',
      status: 'Teslim Alındı',
    });
  };

  const handleChange = (e, field) => {
    setNewRecord({
      ...newRecord,
      [field]: e.target.value
    });
  };

  const handleSelectChange = (value, field) => {
    setNewRecord({
      ...newRecord,
      [field]: value
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTempStatus(data[index].status);
  };

  const handleSave = (index) => {
    const updatedData = [...data];
    updatedData[index].status = tempStatus;
    setData(updatedData);
    setEditIndex(null);
    setTempStatus('');
  };

  const handleCancel = () => {
    setEditIndex(null);
    setTempStatus('');
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Yeni Numune Kaydı Ekle</h2>
        <div className="flex gap-4 mb-4">
          <Select
            value={newRecord.company}
            onValueChange={(value) => handleSelectChange(value, 'company')}
            className="border p-2 w-1/4"
          >
            <SelectTrigger>
              <SelectValue placeholder="Firma Seç" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.value} value={company.value}>{company.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={newRecord.type}
            onValueChange={(value) => handleSelectChange(value, 'type')}
            className="border p-2 w-1/4"
          >
            <SelectTrigger>
              <SelectValue placeholder="Numune Türü Seç" />
            </SelectTrigger>
            <SelectContent>
              {sampleTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={newRecord.date}
            onChange={(e) => handleChange(e, 'date')}
            className="border p-2 w-1/4"
          />
          <Button onClick={handleAdd} variant='outline'><PlusIcon /></Button>
        </div>
      </div>
      <Table>
        <TableCaption>Sample Records</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Numune ID</TableHead>
            <TableHead className="w-[150px]">Getiren</TableHead>
            <TableHead className="w-[150px]">Numune Türü</TableHead>
            <TableHead className="w-[150px]">Numune Alınma Tarihi</TableHead>
            <TableHead className="w-[150px]">Durum</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{companies.find(company => company.value === item.company)?.label}</TableCell>
              <TableCell>{sampleTypes.find(type => type.value === item.type)?.label}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Select
                    value={tempStatus}
                    onValueChange={setTempStatus}
                    className="border p-1"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Durum Seç" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Teslim Alındı">Teslim Alındı</SelectItem>
                      <SelectItem value="Analiz Edildi">Analiz Edildi</SelectItem>
                      <SelectItem value="Bekliyor">Bekliyor</SelectItem>
                      <SelectItem value="Arşive Kaldırıldı">Arşive Kaldırıldı</SelectItem>
                      <SelectItem value="Hatalı">Hatalı</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  item.status
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <>
                    <Button size='sm' variant='outline' onClick={() => handleSave(index)} className='mr-2 text-green-500 hover:text-green-700'><SaveIcon /></Button>
                    <Button size='sm' variant='outline' onClick={handleCancel}><CircleSlashIcon /></Button>
                  </>
                ) : (
                  <>
                    <Button size='sm' variant='outline' onClick={() => handleEdit(index)} className='mr-2'><PencilIcon /></Button>
                    <Button size='sm' variant='outline' className='text-red-500 hover:text-red-700' onClick={() => handleDelete(index)}><EraserIcon /></Button>
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

export default SampleRecord;
