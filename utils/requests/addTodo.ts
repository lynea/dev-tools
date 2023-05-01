export async function addTodos(
  todos: { body: string; title: string; todoId: string | null | undefined }[]
) {
  //Todo: link should be dynamic
  const response = await fetch("/api/todo", {
    method: "PUT",
    body: JSON.stringify(todos),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
}
