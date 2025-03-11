import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import s from "./Dropdown.module.scss";

export const Dropdown = ({
  defaultText,
  canNavigate,
  creatingProduct,
  setProductCategory,
}) => {
  const { data, isLoading, error } = useFetch(
    "http://localhost:4242/categories"
  );
  const navigate = useNavigate();

  const handleCategorySelect = (e) => {
    navigate(`/category/${e}`);
  };

  const handleCreateProduct = (e) => {
    setProductCategory(e);
  };

  return (
    <select
      onChange={(e) =>
        canNavigate
          ? handleCategorySelect(e.target.value)
          : handleCreateProduct(e.target.value)
      }
      className={`${s.dropdownStyling} ${
        creatingProduct ? s.createStyling : s.dropdownStyling
      }`}
      required
    >
      {data?.data?.length === 0 ? (
        <option defaultValue>Ingen kategorier fundet</option>
      ) : (
        <option defaultValue>{defaultText}</option>
      )}
      {data?.data.map((item) => {
        return (
          <option
            key={item?.id}
            value={creatingProduct ? item?.id : item?.slug}
          >
            {item?.name}
          </option>
        );
      })}
    </select>
  );
};
