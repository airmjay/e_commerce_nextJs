import { Input, SelectInput } from "../../components/Input";
import TextArea from "../../components/TextArea";
import Image from "next/image";
import Link from "next/link";
import SelectWithConsumeApiFetch from "../../components/SelectWithConsumeApiFetch";

const page = async ({ params }: { params: { id: number } }) => {
    const get_id = params.id;
    const res = await fetch(`http://localhost:3000/api/product/${get_id}`);
    const products = await res.json();
    const product = products[0];
    return (
        <div className="grid grid-cols-12 gap-2">
            {product.image === null ? (
                <div className="col-span-12 mb-2">
                    No Image{" "}
                    <Link
                        className="bg-blue-500 text-white hover:text-blue-400 hover:bg-blue-300 p-2"
                        href={`upload/${product.id}`}
                    >
                        Upload An Image
                    </Link>
                </div>
            ) : (
                <div className="col-span-12 mb-2 h-[200px]">
                    <Image
                        src={`/uploads/${product.image}`}
                        alt={product.name}
                        height={600}
                        width={800}
                        className="w-[50%] h-[80%]"
                    />
                    <Link
                        className="bg-blue-500 text-white hover:text-blue-400 hover:bg-blue-300 p-2"
                        href={`upload/${product.id}`}
                    >
                        Change Image
                    </Link>
                </div>
            )}
            <Input
                label="Product Name"
                placeholder="Enter Your Product Name"
                type="text"
                name="name"
                readOnly
                value={product.name}
            />
            <Input
                readOnly
                label="Product Specification"
                placeholder="Enter Your Product Specification"
                type="text"
                name="specification"
                value={product.specification}
            />
            <Input
                readOnly
                label="Product Units"
                placeholder="Enter number of available product"
                type="number"
                name="unit"
                value={product.unit}
            />
            <SelectWithConsumeApiFetch readOnly id={product.category_id}/>

            <Input
                value={product.price}
                label="Product Price"
                placeholder="Enter Product price"
                type="number"
                readOnly
                name="price"
            />
            <TextArea
                readOnly
                value={product.description}
                col_span="col-span-12"
                label="Product description"
                placeholder="Enter Your Product Description"
                name="description"
            />
        </div>
    );
};

export default page;
