export function searchIngredient(name, nameList) {
  // if (!name || !Array.isArray(nameList)) {
  //   throw new Error(
  //     "Invalid input: name must be a string and nameList must be an array."
  //   );
  // }
  if (name === "") {
    return nameList;
  }

  const searchData = nameList.filter((item) =>
    item.ingredient_name.toLowerCase().includes(name.toLowerCase())
  );

  return searchData;
}
