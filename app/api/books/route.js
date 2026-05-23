import { Op } from "sequelize";
import { NextResponse } from "next/server";
import { Book, Author, Category, syncDatabase } from "../../../lib/models/mysql-models";
import { requireText, requireNumber } from "../../../lib/validators";
import { saveLog } from "../../../lib/logs";

export async function GET(request) {
  // funcion para obtener libros
  await syncDatabase();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const available = searchParams.get("available") || "";
  const year = searchParams.get("year") || "";

  const where = {};
  if (search) where.title = { [Op.like]: `%${search}%` };
  if (categoryId) where.categoryId = categoryId;
  if (available) where.available = available === "true";
  if (year) where.year = { [Op.gte]: Number(year) };

  const books = await Book.findAll({ where, include: [Author, Category], order: [["title", "ASC"]] });
  return NextResponse.json(books);
}

export async function POST(request) {
  // funcion para crear libros
  await syncDatabase();
  const data = await request.json();
  const errors = [
    requireText(data.title, "Titulo"),
    requireText(data.isbn, "ISBN", 5),
    requireNumber(data.year, "Ano", 1000),
    requireNumber(data.authorId, "Autor", 1),
    requireNumber(data.categoryId, "Categoria", 1)
  ].filter(Boolean);

  if (errors.length) return NextResponse.json({ errors }, { status: 400 });

  const book = await Book.create({
    title: data.title,
    isbn: data.isbn,
    year: Number(data.year),
    available: Boolean(data.available),
    authorId: Number(data.authorId),
    categoryId: Number(data.categoryId)
  });
  await saveLog("crear", "libro", `Libro creado: ${book.title}`);
  return NextResponse.json(book, { status: 201 });
}
