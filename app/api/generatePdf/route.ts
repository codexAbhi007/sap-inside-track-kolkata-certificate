import fs from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { Name, Organization } = await req.json();

  const templateBytes = fs.readFileSync(
    path.join(process.cwd(), "app/assets/template.pdf")
  );

  const font1Bytes = fs.readFileSync(
    path.join(process.cwd(), "fonts/ITCBenguiatCondensedMedium.otf")
  );

  const font2Bytes = fs.readFileSync(
    path.join(process.cwd(), "fonts/DMSerifDisplay.ttf")
  );

  const pdfDoc = await PDFDocument.load(templateBytes);

  pdfDoc.registerFontkit(fontkit);

  const customFont1 = await pdfDoc.embedFont(font1Bytes);
  const customFont2 = await pdfDoc.embedFont(font2Bytes);

  const page = pdfDoc.getPages()[0];

  // Draw participant name
  page.drawText(Name, {
    x: 155,               // moved right
    y: 520,               // moved up
    size: 70,             // larger font
    font: customFont1,
     color: rgb(23 / 255, 71 / 255, 119 / 255),
  });

  // Draw organization
  page.drawText(Organization, {
    x: 155,               // same left alignment
    y: 390,               // slightly lower than name
    size: 34,             // smaller font
    font: customFont2,
    color: rgb(23 / 255, 71 / 255, 119 / 255),
  });

  const bytes = await pdfDoc.save();
  const base64 = Buffer.from(bytes).toString("base64");

  return NextResponse.json({ base64 });
}
