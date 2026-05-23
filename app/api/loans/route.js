import { NextResponse } from "next/server";
import { Loan, Book, Member, syncDatabase } from "../../../lib/models/mysql-models";
import { requireNumber, requireDate } from "../../../lib/validators";
import { saveLog } from "../../../lib/logs";

export async function GET() {
  // funcion para obtener prestamos
  await syncDatabase();
  const loans = await Loan.findAll({ include: [Book, Member], order: [["loanDate", "DESC"]] });
  return NextResponse.json(loans);
}

export async function POST(request) {
  // funcion para crear prestamos
  await syncDatabase();
  const data = await request.json();
  const errors = [
    requireNumber(data.bookId, "Libro", 1),
    requireNumber(data.memberId, "Socio", 1),
    requireDate(data.loanDate, "Fecha")
  ].filter(Boolean);

  if (errors.length) return NextResponse.json({ errors }, { status: 400 });

  const book = await Book.findByPk(data.bookId);
  if (!book || !book.available) return NextResponse.json({ errors: ["El libro no esta disponible"] }, { status: 400 });

  const loan = await Loan.create({ bookId: data.bookId, memberId: data.memberId, loanDate: data.loanDate, status: "activo" });
  await book.update({ available: false });
  await saveLog("crear", "prestamo", `Prestamo creado para el libro ${book.title}`);
  return NextResponse.json(loan, { status: 201 });
}
