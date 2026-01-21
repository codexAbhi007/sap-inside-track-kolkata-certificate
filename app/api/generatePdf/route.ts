import fs from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { Name, Organization } = await req.json();

  /* -----------------------------
     Load template & fonts
  ------------------------------ */
  const templateBytes = fs.readFileSync(
    path.join(process.cwd(), "app/assets/template.pdf")
  );

  const nameFontBytes = fs.readFileSync(
    path.join(process.cwd(), "fonts/ITCBenguiatCondensedMedium.otf")
  );

  // const orgFontBytes = fs.readFileSync(
  //   path.join(process.cwd(), "fonts/DMSerifDisplay.ttf")
  // );

   const orgFontBytes = fs.readFileSync(
    path.join(process.cwd(), "fonts/Bitter-Regular.ttf")
  );

  const pdfDoc = await PDFDocument.load(templateBytes);
  pdfDoc.registerFontkit(fontkit);

  const nameFont = await pdfDoc.embedFont(nameFontBytes);
  const orgFont = await pdfDoc.embedFont(orgFontBytes);

  const page = pdfDoc.getPages()[0];
  const { width } = page.getSize();

  /* -----------------------------
     PARTICIPANT NAME (CENTER)
  ------------------------------ */
  const nameFontSize = 70;
  const nameTextWidth = nameFont.widthOfTextAtSize(
    Name,
    nameFontSize
  );
  const nameX = (width - nameTextWidth) / 2;

  page.drawText(Name, {
    x: nameX,
    y: 465,
    size: nameFontSize,
    font: nameFont,
    color: rgb(23 / 255, 71 / 255, 119 / 255),
  });

  /* -----------------------------
     ORGANISATION (CENTER)
  ------------------------------ */
  const orgFontSize = 34;
  const orgTextWidth = orgFont.widthOfTextAtSize(
    Organization,
    orgFontSize
  );
  const orgX = (width - orgTextWidth) / 2;

  page.drawText(Organization, {
    x: orgX,
    y: 353,
    size: orgFontSize,
    font: orgFont,
    color: rgb(23 / 255, 71 / 255, 119 / 255),
  });

  /* -----------------------------
     EXPORT PDF
  ------------------------------ */
  const pdfBytes = await pdfDoc.save();
  const base64 = Buffer.from(pdfBytes).toString("base64");

  return NextResponse.json({ base64 });
}
