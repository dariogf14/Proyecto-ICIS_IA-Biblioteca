import { Op } from "sequelize";
import { NextResponse } from "next/server";
import { Member, syncDatabase } from "../../../lib/models/mysql-models";
import { requireText } from "../../../lib/validators";
import { saveLog } from "../../../lib/logs";

export async function GET(request) {
  // funcion para obtener socios
  await syncDatabase();
  const search = new URL(request.url).searchParams.get("search") || "";
  const where = search ? { name: { [Op.like]: `%${search}%` } } : {};
  const members = await Member.findAll({ where, order: [["name", "ASC"]] });
  return NextResponse.json(members);
}

export async function POST(request) {
  // funcion para crear socios
  await syncDatabase();
  const data = await request.json();
  const errors = [requireText(data.name, "Nombre"), requireText(data.email, "Email", 5), requireText(data.phone, "Telefono")].filter(Boolean);
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });

  const member = await Member.create(data);
  await saveLog("crear", "socio", `Socio creado: ${member.name}`);
  return NextResponse.json(member, { status: 201 });
}
