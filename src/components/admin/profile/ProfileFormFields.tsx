import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Phone, User } from "lucide-react";
import { ProfileFormState } from "@/types/admin/profile";

type Props = {
  form: ProfileFormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProfileFormFields({ form, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          Nama Lengkap
        </Label>
        <Input name="name" value={form.name} onChange={onChange} />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-400" />
          Email
        </Label>
        <Input name="email" value={form.email} onChange={onChange} />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-gray-400" />
          No. Telepon
        </Label>
        <Input name="notelp" value={form.notelp} onChange={onChange} />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-gray-400" />
          Password Baru
        </Label>
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
        />
        <p className="text-xs text-muted-foreground">
          Minimal 8 karakter untuk keamanan lebih baik
        </p>
      </div>
    </div>
  );
}
