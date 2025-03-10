import { useFetch } from "../hooks/useFetch"
import { Wrapper } from "../components/Wrapper/Wrapper"
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { DonationCard } from "../components/DonationCard/DonationCard";

export const LandingPage = () => {
  const {data, isLoading, error} = useFetch("http://localhost:4242/products");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const selectedProducts = [];
      selectedProducts.push(
        data?.data[Math.floor(Math.random() * data?.data?.length)],
        data?.data[Math.floor(Math.random() * data?.data?.length)],
        data?.data[Math.floor(Math.random() * data?.data?.length)],
        data?.data[Math.floor(Math.random() * data?.data?.length)],
        data?.data[Math.floor(Math.random() * data?.data?.length)],
        data?.data[Math.floor(Math.random() * data?.data?.length)],
      )
      setProducts(selectedProducts);
    }
  }, [data])

  useEffect(() => {
    const getCategoryData = async () => {
      const res = await fetch("http://localhost:4242/categories");

      if (!res.ok) {
        console.error("Error getting category data");
      }

      const data = await res.json();
      const popularCategories = [];
      popularCategories.push(
        data?.data[Math.floor(Math.random() * data?.data?.length)],
        data?.data[Math.floor(Math.random() * data?.data?.length)],
        data?.data[Math.floor(Math.random() * data?.data?.length)],
        data?.data[Math.floor(Math.random() * data?.data?.length)],
        data?.data[Math.floor(Math.random() * data?.data?.length)],
        data?.data[Math.floor(Math.random() * data?.data?.length)],
      );
      console.log(popularCategories);
      setCategories(popularCategories);
    }
    getCategoryData();
  }, [])

  if (isLoading) {
    return <h2>loading...</h2>
  }

  if (error) {
    return <h2>Error getting data, try again</h2>
  }

  return (
    <>
      <Wrapper text="Udvalgte Produkter">
        {products && products.length > 0 ? <ProductCard data={products}/> : null}
      </Wrapper>
      <Wrapper type="infoImage">
        <figure>
          <img src="./banner_image_4.png"/>
          <figcaption>
            <h3>Den Grønne Avis</h3>
            <p>Vi går forest i kampen om klimaet ved at give 2 kr. til klima-venlige formål, hver gang du handler brugt på Den Grønne Avis</p>
          </figcaption>
        </figure>
      </Wrapper>
      <Wrapper text="Populære Kategorier">
        {categories && categories.length > 0 ? <ProductCard data={categories} topHeader/> : null}
      </Wrapper>
      <Wrapper type="infoImage">
        <DonationCard type="toDate" headerText="Donationer til Dato" subText="Sammen med dig har vi siden starten indsamlet:" money="452.231,50 kr" footertext="Tak fordi du handler brugt, med omtanke for klimaet"/>
        <DonationCard type="thisYear" headerText="Donationer i år" subText="Sammen med dig har vi i år indsamlet:" money="112.452,75 kr" footertext="Tak fordi du handler brugt, med omtanke for jorden"/>
      </Wrapper>
    </>
  )
}