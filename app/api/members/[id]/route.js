import { NextResponse } from "next/server";
import { Member, syncDatabase } from "../../../../lib/models/mysql-models";
import { requireText } from "../../../../lib/validators";
import { saveLog } from "../../../../lib/logs";

export async function GET(_request, { params }) {
  // funcion para obtener un socio
  await syncDatabase();
  const member = await Member.findByPk(params.id);
  if (!member) return NextResponse.json({ error: "Socio no encontrado" }, { status: 404 });
  return NextResponse.json(member);
}

export async function PUT(request, { params }) {
  // funcion para actualizar socios
  await syncDatabase();
  const data = await request.json();
  const errors = [requireText(data.name, "Nombre"), requireText(data.email, "Email", 5), requireText(data.phone, "Telefono")].filter(Boolean);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });

  const member = await Member.findByPk(params.id);
  if (!member) return NextResponse.json({ error: "Socio no encontrado" }, { status: 404 });
  await member.update(data);
  await saveLog("actualizar", "socio", `Socio actualizado: ${member.name}`);
  return NextResponse.json(member);
}

export async function DELETE(_request, { params }) {
  // funcion para borrar socios
  await syncDatabase();
  const member = await Member.findByPk(params.id);
  if (!member) return NextResponse.json({ error: "Socio no encontrado" }, { status: 404 });
  await member.destroy();
  await saveLog("borrar", "socio", `Socio borrado: ${member.name}`);
  return NextResponse.json({ message: "Socio borrado" });
}
