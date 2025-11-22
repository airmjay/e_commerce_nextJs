import ProductEdit from "./ProductEdit";

export default function page({ params }: { params: { id: number } }) {
  return <ProductEdit productId={params.id} />;
}
