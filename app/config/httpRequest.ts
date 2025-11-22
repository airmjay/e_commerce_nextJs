const fetchData = async <T>(
  baseUrl: string,
  id: number,
  setIsLoading: CallableFunction
) => {
  try {
    const res = await fetch(`http://localhost:3000/api/${baseUrl}/${id}`, {
      cache: "no-store",
      method: "GET",
    });
    const products = await res.json();
    const fetchedItem: T = products[0];
    return fetchedItem;
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    setIsLoading(false);
  }
};
export default fetchData;
