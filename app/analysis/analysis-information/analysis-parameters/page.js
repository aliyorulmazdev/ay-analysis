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
import { CircleSlashIcon, EraserIcon, PencilIcon, SaveIcon, PlusIcon } from 'lucide-react';

const initialData = [
  { id: 1, parameter: "Asidite(% Oleik Asit)", unit: "-", limit: "<0.8" },
  { id: 2, parameter: "Peroksit(meq g)", unit: "O/kg", limit: "<20" },
  { id: 3, parameter: "Trilinolein", unit: "-", limit: "-" },
  { id: 4, parameter: "K(232)-Uv'de Özgül Absorbans", unit: "-", limit: "<2.5" },
  { id: 5, parameter: "K(270)-Uv'de Özgül Absorbans", unit: "-", limit: "<0.22" },
  { id: 6, parameter: "ΔK-Uv'de Özgül Absorbans", unit: "-", limit: "<0.01" }
];

const AnalysisParameters = () => {
  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [newData, setNewData] = useState({ parameter: '', unit: '', limit: '' });

  const handleEdit = (index) => {
    setEditIndex(index);
    setTempData({ ...data[index] });
  };

  const handleChange = (e, field) => {
    setTempData({
      ...tempData,
      [field]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedData = [...data];
    updatedData[editIndex] = tempData;
    setData(updatedData);
    setEditIndex(null);
    setTempData(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setTempData(null);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleAdd = () => {
    if (newData.parameter && newData.unit && newData.limit) {
      setData([...data, { id: data.length + 1, ...newData }]);
      setNewData({ parameter: '', unit: '', limit: '' });
    }
  };

  const handleNewDataChange = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value
    });
  };

  return (
    <div>
        
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Yeni Analiz Parametresi Ekle</h2>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Test Parametresi"
            value={newData.parameter}
            onChange={(e) => handleNewDataChange(e, 'parameter')}
            className="border p-2 w-1/3"
          />
          <Input
            type="text"
            placeholder="Birim"
            value={newData.unit}
            onChange={(e) => handleNewDataChange(e, 'unit')}
            className="border p-2 w-1/3"
          />
          <Input
            type="text"
            placeholder="Limit"
            value={newData.limit}
            onChange={(e) => handleNewDataChange(e, 'limit')}
            className="border p-2 w-1/3"
          />
          <Button onClick={handleAdd} variant='outline' ><PlusIcon /></Button>
        </div>
        
      </div>
      <Table>
        <TableCaption>Analysis Parameters</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Test Parametresi</TableHead>
            <TableHead className="w-[100px]">Birim</TableHead>
            <TableHead className="w-[100px]">Limit</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="text"
                    value={tempData.parameter}
                    onChange={(e) => handleChange(e, 'parameter')}
                    className="border p-1"
                  />
                ) : (
                  item.parameter
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="text"
                    value={tempData.unit}
                    onChange={(e) => handleChange(e, 'unit')}
                    className="border p-1"
                  />
                ) : (
                  item.unit
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="text"
                    value={tempData.limit}
                    onChange={(e) => handleChange(e, 'limit')}
                    className="border p-1"
                  />
                ) : (
                  item.limit
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <>
                    <Button size='sm' variant='outline' onClick={handleSave} className='mr-2 text-green-500 hover:text-green-700'><SaveIcon /></Button>
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

export default AnalysisParameters;
