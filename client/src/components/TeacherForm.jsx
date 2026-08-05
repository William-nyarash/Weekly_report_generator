import user from "../assets/user-svgrepo-com.svg";

export default function TeacherForm({
  teacher,
  onChange,
  onSubmit,
  loading,
}) {
  return (
    <div className="w-full max-w-md bg-[#8077774d] rounded-2xl shadow-[5px_5px_13px_0px_#00000057] p-8">

      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-[#866c6c6e] flex items-center justify-center overflow-hidden">
          <img
            src={user}
            alt="Teacher"
            className="w-25 relative top-2.5"
          />
        </div>
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {/* Teacher Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teacher Name
          </label>

          <input
            type="text"
            name="full_name"
            value={teacher.full_name}
            onChange={onChange}
            placeholder="Tr. kamau"
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>

          <input
            type="text"
            name="course"
            value={teacher.course}
            onChange={onChange}
            placeholder="Care giving"
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level
          </label>

          <input
            type="text"
            name="level"
            value={teacher.level}
            onChange={onChange}
            placeholder="Level 6"
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Teacher..." : "Continue"}
        </button>
      </form>
    </div>
  );
}