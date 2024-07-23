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

// Initial data
const initialData = [
  { id: 1, companyName: "Firma A", address: "Adres A", phoneNumber: "1234567890" },
  { id: 2, companyName: "Firma B", address: "Adres B", phoneNumber: "0987654321" },
  { id: 3, companyName: "Firma C", address: "Adres C", phoneNumber: "1122334455" },
];

const CustomerRecord = () => {
  const [data, setData] = useState(initialData);
  const [newCustomer, setNewCustomer] = useState({
    companyName: '',
    address: '',
    phoneNumber: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [tempCustomer, setTempCustomer] = useState(null);

  const handleAdd = () => {
    if (newCustomer.companyName && newCustomer.address && newCustomer.phoneNumber) {
      const newId = data.length ? Math.max(data.map(d => d.id)) + 1 : 1;
      setData([...data, { id: newId, ...newCustomer }]);
      setNewCustomer({ companyName: '', address: '', phoneNumber: '' });
    }
  };

  const handleChange = (e, field) => {
    setTempCustomer({
      ...tempCustomer,
      [field]: e.target.value
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTempCustomer({ ...data[index] });
  };

  const handleSave = () => {
    const updatedData = [...data];
    updatedData[editIndex] = tempCustomer;
    setData(updatedData);
    setEditIndex(null);
    setTempCustomer(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setTempCustomer(null);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleNewCustomerChange = (e, field) => {
    setNewCustomer({
      ...newCustomer,
      [field]: e.target.value
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Yeni Müşteri Kaydı Ekle</h2>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Firma Adı"
            value={newCustomer.companyName}
            onChange={(e) => handleNewCustomerChange(e, 'companyName')}
            className="border p-2 w-1/4"
          />
          <Input
            type="text"
            placeholder="Adres"
            value={newCustomer.address}
            onChange={(e) => handleNewCustomerChange(e, 'address')}
            className="border p-2 w-1/4"
          />
          <Input
            type="text"
            placeholder="Telefon Numarası"
            value={newCustomer.phoneNumber}
            onChange={(e) => handleNewCustomerChange(e, 'phoneNumber')}
            className="border p-2 w-1/4"
          />
          <Button onClick={handleAdd} variant='outline'><PlusIcon /></Button>
        </div>
      </div>
      <Table>
        <TableCaption>Müşteri Kayıtları</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[200px]">Firma Adı</TableHead>
            <TableHead className="w-[300px]">Adres</TableHead>
            <TableHead className="w-[200px]">Telefon Numarası</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="text"
                    value={tempCustomer.companyName}
                    onChange={(e) => handleChange(e, 'companyName')}
                    className="border p-1"
                  />
                ) : (
                  item.companyName
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="text"
                    value={tempCustomer.address}
                    onChange={(e) => handleChange(e, 'address')}
                    className="border p-1"
                  />
                ) : (
                  item.address
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    type="text"
                    value={tempCustomer.phoneNumber}
                    onChange={(e) => handleChange(e, 'phoneNumber')}
                    className="border p-1"
                  />
                ) : (
                  item.phoneNumber
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

export default CustomerRecord;
