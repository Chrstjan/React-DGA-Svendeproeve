//Inspireret af https://www.youtube.com/watch?v=wAGIOCqS8tk

export const Pageination = ({
  totalProducts,
  productsPerPage,
  setCurrentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page, index) => {
        return (
          <button onClick={() => setCurrentPage(page)} key={index}>
            {page}
          </button>
        );
      })}
    </div>
  );
};
