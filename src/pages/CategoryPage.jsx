import { useParams } from "react-router-dom";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { CategoriesList } from "../components/CategoriesList/CategoriesList";
import { useFetch } from "../hooks/useFetch";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { Pageination } from "../components/Pageination/Pageination";

export const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { data, isLoading, error } = useFetch(
    `http://localhost:4242/products/category/${categorySlug}`
  );
  //Inspireret af https://www.youtube.com/watch?v=wAGIOCqS8tk
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9); //Hvor mange prokukter pr side
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const [products, setProducts] = useState([]);

  console.log(data);

  useEffect(() => {
    let currentProducts = data?.data?.slice(
      firstProductIndex,
      lastProductIndex
    );
    setProducts(currentProducts);
  }, [data, currentPage]);

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  if (error) {
    return <h2>Fejl i at hente data, prøv igen</h2>;
  }

  if (data?.data?.length === 0) {
    return <h2>Ingen annoncer i denne kategori</h2>;
  }

  return (
    <>
      <Wrapper>
        <CategoriesList />
      </Wrapper>
      <Wrapper type="categoryProduct" headerType="noTop">
        {products && products?.length > 0 ? (
          <ProductCard data={products} categoryProduct />
        ) : (
          <h2>Ingen annoncer i denne kategori</h2>
        )}
      </Wrapper>
      <Wrapper headerType="noTop">
        <Pageination
          totalProducts={data?.data?.length}
          productsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </Wrapper>
    </>
  );
};
