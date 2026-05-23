import { NextResponse } from "next/server";
import { Category, syncDatabase } from "../../../lib/models/mysql-models";

export async function GET() {
  // funcion para obtener categorias
  await syncDatabase();
  const categories = await Category.findAll({ order: [["name", "ASC"]] });
  return NextResponse.json(categories);
}
