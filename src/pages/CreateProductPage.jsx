import { ProductForm } from "../components/ProductForm/ProductForm";
import { Wrapper } from "../components/Wrapper/Wrapper";

export const CreateProductPage = () => {
  return (
    <>
      <Wrapper
        text="Opret ny annonce"
        subText="Her kan du oprette en ny annonce. Du har mulighed for at slette dine annoncer igen under “min konto” siden"
      >
        <ProductForm />
      </Wrapper>
    </>
  );
};
