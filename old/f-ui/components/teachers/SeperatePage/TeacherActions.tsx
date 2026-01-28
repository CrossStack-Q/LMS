export default function TeacherActions({ teacher }: any) {
  return (
    <div className="w-96 space-y-4 bg-white p-4 rounded-xl">
      <img
        src={teacher.videoThumbnail}
        className="w-full rounded-xl shadow"
      />

      <p className="text-zinc-500 flex justify-between items-center px-2">
        <span>Price per lesson</span>
        <span className=""><span className="text-2xl text-black font-semibold">${teacher.price} </span>/hr</span>
      </p>

      <button className="w-full bg-purple-400 text-black font-medium p-2 rounded-md hover:bg-purple-500">
        Book trial lesson
      </button>

      <button className="w-full border p-2 rounded-md">
        Send message
      </button>

      <div className=" text-zinc-500 px-1">
        <p>5 lessons booked in 48 hours</p>
        <p>⏱ 3-hour response time</p>
      </div>
    </div>
  );
}
