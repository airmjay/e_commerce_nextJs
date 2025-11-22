import Link from "next/link";
interface CategoryProps {
    id: number;
    name: string;
}
const page = async () => {
    const res = await fetch("http://localhost:3000/api/category");
    const Categories: CategoryProps[] = await res.json();
    return (
        <>
            <div className="flex justify-between align-center my-2">
                <h2 className="text-gray-700 text-lg">Categories</h2>
                <Link
                    className="p-1 bg-blue-600 shabow text-white rounded"
                    href="category/add"
                >
                    Add Category
                </Link>
            </div>
            <ul>
                {Categories.map(Category => (
                    <Link
                        href={`category/edit/${Category.id}`}
                        className="shadow pt-2 block border border-1 border-gray-200 bg-white"
                        key={Category.id}
                    >
                        <li>
                            <div className="px-2">
                                <ul>
                                    <li>{Category.name}</li>
                                </ul>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </>
    );
};

export default page;
