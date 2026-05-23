import { NextResponse } from "next/server";
import { Book, Member, Loan, syncDatabase } from "../../../lib/models/mysql-models";
import { connectMongo } from "../../../lib/mongo";
import Log from "../../../lib/models/Log";

export async function GET() {
  // funcion para obtener resumen
  await syncDatabase();
  await connectMongo();
  const [books, available, members, activeLoans, logs] = await Promise.all([
    Book.count(),
    Book.count({ where: { available: true } }),
    Member.count(),
    Loan.count({ where: { status: "activo" } }),
    Log.countDocuments()
  ]);
  return NextResponse.json({ books, available, members, activeLoans, logs });
}
