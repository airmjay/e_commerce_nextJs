import CategoryEdit from "./EditCategory";

export default function page({ params }: { params: { id: number } }) {
    return <CategoryEdit categoryId={params.id} />;
}
