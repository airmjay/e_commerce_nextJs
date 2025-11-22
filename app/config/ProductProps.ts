interface ProductType {
  name: string;
  description: string;
  specification: string;
  unit: number;
  category_id: number;
  price: number;
  image: string;
  id: number;
}
interface ProductIdPros {
  productId: number;
}
interface BodyInnerObjectText {
  input: string;
  error?: string;
}
interface BodyInnerObjectNumber {
  input: number;
  error?: string;
}
interface Body {
  name: BodyInnerObjectText;
  description: BodyInnerObjectText;
  specification: BodyInnerObjectText;
  unit: BodyInnerObjectNumber;
  category: BodyInnerObjectNumber;
  price: BodyInnerObjectNumber;
  image: {
    input: string;
    error?: string;
  };
  id: BodyInnerObjectNumber;
  filename: BodyInnerObjectText;
}

export type {
  Body,
  ProductIdPros,
  ProductType,
  BodyInnerObjectText,
  BodyInnerObjectNumber,
};
