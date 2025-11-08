import ProductEdit from "./ProductEdit";
import GetData from "./GetData";

export default function page({ params }: { params: { id: number } }) {
    return <ProductEdit productId={params.id} />;
}
