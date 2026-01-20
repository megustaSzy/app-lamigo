interface Props {}

export default function DashboardHeader({}: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-700 tracking-tight">
        Dashboard Admin
      </h2>
      <p className="text-sm text-muted-foreground mt-1">
        Selamat datang kembali! Berikut ringkasan data Anda.
      </p>
    </div>
  );
}
