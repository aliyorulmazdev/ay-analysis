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

const initialNotes = [
  { id: 1, note: "Bu analiz raporu adli-idari işlemlerde ve reklam amacı ile kullanılamaz." },
  { id: 2, note: "Bu analiz raporunun, hiçbir bölümü tek başına veya ayrı ayrı kullanılamaz." },
  { id: 3, note: "Bu analiz raporu yukarıda belirtilen numune için geçerlidir." }
];

const AnalysisNotes = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [editIndex, setEditIndex] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [newNote, setNewNote] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setTempData({ ...notes[index] });
  };

  const handleChange = (e, field) => {
    setTempData({
      ...tempData,
      [field]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedNotes = [...notes];
    updatedNotes[editIndex] = tempData;
    setNotes(updatedNotes);
    setEditIndex(null);
    setTempData(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setTempData(null);
  };

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleAdd = () => {
    if (newNote) {
      setNotes([...notes, { id: notes.length + 1, note: newNote }]);
      setNewNote('');
    }
  };

  const handleNewNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Yeni Analiz Notu Ekle</h2>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Not"
            value={newNote}
            onChange={handleNewNoteChange}
            className="border p-2 w-2/3"
          />
          <Button onClick={handleAdd} variant='outline' ><PlusIcon /></Button>
        </div>
      </div>

      <Table>
        <TableCaption>Analysis Notes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[500px]">Not</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="text"
                    value={tempData.note}
                    onChange={(e) => handleChange(e, 'note')}
                    className="border p-1"
                  />
                ) : (
                  item.note
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

export default AnalysisNotes;
