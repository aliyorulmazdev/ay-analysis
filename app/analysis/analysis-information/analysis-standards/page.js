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

const initialStandards = [
  { id: 1, standard: "C.O.I" },
  { id: 2, standard: "B.O.I" },
  { id: 3, standard: "A.G.I" }
];

const AnalysisStandards = () => {
  const [standards, setStandards] = useState(initialStandards);
  const [editIndex, setEditIndex] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [newStandard, setNewStandard] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setTempData({ ...standards[index] });
  };

  const handleChange = (e, field) => {
    setTempData({
      ...tempData,
      [field]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedStandards = [...standards];
    updatedStandards[editIndex] = tempData;
    setStandards(updatedStandards);
    setEditIndex(null);
    setTempData(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setTempData(null);
  };

  const handleDelete = (index) => {
    const updatedStandards = standards.filter((_, i) => i !== index);
    setStandards(updatedStandards);
  };

  const handleAdd = () => {
    if (newStandard) {
      setStandards([...standards, { id: standards.length + 1, standard: newStandard }]);
      setNewStandard('');
    }
  };

  const handleNewStandardChange = (e) => {
    setNewStandard(e.target.value);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Yeni Analiz Standardı Ekle</h2>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Standart Adı"
            value={newStandard}
            onChange={handleNewStandardChange}
            className="border p-2 w-1/3"
          />
          <Button onClick={handleAdd} variant='outline' ><PlusIcon /></Button>
        </div>
      </div>

      <Table>
        <TableCaption>Analysis Standards</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Standart Adı</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standards.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="text"
                    value={tempData.standard}
                    onChange={(e) => handleChange(e, 'standard')}
                    className="border p-1"
                  />
                ) : (
                  item.standard
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

export default AnalysisStandards;
