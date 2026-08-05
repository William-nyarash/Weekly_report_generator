const TeacherCard = ({ teacher, onCreateReport }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-xl font-bold text-gray-800">
        {teacher.full_name}
      </h2>

      <div className="mt-3 text-gray-600 space-y-1">

        <p>
          <span className="font-semibold">
            Department:
          </span>{" "}
          {teacher.course}
        </p>

        <p>
          <span className="font-semibold">
            Level:
          </span>{" "}
          {teacher.level}
        </p>

      </div>


      <button
        onClick={() => onCreateReport(teacher.id)}
        className="
          mt-5
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-2
          rounded-lg
          transition
        "
      >
        Create Report
      </button>

    </div>
  );
};

export default TeacherCard;
