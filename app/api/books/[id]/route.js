import { NextResponse } from "next/server";
import { Book, Author, Category, syncDatabase } from "../../../../lib/models/mysql-models";
import { requireText, requireNumber } from "../../../../lib/validators";
import { saveLog } from "../../../../lib/logs";

export async function GET(_request, { params }) {
  // funcion para obtener un libro
  await syncDatabase();
  const book = await Book.findByPk(params.id, { include: [Author, Category] });
  if (!book) return NextResponse.json({ error: "Libro no encontrado" }, { status: 404 });
  return NextResponse.json(book);
}

export async function PUT(request, { params }) {
  // funcion para actualizar libros
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

  const book = await Book.findByPk(params.id);
  if (!book) return NextResponse.json({ error: "Libro no encontrado" }, { status: 404 });

  await book.update({
    title: data.title,
    isbn: data.isbn,
    year: Number(data.year),
    available: Boolean(data.available),
    authorId: Number(data.authorId),
    categoryId: Number(data.categoryId)
  });
  await saveLog("actualizar", "libro", `Libro actualizado: ${book.title}`);
  return NextResponse.json(book);
}

export async function DELETE(_request, { params }) {
  // funcion para borrar libros
  await syncDatabase();
  const book = await Book.findByPk(params.id);
  if (!book) return NextResponse.json({ error: "Libro no encontrado" }, { status: 404 });
  await book.destroy();
  await saveLog("borrar", "libro", `Libro borrado: ${book.title}`);
  return NextResponse.json({ message: "Libro borrado" });
}
