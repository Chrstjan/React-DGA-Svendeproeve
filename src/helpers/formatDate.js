//Inspiret af https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/

export const formatDate = (dateString) => {
  const options = {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Date(dateString)
    .toLocaleString("dk-DK", options)
    .replace(".", "/")
    .replace(",", " kl.");
};
