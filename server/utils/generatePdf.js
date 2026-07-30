const PDFDocument = require("pdfkit");

const formatDate = (date) => {
    if (!date) return "N/A";

    const d = new Date(date);

    if (isNaN(d.getTime())) return "N/A";

    return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const safeNumber = (value) => {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
};

const safeText = (value, fallback = "N/A") => {
    if (value === null || value === undefined || value === "") {
        return fallback;
    }

    return String(value);
};

const generateWeeklyReport = (report, res) => {
    if (!report) {
        throw new Error("Report data is undefined.");
    }

    const MARGIN = 50;

    const doc = new PDFDocument({
        size: "A4",
        margin: MARGIN,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=Weekly_Report_${report.id || "Report"}.pdf`
    );

    doc.pipe(res);

    doc
        .font("Helvetica-Bold")
        .fontSize(20)
        .text("GORGEOUS TECHNICAL INSTITUTE", {
            align: "center",
        });

    doc.moveDown(0.3);

    doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .text("WEEKLY REPORT", {
            align: "center",
        });

    doc.moveDown(2);

    doc.font("Helvetica").fontSize(12);

    const startY = doc.y;

    const LEFT_X = MARGIN;
    const RIGHT_X = 320;

    const COLUMN_WIDTH = 230;
    const ROW_HEIGHT = 24;

    doc.text(
    `Teacher: ${report.teacher?.name ?? "N/A"}\nLevel: ${report.teacher?.level ?? "N/A"}`,
    LEFT_X,
    startY,
    {
        width: COLUMN_WIDTH,
        lineGap: 10,
    }
    );

    const dateText = `${formatDate(report.weekStart)} - ${formatDate(report.weekEnd)}`;

    doc.text(
    `Department: ${report.teacher?.department ?? report.teacher?.course ?? "N/A"}\nDate: ${dateText}`,
    RIGHT_X,
    startY,
    {
        width: COLUMN_WIDTH,
        lineGap: 10,
    }
    );

    doc.y = startY + ROW_HEIGHT * 2 + 20;


    doc.moveDown();

    const COL_DAY = 80;
    const COL_PRESENT = 80;
    const COL_ABSENT = 80;
    const COL_COMMENT = 250;

    const X_DAY = MARGIN;
    const X_PRESENT = X_DAY + COL_DAY;
    const X_ABSENT = X_PRESENT + COL_PRESENT;
    const X_COMMENT = X_ABSENT + COL_ABSENT;

    doc.font("Helvetica-Bold").fontSize(11);

    const headerY = doc.y;
    const  headerHeight = 22;
    doc.rect(X_DAY, headerY, COL_DAY, headerHeight).stroke()
    doc.rect(X_PRESENT, headerY, COL_DAY, headerHeight).stroke()
    doc.rect(X_ABSENT, headerY, COL_DAY, headerHeight).stroke()
    doc.rect(X_COMMENT, headerY, COL_DAY, headerHeight).stroke()


    doc.text("Day", X_DAY + 3 , headerY + 6, {
        width: COL_DAY,
    });

    doc.text("Present", X_PRESENT + 3, headerY + 6, {
        width: COL_PRESENT,
    });

    doc.text("Absent", X_ABSENT + 3, headerY + 6, {
        width: COL_ABSENT,
    });

    doc.text("Comment", X_COMMENT + 3, headerY + 6, {
        width: COL_COMMENT,
    });

    doc.y = headerY + 25;

    doc.font("Helvetica").fontSize(10);

    (report.attendance || []).forEach((item) => {
        const day = safeText(item.day, "-");
        const present = safeNumber(item.present);
        const absent = safeNumber(item.absent);
        const total = present + absent;
        const comment = safeText(item.comment, "-");
        if (doc.y > 720) {
            doc.addPage();
        }

        const y = doc.y;

        const rowHeight = Math.max(
            22,
            doc.heightOfString(comment, {
                width: COL_COMMENT,
            }) + 5
        );

        doc.text(day, X_DAY, y, {
            width: COL_DAY,
        });

        doc.text(`${present}/${total}`, X_PRESENT, y, {
            width: COL_PRESENT,
        });

        doc.text(`${absent}/${total}`, X_ABSENT, y, {
            width: COL_ABSENT,
        });

        doc.text(comment, X_COMMENT, y, {
            width: COL_COMMENT,
        });

        doc.y = y + rowHeight;
    });

    doc.moveDown(2);
    const admissions =
        report.newAdmissionsAndDropouts === null ||
        report.newAdmissionsAndDropouts === undefined ||
        Number(report.newAdmissionsAndDropouts) < 0
            ? "N/A"
            : report.newAdmissionsAndDropouts;

    doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(`Admissions / Dropouts`, MARGIN)
        .text(`${admissions}`, MARGIN);

    doc.moveDown();

    doc.font("Helvetica-Bold").text("Activities Completed this week", MARGIN);
    doc.font("Helvetica").text(
        safeText(report.weeksActivityCompletion, "None"), MARGIN);

    doc.moveDown();

    doc.font("Helvetica-Bold").text("Activities yet to be Completed", MARGIN);
    doc.font("Helvetica").text(
        safeText(report.weeksActivityNotCompleted, "None")
    );

    doc.moveDown();
    doc.font("Helvetica-Bold").text("Issues for immediate attention", MARGIN);
    doc.font("Helvetica").text(
        safeText(report.aobs, "None")
    );

    doc.moveDown();

    doc.font("Helvetica-Bold").text("Exams/Cats", MARGIN);
    doc.font("Helvetica").text(
        safeText(report.assessment, "None")
    );

    doc.moveDown();

    doc.font("Helvetica-Bold").text("Remarks", MARGIN);
    doc.font("Helvetica").text(
        safeText(report.remarks, "None")
    );

    doc.end();
};

module.exports = generateWeeklyReport;