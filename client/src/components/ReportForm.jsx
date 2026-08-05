const ReportForm = ({
  report,
  onChange,
  onSubmit,
  onCancel,
  loading,
}) => {

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 px-1.5"
    >
      <div className="flex flex-row text-sm font-medium justify-between items-center gap-3">
        <label className="block bg-[#ff5900]/80 p-[12px_10px] rounded-md text-md font-medium text-white mb-2">
          Week Start
        </label>

        <input
          type="date"
          name="week_start"
          value={report.week_start}
          onChange={onChange}
          className="
            bg-bg-surface 
            border border-border-medium 
            text-heading 
            text-sm 
            rounded-base 
            px-4 py-3 
            focus:outline-none 
            focus:ring-2 
            focus:ring-brand 
            focus:border-transparent 
            shadow-sm 
            transition-all duration-200
            placeholder:text-muted
          "
          required
        />
      </div>
      <div className="flex flex-row text-sm font-medium justify-between items-center gap-3">
        <label className="block bg-[#ff5900]/80 p-[12px_10px] rounded-md text-md font-medium text-white mb-2">
          Week End
        </label>

        <input
          type="date"
          name="week_end"
          value={report.week_end}
          onChange={onChange}
          className="
            bg-bg-surface 
            border border-border-medium 
            text-heading 
            text-sm 
            rounded-base 
            px-4 py-3 
            focus:outline-none 
            focus:ring-2 
            focus:ring-brand 
            focus:border-transparent 
            shadow-sm 
            transition-all duration-200
            placeholder:text-muted
          "
          required
        />
      </div>
      <div className="flex flex-col gap-2.5 text-sm">
        <label className="block text-sm font-medium text-heading">
          Tutor Attendance
        </label>

        <input
          type="text"
          name="tutors_class_attendance"
          value={report.tutors_class_attendance}
          onChange={onChange}
          className="
            bg-bg-surface 
            border border-border-medium 
            text-heading 
            text-sm 
            rounded-base 
            px-4 py-3 
            focus:outline-none 
            focus:ring-2 
            focus:ring-brand 
            focus:border-transparent 
            shadow-sm 
            transition-all duration-200
            placeholder:text-muted
          "
        />
      </div>
      <div className="flex flex-col gap-2.5 text-sm">
        <label className="block text-sm font-medium text-heading">
          New Admissions / Dropouts
        </label>

        <input
          type="number"
          name="new_admissions_and_dropouts"
          value={report.new_admissions_and_dropouts}
          onChange={onChange}
          className="
            bg-bg-surface 
            border border-border-medium 
            text-heading 
            text-sm 
            rounded-base 
            px-4 py-3 
            focus:outline-none 
            focus:ring-2 
            focus:ring-brand 
            focus:border-transparent 
            shadow-sm 
            transition-all duration-200
            placeholder:text-muted
          "
        />
      </div>
      <div className="flex flex-col gap-2.5 text-sm">
        <label className="block text-sm font-medium text-heading">
          Activities Completed
        </label>

        <textarea
          name="weeks_activity_completion"
          value={report.weeks_activity_completion}
          onChange={onChange}
          className="
            bg-bg-surface 
            border border-border-medium 
            text-heading 
            text-sm 
            rounded-base 
            px-4 py-3 
            focus:outline-none 
            focus:ring-2 
            focus:ring-brand 
            focus:border-transparent 
            shadow-sm 
            transition-all duration-200
            placeholder:text-muted
            min-h-5
          "
        />
      </div>
      <div className="flex flex-col gap-2.5 text-sm">
        <label className="block text-sm font-medium text-heading">
          Activities Not Completed
        </label>

        <textarea
          name="weeks_activity_not_completed"
          value={report.weeks_activity_not_completed}
          onChange={onChange}
          className="
            bg-bg-surface 
            border border-border-medium 
            text-heading 
            text-sm 
            rounded-base 
            px-4 py-3 
            focus:outline-none 
            focus:ring-2 
            focus:ring-brand 
            focus:border-transparent 
            shadow-sm 
            transition-all duration-200
            placeholder:text-muted
            min-h-5
          "
        />
      </div>
      <div className="flex flex-col gap-2.5 text-sm">
        <label className="block text-sm font-medium text-heading">
          Issues for immediate attention
        </label>
        <textarea
          name="aobs"
          value={report.aobs}
          onChange={onChange}
          className="
            bg-bg-surface 
            border border-border-medium 
            text-heading 
            text-sm 
            rounded-base 
            px-4 py-3 
            focus:outline-none 
            focus:ring-2 
            focus:ring-brand 
            focus:border-transparent 
            shadow-sm 
            transition-all duration-200
            placeholder:text-muted
            min-h-5
          "
        />
      </div>
      <div className="flex flex-col gap-2.5 text-sm">
        <label className="block text-sm font-medium text-heading">
          Assessment
        </label>

        <textarea
          name="assessment"
          value={report.assessment}
          onChange={onChange}
          className="
            bg-bg-surface 
            border border-border-medium 
            text-heading 
            text-sm 
            rounded-base 
            px-4 py-3 
            focus:outline-none 
            focus:ring-2 
            focus:ring-brand 
            focus:border-transparent 
            shadow-sm 
            transition-all duration-200
            placeholder:text-muted
            min-h-5
          "
        />
      </div>
      <div className="flex flex-col gap-2.5 text-sm">
        <label className="block text-sm font-medium text-heading">
          Remarks
        </label>
        <textarea
          name="remarks"
          value={report.remarks}
          onChange={onChange}
          className="
            bg-bg-surface 
            border border-border-medium 
            text-heading 
            text-sm 
            rounded-base 
            px-4 py-3 
            focus:outline-none 
            focus:ring-2 
            focus:ring-brand 
            focus:border-transparent 
            shadow-sm 
            transition-all duration-200
            placeholder:text-muted
            min-h-5
          "
        />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="
            flex-1 
            bg-white 
            border border-border-medium 
            text-heading 
            font-medium 
            py-2 px-3 
            rounded-base 
            hover:bg-bg-surface 
            hover:text-brand 
            transition-all duration-200
            focus:ring-4 
            focus:ring-bg-surface
          "
        >
          Cancel
        </button>
        <button
          disabled={loading}
          className="
            flex-1 
            bg-brand 
            hover:bg-brand-hover 
            active:bg-brand-strong
            text-white 
            font-medium 
            py-2 px-3 
            rounded-base 
            shadow-brand 
            hover:shadow-lg 
            transform 
            hover:-translate-y-0.5 
            transition-all duration-200
            focus:ring-4 
            focus:ring-brand-soft
            disabled:opacity-50 
            disabled:cursor-not-allowed
            disabled:transform-none
            disabled:shadow-none
          "
        >
          {loading ? "Saving..." : "Save Report"}
        </button>
      </div>
    </form>
  );
};

export default ReportForm;