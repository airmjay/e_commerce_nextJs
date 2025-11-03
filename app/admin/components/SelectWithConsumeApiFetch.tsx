import { SelectInput } from "./Input";
export default async function SelectWithConsumeApiFetch(
    { ...rest },
     id
) {
    const get_id = id;
    const res = await fetch(`http://localhost:3000/api/category`);
    const categories = await res.json();

    return (
        <SelectInput
            readOnly
            name="category"
            label="Product Category"
            placeholder="Enter Your Product Category"
            {...rest}
        >
            {categories.map(item =>
                item.id == get_id ? (
                    <option value={item.id} selected>
                        {item.name}
                    </option>
                ) : (
                    <option value={item.id}>{item.name}</option>
                )
            )}
        </SelectInput>
    );
}
