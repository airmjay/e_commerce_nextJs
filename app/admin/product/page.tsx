import Image from "next/image";
import Link from "next/link";
interface ProductProps {
    id: number;
    name: string;
    image: string;
    description: string;
    specification: string;
    price: string;
    unit: string;
}
const page = async () => {
    const res: ProductProps = await fetch("http://localhost:3000/api/product");
    const products: ProductProps = await res.json();
    return (
        <>
            <ul className="grid grid-cols-12 gap-1">
                {products.map(product => (
                    <Link
                        href={`product/${product.id}`}
                        className="col-span-6 shadow border border-1 border-gray-200 md:col-span-4 bg-white"
                        key={product.id}
                    >
                        <li>
                            <div className="w-full heigth-[200px]">
                                {product.image === null ? (
                                    ""
                                ) : (
                                    <Image
                                        src={`/uploads/${product?.image}`}
                                        alt="product image"
                                        width={800}
                                        height={600}
                                        className="w-full h-64 object-cover rounded mt-2"
                                        priority
                                    />
                                )}
                            </div>
                            <div className="px-2">
                                <ul>
                                    <li>{product.name}</li>
                                    <li>
                                        <i className="fab fa-dollar-sign"></i>
                                        {product.price}
                                    </li>
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
