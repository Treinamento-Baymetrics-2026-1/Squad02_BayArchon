import { ReportSchema } from "../../Documents/DocumentsSchema.ts";
import { z } from "zod";
import { PDFDocument, StandardFonts } from "@pdf-lib";

export async function generatePdf(
  report: z.infer<typeof ReportSchema>
) {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(
    StandardFonts.Helvetica
  );

  const boldFont = await pdfDoc.embedFont(
    StandardFonts.HelveticaBold
  );

  let y = height - 40;

  // ====================================
  // TÍTULO
  // ====================================

  const titleSize = 20;

  const titleWidth =
    boldFont.widthOfTextAtSize(
      report.titulo,
      titleSize
    );

  page.drawText(report.titulo, {
    x: (width - titleWidth) / 2,
    y,
    size: titleSize,
    font: boldFont
  });

  y -= 35;

  page.drawLine({
    start: { x: 50, y },
    end: { x: width - 50, y },
    thickness: 1
  });

  y -= 50;

  // ====================================
  // RESUMO
  // ====================================

  page.drawText("Resumo Executivo", {
    x: 50,
    y,
    size: 16,
    font: boldFont
  });

  y -= 25;

  y = drawWrappedText(
    page,
    report.resumo,
    50,
    y,
    width - 100,
    font,
    12
  );

  y -= 25;

  // ====================================
  // PRINCIPAIS PONTOS
  // ====================================

  page.drawText("Principais Pontos", {
    x: 50,
    y,
    size: 16,
    font: boldFont
  });

  y -= 25;

  y = drawBulletList(
    page,
    report.principais_pontos,
    60,
    y,
    width - 120,
    font,
    12
  );

  y -= 20;

  // ====================================
  // RISCOS
  // ====================================

  page.drawText("Riscos Identificados", {
    x: 50,
    y,
    size: 16,
    font: boldFont
  });

  y -= 25;

  y = drawBulletList(
    page,
    report.riscos,
    60,
    y,
    width - 120,
    font,
    12
  );

  y -= 20;

  // ====================================
  // OPORTUNIDADES
  // ====================================

  page.drawText("Oportunidades de Melhoria", {
    x: 50,
    y,
    size: 16,
    font: boldFont
  });

  y -= 25;

  y = drawBulletList(
    page,
    report.oportunidades,
    60,
    y,
    width - 120,
    font,
    12
  );

  y -= 20;

  // ====================================
  // CONCLUSÃO
  // ====================================

  page.drawText("Conclusão", {
    x: 50,
    y,
    size: 16,
    font: boldFont
  });

  y -= 25;

  y = drawWrappedText(
    page,
    report.conclusao,
    50,
    y,
    width - 100,
    font,
    12
  );

  // ====================================
  // RODAPÉ
  // ====================================

  page.drawLine({
    start: { x: 50, y: 50 },
    end: { x: width - 50, y: 50 },
    thickness: 1
  });

  page.drawText(
    "Relatório gerado automaticamente pelo sistema BayArchon",
    {
      x: 50,
      y: 30,
      size: 10,
      font
    }
  );

  return await pdfDoc.save();
}

// ======================================================
// TEXTO COM QUEBRA AUTOMÁTICA
// ======================================================

function drawWrappedText(
  page: any,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  font: any,
  fontSize: number
) {
  const lines = wrapText(
    text,
    font,
    fontSize,
    maxWidth
  );

  for (const line of lines) {
    page.drawText(line, {
      x,
      y,
      size: fontSize,
      font
    });

    y -= fontSize + 4;
  }

  return y;
}

// ======================================================
// LISTAS
// ======================================================

function drawBulletList(
  page: any,
  items: string[],
  x: number,
  y: number,
  maxWidth: number,
  font: any,
  fontSize: number
) {
  for (const item of items) {

    const lines = wrapText(
      item,
      font,
      fontSize,
      maxWidth
    );

    let firstLine = true;

    for (const line of lines) {

      page.drawText(
        firstLine
          ? `• ${line}`
          : `   ${line}`,
        {
          x,
          y,
          size: fontSize,
          font
        }
      );

      y -= fontSize + 4;

      firstLine = false;
    }

    y -= 4;
  }

  return y;
}

