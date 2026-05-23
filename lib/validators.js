export function requireText(value, field, min = 2) {
  // valida texto obligatorio
  if (!value || value.trim().length < min) {
    return `${field} es obligatorio`;
  }
  return null;
}

export function requireNumber(value, field, min = 0) {
  // valida numero obligatorio
  const number = Number(value);
  if (Number.isNaN(number) || number < min) {
    return `${field} no es valido`;
  }
  return null;
}

export function requireDate(value, field) {
  // valida fecha obligatoria
  if (!value || Number.isNaN(Date.parse(value))) {
    return `${field} no es valida`;
  }
  return null;
}
