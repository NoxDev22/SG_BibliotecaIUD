export async function getBooks() {
  const res = await fetch("../../data/data.json");
  if (!res.ok) throw new Error("Error en la obtención de datos");
  const books = await res.json();
  return books;
}
