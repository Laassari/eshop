const selectElement = document.querySelector("select#category");

selectElement.addEventListener("change", updateCategoryQueryParam);

function updateCategoryQueryParam(event) {
  const category = event.target.value;

  if (!category) return;

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("category", category);
  window.location.search = searchParams.toString();
}
