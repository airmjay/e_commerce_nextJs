interface Props {
    id: string;
}

const GetData = async ({ id }: Props) => {
    const get_id = id;
   return 'nothing'
    const res = await fetch(`http://localhost:3000/api/product/${get_id}`);
    const products = await res.json();
    return products;
};

export default GetData;
