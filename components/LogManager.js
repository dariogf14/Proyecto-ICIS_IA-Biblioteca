"use client";

import { useEffect, useState } from "react";

const emptyLog = { action: "", entity: "", detail: "" };

export default function LogManager() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState(emptyLog);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  async function loadLogs() {
    // funcion para cargar historial
    const res = await fetch("/api/logs");
    setLogs(await res.json());
  }

  useEffect(() => { loadLogs(); }, []);

  async function submit(event) {
    // funcion para guardar log
    event.preventDefault();
    const url = editing ? `/api/logs/${editing}` : "/api/logs";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) return setMessage((data.errors || [data.error]).join(". "));
    setMessage("Historial guardado correctamente");
    setForm(emptyLog);
    setEditing(null);
    loadLogs();
  }

  function edit(log) {
    // funcion para editar log
    setEditing(log._id);
    setForm({ action: log.action, entity: log.entity, detail: log.detail });
  }

  async function remove(id) {
    // funcion para borrar log
    if (!confirm("Seguro que quieres borrar este registro?")) return;
    await fetch(`/api/logs/${id}`, { method: "DELETE" });
    loadLogs();
  }

  return (
    <>
      <section className="card"><h1>Historial MongoDB</h1><p className="small">CRUD completo de la coleccion documental de actividad.</p></section>
      <section className="card">
        <h2>{editing ? "Editar registro" : "Nuevo registro"}</h2>
        {message && <div className={message.includes("correctamente") ? "notice" : "error"}>{message}</div>}
        <form onSubmit={submit} className="grid">
          <label>Accion<input required value={form.action} onChange={e => setForm({ ...form, action: e.target.value })} /></label>
          <label>Entidad<input required value={form.entity} onChange={e => setForm({ ...form, entity: e.target.value })} /></label>
          <label>Detalle<textarea required value={form.detail} onChange={e => setForm({ ...form, detail: e.target.value })} /></label>
          <div className="actions"><button>{editing ? "Actualizar" : "Crear"}</button><button type="button" className="secondary" onClick={() => { setForm(emptyLog); setEditing(null); }}>Limpiar</button></div>
        </form>
      </section>
      <section className="card">
        <h2>Listado</h2>
        <table><thead><tr><th>Fecha</th><th>Accion</th><th>Entidad</th><th>Detalle</th><th>Acciones</th></tr></thead><tbody>{logs.map(log => <tr key={log._id}><td>{new Date(log.createdAt).toLocaleString()}</td><td>{log.action}</td><td>{log.entity}</td><td>{log.detail}</td><td className="actions"><button onClick={() => edit(log)}>Editar</button><button className="danger" onClick={() => remove(log._id)}>Borrar</button></td></tr>)}</tbody></table>
      </section>
    </>
  );
}
