export function searchName(name, nameList) {
    if (!name || !Array.isArray(nameList)) {
      throw new Error("Invalid input: name must be a string and nameList must be an array.");
    }
    return nameList.filter((item) => item.toLowerCase().includes(name.toLowerCase()));
  }