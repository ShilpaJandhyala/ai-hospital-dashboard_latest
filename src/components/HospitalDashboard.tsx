'use client';
import React from "react";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// import { Card, CardContent, StatCard } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Mic } from "lucide-react";
// import { User } from "lucide-react";


// <StatCard title="Patients Waiting" value="12" icon={<User />} />

// const mockQueue = [
//   { name: "John Doe", department: "ER", waitTime: "15 mins" },
//   { name: "Rita Patel", department: "OPD", waitTime: "25 mins" },
//   { name: "A. Sharma", department: "Cardiology", waitTime: "10 mins" },
// ];

// const mockInventory = [
//   { item: "Oxygen Cylinders", stock: 4 },
//   { item: "Surgical Gloves", stock: 200 },
//   { item: "Paracetamol Syrup", stock: 12 },
//   { item: "IV Kits", stock: 3 },
// ];



interface Patient {
  name: string;
  queueNumber: number;
}

const HospitalDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [name, setName] = useState("");

  const handleAddPatient = () => {
    if (name.trim() === "") return;

    const newPatient: Patient = {
      name,
      queueNumber: patients.length + 1,
    };
    setPatients([...patients, newPatient]);
    setName("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Live Patient Queue</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Enter patient name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleAddPatient}>Add to Queue</Button>
          </div>
          <div className="space-y-2">
            {patients.length === 0 ? (
              <p className="text-gray-500">No patients in queue.</p>
            ) : (
              patients.map((patient) => (
                <div
                  key={patient.queueNumber}
                  className="p-2 border rounded-lg bg-gray-50"
                >
                  <span className="font-semibold">#{patient.queueNumber}</span>{" "}
                  - {patient.name}
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


// export default function HospitalDashboard() {
//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Queue Management Section */}
//       <Card className="rounded-2xl shadow-lg">
//         <CardContent className="p-4">
//           <h2 className="text-xl font-bold mb-4">🧑‍⚕ Patient Queue Overview</h2>
//           {mockQueue.map((patient, i) => (
//             <div key={i} className="mb-2 p-3 bg-gray-100 rounded-xl">
//               <div className="font-semibold">{patient.name}</div>
//               <div className="text-sm text-gray-600">
//                 Dept: {patient.department} | Wait: {patient.waitTime}
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Inventory Status Section */}
//       <Card className="rounded-2xl shadow-lg">
//         <CardContent className="p-4">
//           <h2 className="text-xl font-bold mb-4">📦 Inventory Status</h2>
//           {mockInventory.map((item, i) => (
//             <div
//               key={i}
//               className={`mb-2 p-3 rounded-xl ${
//                 item.stock < 10 ? "bg-red-100" : "bg-green-100"
//               }`}
//             >
//               <div className="font-semibold">{item.item}</div>
//               <div className="text-sm text-gray-700">
//                 Stock: {item.stock} units
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Voice Command Section */}
//       <Card className="col-span-1 md:col-span-2 rounded-2xl shadow-lg">
//         <CardContent className="p-4">
//           <h2 className="text-xl font-bold mb-2">🎤 Voice Assistant (Demo)</h2>
//           <div className="flex items-center gap-2">
//             <Input placeholder="Ask about stock, queue..." className="w-full" />
//             <Button variant="outline" className="rounded-full">
//               <Mic size={20} />
//             </Button>
//           </div>
//           <p>Try commands like: &quot;Show ER wait time&quot; or &quot;Do we have paracetamol?&quot;</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
