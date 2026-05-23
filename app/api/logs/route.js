import { NextResponse } from "next/server";
import { connectMongo } from "../../../lib/mongo";
import Log from "../../../lib/models/Log";
import { requireText } from "../../../lib/validators";

export async function GET() {
  // funcion para obtener logs
  await connectMongo();
  const logs = await Log.find().sort({ createdAt: -1 }).limit(100);
  return NextResponse.json(logs);
}

export async function POST(request) {
  // funcion para crear logs
  await connectMongo();
  const data = await request.json();
  const errors = [requireText(data.action, "Accion"), requireText(data.entity, "Entidad"), requireText(data.detail, "Detalle")].filter(Boolean);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });
  const log = await Log.create(data);
  return NextResponse.json(log, { status: 201 });
}
