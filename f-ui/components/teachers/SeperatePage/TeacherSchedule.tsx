export default function TeacherSchedule() {
  const times = [
    "8:30", "9:00", "9:30", "10:00", "10:30", "11:00",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "18:00"
  ];

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Schedule</h2>

      <div className="grid grid-cols-4 gap-4">
        {times.map((t) => (
          <button
            key={t}
            className="p-3 rounded-lg border hover:bg-purple-100"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
