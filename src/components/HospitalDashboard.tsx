'use client';
import React, { useState, useEffect } from "react";
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

  // Calculate average wait time based on current queue
  const calculateWaitTime = (department: string, priority: 'High' | 'Medium' | 'Low'): number => {
    const departmentPatients = patients.filter(p => p.department === department);
    const baseWaitTime = departmentPatients.length * 15; // 15 minutes per patient
    
    // Adjust wait time based on priority
    switch (priority) {
      case 'High':
        return Math.max(5, baseWaitTime * 0.5); // 50% of normal wait time, minimum 5 minutes
      case 'Medium':
        return baseWaitTime;
      case 'Low':
        return baseWaitTime * 1.5; // 150% of normal wait time
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
      case 'Waiting': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="space-y-6"
      style={{
        backgroundImage: 'url("/background.png")', // Path to your PNG image
        backgroundSize: 'cover', // Ensure the image covers the entire container
        backgroundPosition: 'center', // Center the background
        backgroundRepeat: 'no-repeat', // Prevent repeating the image
      }}
    >
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Smart Patient Queue System</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Enter patient name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={(value: 'High' | 'Medium' | 'Low') => setSelectedPriority(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High Priority</SelectItem>
                <SelectItem value="Medium">Medium Priority</SelectItem>
                <SelectItem value="Low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddPatient}>Add to Queue</Button>
          </div>
          <div className="space-y-2">
            {patients.length === 0 ? (
              <p className="text-gray-500">No patients in queue.</p>
            ) : (
              patients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 border rounded-lg bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">#{patient.queueNumber}</span>
                        <span className="font-medium">{patient.name}</span>
                        <Badge className={getPriorityColor(patient.priority)}>
                          {patient.priority} Priority
                        </Badge>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Department: {patient.department}
                      </div>
                      <div className="text-sm text-gray-600">
                        Check-in: {patient.checkInTime.toLocaleTimeString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        Est. Wait: {patient.estimatedWaitTime} minutes
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {patient.status === 'Waiting' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusChange(patient.id, 'In Progress')}
                        >
                          Start Consultation
                        </Button>
                      )}
                      {patient.status === 'In Progress' && (
                        <Button 
                          size="sm" 
                          variant="outline"
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
