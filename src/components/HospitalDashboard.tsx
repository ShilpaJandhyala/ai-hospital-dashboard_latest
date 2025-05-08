'use client';
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Patient {
  id: string;
  name: string;
  queueNumber: number;
  department: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Waiting' | 'In Progress' | 'Completed';
  checkInTime: Date;
  estimatedWaitTime: number; // in minutes
}

const departments = [
  'General Medicine',
  'Pediatrics',
  'Orthopedics',
  'Cardiology',
  'Dermatology',
  'ENT',
  'Ophthalmology',
  'Gynecology'
];

const HospitalDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [name, setName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const calculateWaitTime = (department: string, priority: 'High' | 'Medium' | 'Low'): number => {
    const departmentPatients = patients.filter(p => p.department === department);
    const baseWaitTime = departmentPatients.length * 15;

    switch (priority) {
      case 'High':
        return Math.max(5, baseWaitTime * 0.5);
      case 'Medium':
        return baseWaitTime;
      case 'Low':
        return baseWaitTime * 1.5;
    }
  };

  const handleAddPatient = () => {
    if (name.trim() === "" || selectedDepartment === "") return;

    const newPatient: Patient = {
      id: Date.now().toString(),
      name,
      queueNumber: patients.length + 1,
      department: selectedDepartment,
      priority: selectedPriority,
      status: 'Waiting',
      checkInTime: new Date(),
      estimatedWaitTime: calculateWaitTime(selectedDepartment, selectedPriority)
    };

    setPatients([...patients, newPatient]);
    setName("");
    setSelectedDepartment("");
    setSelectedPriority('Medium');
  };

  const handleStatusChange = (patientId: string, newStatus: 'Waiting' | 'In Progress' | 'Completed') => {
    setPatients(patients.map(patient =>
      patient.id === patientId ? { ...patient, status: newStatus } : patient
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Waiting': return 'bg-yellow-100 text-yellow-900';
      case 'In Progress': return 'bg-blue-100 text-blue-900';
      case 'Completed': return 'bg-green-100 text-green-900';
      default: return 'bg-gray-100 text-gray-900';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-900';
      case 'Medium': return 'bg-yellow-100 text-yellow-900';
      case 'Low': return 'bg-green-100 text-green-900';
      default: return 'bg-gray-100 text-gray-900';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <Card className="shadow-xl border border-gray-200">
        <CardContent className="space-y-6 py-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">🏥 Smart Patient Queue System</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Enter patient name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl"
            />
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={(value: 'High' | 'Medium' | 'Low') => setSelectedPriority(value)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High Priority</SelectItem>
                <SelectItem value="Medium">Medium Priority</SelectItem>
                <SelectItem value="Low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddPatient} className="rounded-xl">Add to Queue</Button>
          </div>

          <div className="space-y-4">
            {patients.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No patients in queue.</p>
            ) : (
              patients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-lg font-semibold text-gray-700">#{patient.queueNumber}</span>
                        <span className="font-medium text-gray-800">{patient.name}</span>
                        <Badge className={`rounded-md ${getPriorityColor(patient.priority)}`}>
                          {patient.priority} Priority
                        </Badge>
                        <Badge className={`rounded-md ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Department: <span className="font-medium">{patient.department}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Check-in: <span className="font-mono">{patient.checkInTime.toLocaleTimeString()}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Est. Wait: <span className="font-semibold">{patient.estimatedWaitTime} mins</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {patient.status === 'Waiting' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                          onClick={() => handleStatusChange(patient.id, 'In Progress')}
                        >
                          Start Consultation
                        </Button>
                      )}
                      {patient.status === 'In Progress' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                          onClick={() => handleStatusChange(patient.id, 'Completed')}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalDashboard;