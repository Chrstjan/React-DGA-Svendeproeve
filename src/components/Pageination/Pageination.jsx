//Inspireret af https://www.youtube.com/watch?v=wAGIOCqS8tk
import s from "./Pageination.module.scss";

export const Pageination = ({
  totalProducts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={s.containerStyling}>
      <button onClick={() => goToPrevPage()} disabled={currentPage === 1}>
        Forrige side
      </button>
      <p>
        side {currentPage} / {totalPages}
      </p>
      <button
        onClick={() => goToNextPage()}
        disabled={currentPage === totalPages}
      >
        Næste side
      </button>
    </div>
  );
};
