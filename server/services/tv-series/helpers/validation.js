function checkDataInput(data) {
  const { title, overview, poster_path, popularity, tags } = data;
  let errorMessage = [];

  try {
    if (title === "" || title === null) {
      errorMessage.push("Title field cannot be empty!");
    } else if (typeof title !== "string") {
      errorMessage.push("Invalid title data type!");
    }

    if (overview === "" || overview === null) {
      errorMessage.push("Overview field cannot be empty!");
    } else if (typeof overview !== "string") {
      errorMessage.push("Invalid overview data type!");
    }

    if (poster_path === "" || poster_path === null) {
      errorMessage.push("Poster path field cannot be empty!");
    } else if (typeof poster_path !== "string") {
      errorMessage.push("Invalid poster path data type!");
    }

    if (popularity === "" || popularity === null) {
      errorMessage.push("Popularity field cannot be empty!");
    } else if (Number.isInteger(JSON.parse(popularity)) === false) {
      errorMessage.push("Invalid popularity data type!");
    }

    if (tags === "" || tags === null) {
      errorMessage.push("Tags field cannot be empty!");
    } else if (Array.isArray(JSON.parse(tags)) === false) {
      errorMessage.push("Invalid tags data type!");
    }

    if (errorMessage.length > 0) {
      return [true, errorMessage];
    } else {
      return [false, ""];
    }
  } catch (error) {
    return [true, "invalid data type!"];
  }
}

module.exports = { checkDataInput };
