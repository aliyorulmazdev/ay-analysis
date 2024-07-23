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

const initialSampleTypes = [
  { id: 1, name: "Zeytinyağı" },
  { id: 2, name: "Çiçekyağı" },
  { id: 3, name: "Ayçiçek Yağı" } // Added another sample type
];

const SampleTypes = () => {
  const [sampleTypes, setSampleTypes] = useState(initialSampleTypes);
  const [editIndex, setEditIndex] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [newName, setNewName] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setTempData({ ...sampleTypes[index] });
  };

  const handleChange = (e, field) => {
    setTempData({
      ...tempData,
      [field]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedSampleTypes = [...sampleTypes];
    updatedSampleTypes[editIndex] = tempData;
    setSampleTypes(updatedSampleTypes);
    setEditIndex(null);
    setTempData(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setTempData(null);
  };

  const handleDelete = (index) => {
    const updatedSampleTypes = sampleTypes.filter((_, i) => i !== index);
    setSampleTypes(updatedSampleTypes);
  };

  const handleAdd = () => {
    if (newName) {
      setSampleTypes([...sampleTypes, { id: sampleTypes.length + 1, name: newName }]);
      setNewName('');
    }
  };

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Yeni Numune Tipi Ekle</h2>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Numune Tipi"
            value={newName}
            onChange={handleNewNameChange}
            className="border p-2 w-2/3"
          />
          <Button onClick={handleAdd} variant='outline' ><PlusIcon /></Button>
        </div>
      </div>

      <Table>
        <TableCaption>Sample Types</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Numune Tipi</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleTypes.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="text"
                    value={tempData.name}
                    onChange={(e) => handleChange(e, 'name')}
                    className="border p-1"
                  />
                ) : (
                  item.name
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

export default SampleTypes;
