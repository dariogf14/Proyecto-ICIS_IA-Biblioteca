"use client";

export default function Error({ error, reset }) {
  return (
    <div className="card">
      <h1>Ha ocurrido un error</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Reintentar</button>
    </div>
  );
}
