// components/RoleSwitcher.jsx
"use client";
import { useApp } from "@/context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RoleSwitcher() {
  const { role, setRole } = useApp();

  return (
    <div className="flex items-center gap-2">
      <label>Operator :</label>
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Operator">Operator</SelectItem>
          <SelectItem value="Technician">Technician</SelectItem>
          <SelectItem value="Manager">Manager</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
