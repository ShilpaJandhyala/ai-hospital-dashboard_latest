'use client';
import React, { useState} from "react";
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

  // // Calculate average wait time based on current queue
  // const calculateWaitTime = (department: string, priority: 'High' | 'Medium' | 'Low'): number => {
  //   const departmentPatients = patients.filter(p => p.department === department);
  //   const baseWaitTime = departmentPatients.length * 15; // 15 minutes per patient
    
  //   // Adjust wait time based on priority
  //   switch (priority) {
  //     case 'High':
  //       return Math.max(5, baseWaitTime * 0.5); // 50% of normal wait time, minimum 5 minutes
  //     case 'Medium':
  //       return baseWaitTime;
  //     case 'Low':
  //       return baseWaitTime * 1.5; // 150% of normal wait time
  //   }
  // };

  const getEstimatedWaitTime = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return Math.floor(Math.random() * 5) + 1; // 1–5 mins
      case "Medium":
        return Math.floor(Math.random() * 10) + 6; // 6–15 mins
      case "Low":
        return Math.floor(Math.random() * 15) + 16; // 16–30 mins
      default:
        return 10;
    }
  };

  const handleAddPatient = () => {
    if (!name || !selectedDepartment || !selectedPriority) return;
  
    const newPatient: Patient = {
      id: Date.now().toString(),
      name,
      department: selectedDepartment,
      priority: selectedPriority,
      checkInTime: new Date(),
      status: "Waiting",
      queueNumber: patients.length + 1,
      estimatedWaitTime: getEstimatedWaitTime(selectedPriority),
    };
  
    setPatients([...patients, newPatient]);
    setName(""); setSelectedDepartment(""); setSelectedPriority("");
  };
  

  const handleStatusChange = (patientId: string, newStatus: 'Waiting' | 'In Progress' | 'Completed') => {
    setPatients(patients.map(patient => 
      patient.id === patientId ? { ...patient, status: newStatus } : patient
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Waiting': return 'bg-yellow-400 text-white';
      case 'In Progress': return 'bg-blue-500 text-white';
      case 'Completed': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-yellow-400 text-white';
      case 'Low': return 'bg-teal-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-teal-400 to-white-700 p-8">
      <div className="space-y-6 relative max-w-5xl mx-auto">
        {/* Fixed Header Section */}
        <Card className="bg-white shadow-lg rounded-3xl p-6 border border-gray-300 sticky top-8 z-10">
          <CardContent className="space-y-4">
            <h2 className="text-3xl font-extrabold text-teal-700 text-center">Smart Patient Queue System</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Enter patient name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 rounded-lg bg-transparent text-teal-700 border-2 border-gray-300"
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
              <Button onClick={handleAddPatient} className="bg-teal-600 text-white hover:bg-teal-700">
                Add to Queue
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scrollable Patient Queue Section */}
        <div className="h-[70vh] overflow-y-auto rounded-xl p-4 bg-white bg-opacity-70 shadow-inner">
          {patients.length === 0 ? (
            <p className="text-gray-500 text-center">No patients in queue.</p>
          ) : (
            patients.map((patient) => (
              <div key={patient.id} className="p-4 border rounded-lg bg-white shadow-md mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-teal-700">#{patient.queueNumber}</span>
                      <span className="font-medium text-teal-700">{patient.name}</span>
                      <Badge className={getPriorityColor(patient.priority)}>{patient.priority} Priority</Badge>
                      <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Department: {patient.department}</div>
                    <div className="text-sm text-gray-500">Check-in: {patient.checkInTime.toLocaleTimeString()}</div>
                    <div className="text-sm text-gray-500">Est. Wait: {patient.estimatedWaitTime} minutes</div>
                  </div>
                  <div className="flex gap-2">
                    {patient.status === 'Waiting' && (
                      <Button size="sm" className="bg-teal-600 text-white" onClick={() => handleStatusChange(patient.id, 'In Progress')}>
                        Start Consultation
                      </Button>
                    )}
                    {patient.status === 'In Progress' && (
                      <Button size="sm" className="bg-green-500 text-white" onClick={() => handleStatusChange(patient.id, 'Completed')}>
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
