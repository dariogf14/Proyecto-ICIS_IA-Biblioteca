import { connectMongo } from "./mongo";
import Log from "./models/Log";

export async function saveLog(action, entity, detail) {
  // guarda historial de acciones
  try {
    await connectMongo();
    await Log.create({ action, entity, detail });
  } catch (error) {
    console.error("No se pudo guardar el log", error.message);
  }
}
