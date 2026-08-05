export default function AttendanceForm({
  attendance,
  onChange,
  onSubmit,
  loading,
}) {
  return (
    <form
      onSubmit={onSubmit}
    >
      <div className=" flex flex-col  mb-5 gap-2.5  md:flex-row md:items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-heading tracking-tight leading-tight">
          Weekly Attendance
        </h1>
        <div className="text-xs sm:text-sm font-medium text-white  px-3 py-1.5 sm:px-4 sm:py-2 flex items-center rounded-lg self-start  bg-amber-600 border border-border-light whitespace-nowrap">
          {attendance.length} Days to Record
        </div>
      </div>

      <div className="flex  flex-col gap-7">
        {attendance.map((day, index) => (
          <div
            key={day.day_name ?? ""}
            className="
              relative 
              group 
              bg-gray-50
              rounded-xl sm:rounded-2xl 
              p-4 sm:p-5 md:p-6 
              border-border-medium 
              shadow-sm 
              transition-all duration-300 
              hover:shadow-xl 
            "
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-brand-soft flex items-center justify-center text-black font-bold text-base sm:text-lg shadow-sm shrink-0">
                {index + 1}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-heading group-hover:text-brand transition-colors duration-300">
                {day.day_name}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="relative">
               <div>
                <div className="">
                <label className="block text-xs font-bold uppercase tracking-wide mb-2">
                  Present Students
                </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="0"
                      inputMode="numeric"
                      value={day.present_students}
                      onChange={(e) =>
                        onChange(index, "present_students", e.target.value)
                      }
                      className="
                        w-full
                      bg-gray-200
                        px-2.5 py-2
                        rounded-2xl
                        shadow-inner 
                      focus:outline-none 
                        focus:border-brand 
                        focus:ring-4 
                        focus:ring-brand-soft 
                        transition-all duration-200
                        placeholder:text-muted/50
                        [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                       "
                      placeholder="Present students"
                    /> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 absolute right-4.75 text-green-600 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </div>
                    </div>
                  </div>
              </div>
              <div className="relative">
                <label className="block text-xs font-bold uppercase tracking-wider text-body mb-2">
                  Absent Students
                </label>
                   <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        inputMode="numeric"
                        value={day.absent_students}
                        onChange={(e) =>
                          onChange(index, "absent_students", e.target.value)
                        }
                        className="
                          w-full
                        bg-gray-200
                          px-2.5 py-2
                          rounded-2xl
                          shadow-inner 
                          focus:outline-none 
                          focus:border-brand 
                          focus:ring-4 
                          focus:ring-brand-soft 
                          transition-all duration-200
                          placeholder:text-muted/50
                          [appearance:textfield]
                          [&::-webkit-outer-spin-button]:appearance-none
                          [&::-webkit-inner-spin-button]:appearance-none
                        "
                        placeholder="Absent students"
                      />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  absolute right-4.75 text-red-500 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                 </div>
              </div>
            </div>
            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-body mb-2">
                Teacher Comment
              </label>
              <textarea
                rows={3}
                value={day.teacher_comment}
                onChange={(e) =>
                  onChange(index, "teacher_comment", e.target.value)
                }
                className="
                  w-full 
                bg-gray-200 
                  rounded-xl 
                  p-3 sm:p-4 
                  text-base font-medium text-heading 
                  shadow-inner 
                  focus:outline-none 
                  focus:border-brand 
                  focus:ring-4 
                  focus:ring-brand-soft 
                  transition-all duration-200
                  placeholder:text-muted/50
                  resize-none
                "
                placeholder="Add any notable observations..."
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-brand opacity-78 rounded-xl sm:mt-8">
      <button
        type="submit"
        disabled={loading}
        className="
          relative 
          w-full 
          overflow-hidden 
          bg-linear-to 
          from-brand 
          to-brand-strong 
          hover:from-brand-hover 
          hover:to-brand-medium 
          text-white 
          font-bold 
          text-base sm:text-lg 
          py-3 sm:py-4 
          px-4 sm:px-8 
          rounded-xl 
          shadow-xl 
          shadow-brand-glow 
          transition-all 
          duration-300 
          transform 
          hover:-translate-y-1 
          hover:shadow-2xl 
          active:scale-[0.98]
          disabled:opacity-60 
          disabled:cursor-not-allowed 
          disabled:transform-none 
          disabled:shadow-none
        "
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2 sm:gap-3">
            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Finish Report"
        )}
      </button>
      </div>
    </form>
  );
}