import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic } from "lucide-react";

const mockQueue = [
  { name: "John Doe", department: "ER", waitTime: "15 mins" },
  { name: "Rita Patel", department: "OPD", waitTime: "25 mins" },
  { name: "A. Sharma", department: "Cardiology", waitTime: "10 mins" },
];

const mockInventory = [
  { item: "Oxygen Cylinders", stock: 4 },
  { item: "Surgical Gloves", stock: 200 },
  { item: "Paracetamol Syrup", stock: 12 },
  { item: "IV Kits", stock: 3 },
];

export default function HospitalDashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Queue Management Section */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">🧑‍⚕ Patient Queue Overview</h2>
          {mockQueue.map((patient, i) => (
            <div key={i} className="mb-2 p-3 bg-gray-100 rounded-xl">
              <div className="font-semibold">{patient.name}</div>
              <div className="text-sm text-gray-600">
                Dept: {patient.department} | Wait: {patient.waitTime}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Inventory Status Section */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">📦 Inventory Status</h2>
          {mockInventory.map((item, i) => (
            <div
              key={i}
              className={`mb-2 p-3 rounded-xl ${
                item.stock < 10 ? "bg-red-100" : "bg-green-100"
              }`}
            >
              <div className="font-semibold">{item.item}</div>
              <div className="text-sm text-gray-700">
                Stock: {item.stock} units
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Voice Command Section */}
      <Card className="col-span-1 md:col-span-2 rounded-2xl shadow-lg">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">🎤 Voice Assistant (Demo)</h2>
          <div className="flex items-center gap-2">
            <Input placeholder="Ask about stock, queue..." className="w-full" />
            <Button variant="outline" className="rounded-full">
              <Mic size={20} />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Try commands like: "Show ER wait time" or "Do we have paracetamol?"
          </p>
        </CardContent>
      </Card>
    </div>
  );
}