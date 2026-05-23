import { NextResponse } from "next/server";
import { Author, syncDatabase } from "../../../lib/models/mysql-models";

export async function GET() {
  // funcion para obtener autores
  await syncDatabase();
  const authors = await Author.findAll({ order: [["name", "ASC"]] });
  return NextResponse.json(authors);
}
