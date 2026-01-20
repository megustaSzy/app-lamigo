import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

export default function ProfileRoleSection({ role }: { role: string }) {
  return (
    <div className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <Label className="flex items-center gap-2">
        <Shield className="h-4 w-4 text-gray-400" />
        Role Akun
      </Label>
      <Input disabled value={role} className="capitalize" />
      <p className="text-xs text-gray-500">
        Role tidak dapat diubah dari halaman ini
      </p>
    </div>
  );
}
