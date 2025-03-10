import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch"

export const Dropdown = ({defaultText, canNavigate}) => {
    const { data, isLoading, error } = useFetch("http://localhost:4242/categories");
    const navigate = useNavigate();

    const handleCategorySelect = (e) => {
        console.log(e);
    }

    const handleCreateProduct = () => {
      console.log("test");
    }
    
  return (
    <select onChange={(e) => canNavigate ? handleCategorySelect(e.target.value) : handleCreateProduct(e.target.value)}>
        {data?.data?.length === 0 ? <option defaultValue>Ingen kategorier fundet</option> : <option defaultValue>{defaultText}</option>}
        {data?.data.map((item) => {
            return <option key={item?.id} value={item?.slug}>{item?.name}</option>
        })}
    </select>
  )
}