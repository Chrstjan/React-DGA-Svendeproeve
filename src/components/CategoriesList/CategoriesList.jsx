import { NavLink } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import s from "./CategoriesList.module.scss";

export const CategoriesList = () => {
  const { data, isLoading, error } = useFetch(
    "http://localhost:4242/categories"
  );

  return (
    <div className={s.categoriesContainer}>
      <header>
        <h3>Alle kategorier</h3>
      </header>
      <ul>
        {data?.data && data?.data?.length > 0 ? (
          data?.data?.map((item) => {
            return (
              <li key={item?.id}>
                <NavLink
                  className={({ isActive }) => (isActive ? s.activeLink : "")}
                  to={`/category/${item?.slug}`}
                >
                  {item?.name}
                </NavLink>
              </li>
            );
          })
        ) : (
          <p>Ingen kategorier fundet</p>
        )}
      </ul>
    </div>
  );
};
