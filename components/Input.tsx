export default function Input({
  label,
  type,
  name,
  onChange,
  value,
  placeholder,
  error,
  touched
}) {
  return (
    <div className="flex flex-col gap-1 mb-4">

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {touched && error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

    </div>
  );
}
