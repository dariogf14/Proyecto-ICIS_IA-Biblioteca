import { NextResponse } from "next/server";
import { connectMongo } from "../../../../lib/mongo";
import Log from "../../../../lib/models/Log";
import { requireText } from "../../../../lib/validators";

export async function GET(_request, { params }) {
  // funcion para obtener un log
  await connectMongo();
  const log = await Log.findById(params.id);
  if (!log) return NextResponse.json({ error: "Log no encontrado" }, { status: 404 });
  return NextResponse.json(log);
}

export async function PUT(request, { params }) {
  // funcion para actualizar logs
  await connectMongo();
  const data = await request.json();
  const errors = [requireText(data.action, "Accion"), requireText(data.entity, "Entidad"), requireText(data.detail, "Detalle")].filter(Boolean);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });
  const log = await Log.findByIdAndUpdate(params.id, data, { new: true });
  if (!log) return NextResponse.json({ error: "Log no encontrado" }, { status: 404 });
  return NextResponse.json(log);
}

export async function DELETE(_request, { params }) {
  // funcion para borrar logs
  await connectMongo();
  const log = await Log.findByIdAndDelete(params.id);
  if (!log) return NextResponse.json({ error: "Log no encontrado" }, { status: 404 });
  return NextResponse.json({ message: "Log borrado" });
}