// ======================================================
// QUEBRA DE LINHA
// ======================================================

function wrapText(
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number
) {
  const words = text.split(" ");

  const lines: string[] = [];

  let currentLine = "";

  for (const word of words) {

    const testLine =
      currentLine === ""
        ? word
        : `${currentLine} ${word}`;

    const textWidth =
      font.widthOfTextAtSize(
        testLine,
        fontSize
      );

    if (textWidth > maxWidth) {

      if (currentLine) {
        lines.push(currentLine);
      }

      currentLine = word;

    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}


function formatSectionTitle(
  text: string
) {
  return text
    .replaceAll("_", " ")
    .replace(/\b\w/g, c =>
      c.toUpperCase()
    );
}


export async function generateFlexPdf(
  report: Record<string, unknown>
) {

  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();

  const font =
    await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

  const boldFont =
    await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

  let y = height - 40;

  // ===========================
  // TÍTULO
  // ===========================

  const titulo =
    String(report.titulo ?? "Relatório");

  const titleSize = 20;

  const titleWidth =
    boldFont.widthOfTextAtSize(
      titulo,
      titleSize
    );

  page.drawText(titulo, {
    x: (width - titleWidth) / 2,
    y,
    size: titleSize,
    font: boldFont
  });

  y -= 35;

  page.drawLine({
    start: { x: 50, y },
    end: { x: width - 50, y },
    thickness: 1
  });

  y -= 40;

  // ===========================
  // RESUMO
  // ===========================

  if (report.resumo) {

    page.drawText(
      "Resumo Executivo",
      {
        x: 50,
        y,
        size: 16,
        font: boldFont
      }
    );

    y -= 25;

    y = drawWrappedText(
      page,
      String(report.resumo),
      50,
      y,
      width - 100,
      font,
      12
    );

    y -= 20;
  }

  // ===========================
  // SEÇÕES DINÂMICAS
  // ===========================

  const ignoredFields = [
    "titulo",
    "resumo",
    "conclusao"
  ];

  for (const [key, value] of Object.entries(report)) {

    if (
      ignoredFields.includes(key)
    ) {
      continue;
    }

    page.drawText(
      formatSectionTitle(key),
      {
        x: 50,
        y,
        size: 16,
        font: boldFont
      }
    );

    y -= 25;

    // array
    if (Array.isArray(value)) {

      y = drawBulletList(
        page,
        value.map(String),
        60,
        y,
        width - 120,
        font,
        12
      );

    }

    // string
    else if (
      typeof value === "string"
    ) {

      y = drawWrappedText(
        page,
        value,
        50,
        y,
        width - 100,
        font,
        12
      );

    }

    // object
    else if (
      value &&
      typeof value === "object"
    ) {

      for (const [
        subKey,
        subValue
      ] of Object.entries(value)) {

        page.drawText(
          subKey,
          {
            x: 60,
            y,
            size: 13,
            font: boldFont
          }
        );

        y -= 20;

        y = drawWrappedText(
          page,
          String(subValue),
          70,
          y,
          width - 140,
          font,
          12
        );

        y -= 10;
      }
    }

    y -= 20;
  }

  // ===========================
  // CONCLUSÃO
  // ===========================

  if (report.conclusao) {

    page.drawText(
      "Conclusão",
      {
        x: 50,
        y,
        size: 16,
        font: boldFont
      }
    );

    y -= 25;

    y = drawWrappedText(
      page,
      String(report.conclusao),
      50,
      y,
      width - 100,
      font,
      12
    );
  }

  // ===========================
  // RODAPÉ
  // ===========================

  page.drawLine({
    start: { x: 50, y: 50 },
    end: { x: width - 50, y: 50 },
    thickness: 1
  });

  page.drawText(
    "Relatório gerado automaticamente pelo sistema BayArchon",
    {
      x: 50,
      y: 30,
      size: 10,
      font
    }
  );

  return await pdfDoc.save();
}