import ReportForm from "./ReportForm";

const ReportModal = ({
  open,
  report,
  onChange,
  onSubmit,
  onClose,
  loading,
}) => {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      p-4
      "
    >
      <div
        className="
        bg-white
        rounded-xl
        p-6
        w-full
        max-w-xl
        max-h-[90vh]
        overflow-y-auto
        "
      >
        <h2
          className="
          text-2xl
          font-bold
          mb-5
          "
        >
          Create Weekly Report
        </h2>
        <ReportForm
          report={report}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </div>
    </div>

  );
};


export default ReportModal;