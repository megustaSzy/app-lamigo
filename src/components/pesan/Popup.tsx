export function Popup({
  title,
  desc,
  onClose,
}: {
  title: string;
  desc: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {" "}
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 text-center">
        {" "}
        <h3 className="text-lg font-semibold mb-1">{title}</h3>{" "}
        <p className="text-sm text-neutral-500 mb-6">{desc}</p>{" "}
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium"
        >
          {" "}
          OK{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}
