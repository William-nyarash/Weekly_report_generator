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

    const TABLE_X = 40;

    const COL_DAY = 90;
    const COL_PRESENT = 90;
    const COL_ABSENT = 90;
    const COL_COMMENT = 250;

    const TABLE_WIDTH =
        COL_DAY + COL_PRESENT + COL_ABSENT + COL_COMMENT;

    const TABLE_RIGHT = TABLE_X + TABLE_WIDTH;

    const X_DAY = TABLE_X;
    const X_PRESENT = X_DAY + COL_DAY;
    const X_ABSENT = X_PRESENT + COL_PRESENT;
    const X_COMMENT = X_ABSENT + COL_ABSENT;

    const HEADER_HEIGHT = 24;
    const CELL_PADDING = 5;

    function drawHeader() {
        const y = doc.y;

        doc.font("Helvetica-Bold").fontSize(11);

        doc.rect(TABLE_X, y, TABLE_WIDTH, HEADER_HEIGHT).stroke();
        doc.moveTo(X_PRESENT, y)
            .lineTo(X_PRESENT, y + HEADER_HEIGHT)
            .stroke();

        doc.moveTo(X_ABSENT, y)
            .lineTo(X_ABSENT, y + HEADER_HEIGHT)
            .stroke();

        doc.moveTo(X_COMMENT, y)
            .lineTo(X_COMMENT, y + HEADER_HEIGHT)
            .stroke();

        doc.text("Day", X_DAY + CELL_PADDING, y + 6, {
            width: COL_DAY - CELL_PADDING * 2,
        });

        doc.text("Present", X_PRESENT + CELL_PADDING, y + 6, {
            width: COL_PRESENT - CELL_PADDING * 2,
            align: "center",
        });

        doc.text("Absent", X_ABSENT + CELL_PADDING, y + 6, {
            width: COL_ABSENT - CELL_PADDING * 2,
            align: "center",
        });

        doc.text("Comment", X_COMMENT + CELL_PADDING, y + 6, {
            width: COL_COMMENT - CELL_PADDING * 2,
        });

        doc.y = y + HEADER_HEIGHT;
    }

    drawHeader();

    doc.font("Helvetica").fontSize(10);

    (report.attendance || []).forEach((item) => {
        const day = safeText(item.day, "-");
        const present = safeNumber(item.present);
        const absent = safeNumber(item.absent);
        const total = present + absent;
        const comment = safeText(item.comment, "-");

        const rowHeight = Math.max(
            24,
            doc.heightOfString(comment, {
                width: COL_COMMENT - CELL_PADDING * 2,
            }) + CELL_PADDING * 2
        );

        if (doc.y + rowHeight > 720) {
            doc.addPage();
            drawHeader();
            doc.font("Helvetica").fontSize(10);
        }

        const y = doc.y;
        doc.moveTo(TABLE_X, y)
            .lineTo(TABLE_X, y + rowHeight)
            .stroke();

        doc.moveTo(X_PRESENT, y)
            .lineTo(X_PRESENT, y + rowHeight)
            .stroke();

        doc.moveTo(X_ABSENT, y)
            .lineTo(X_ABSENT, y + rowHeight)
            .stroke();

        doc.moveTo(X_COMMENT, y)
            .lineTo(X_COMMENT, y + rowHeight)
            .stroke();

        doc.moveTo(TABLE_RIGHT, y)
            .lineTo(TABLE_RIGHT, y + rowHeight)
            .stroke();

        doc.moveTo(TABLE_X, y + rowHeight)
            .lineTo(TABLE_RIGHT, y + rowHeight)
            .stroke();

        doc.text(day, X_DAY + CELL_PADDING, y + CELL_PADDING, {
            width: COL_DAY - CELL_PADDING * 2,
        });

        doc.text(`${present}/${total}`, X_PRESENT + CELL_PADDING, y + CELL_PADDING, {
            width: COL_PRESENT - CELL_PADDING * 2,
            align: "center",
        });

        doc.text(`${absent}/${total}`, X_ABSENT + CELL_PADDING, y + CELL_PADDING, {
            width: COL_ABSENT - CELL_PADDING * 2,
            align: "center",
        });

        doc.text(comment, X_COMMENT + CELL_PADDING, y + CELL_PADDING, {
            width: COL_COMMENT - CELL_PADDING * 2,
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
        
    doc .font("Helvetica")   
        .text(safeText(`${admissions}`,"None"), MARGIN);

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