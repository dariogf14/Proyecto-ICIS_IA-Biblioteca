import { NextResponse } from "next/server";
import { Loan, Book, syncDatabase } from "../../../../lib/models/mysql-models";
import { saveLog } from "../../../../lib/logs";

export async function PUT(request, { params }) {
  // funcion para devolver libros
  await syncDatabase();
  const data = await request.json();
  const loan = await Loan.findByPk(params.id);
  if (!loan) return NextResponse.json({ error: "Prestamo no encontrado" }, { status: 404 });

  await loan.update({ returnDate: data.returnDate, status: "devuelto" });
  const book = await Book.findByPk(loan.bookId);
  if (book) await book.update({ available: true });
  await saveLog("actualizar", "prestamo", `Prestamo devuelto: ${loan.id}`);
  return NextResponse.json(loan);
}

export async function DELETE(_request, { params }) {
  // funcion para borrar prestamos
  await syncDatabase();
  const loan = await Loan.findByPk(params.id);
  if (!loan) return NextResponse.json({ error: "Prestamo no encontrado" }, { status: 404 });
  await loan.destroy();
  await saveLog("borrar", "prestamo", `Prestamo borrado: ${params.id}`);
  return NextResponse.json({ message: "Prestamo borrado" });
}
