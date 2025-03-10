import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch"

export const Dropdown = ({defaultText}) => {
    const { data, isLoading, error } = useFetch("http://localhost:4242/categories");
    const navigate = useNavigate();

    const handleCategorySelect = (e) => {
        console.log(e);
    }
    
  return (
    <select onChange={(e) => handleCategorySelect(e.target.value)}>
        <option defaultValue>{defaultText}</option>
        {data?.data.map((item) => {
            return <option key={item?.id} value={item?.slug}>{item?.name}</option>
        })}
    </select>
  )
}