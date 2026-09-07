import { apiRequest, type ProductDto } from "@/lib/api/client";

type SerializedLong = {
  low: number;
  high?: number;
  unsigned?: boolean;
};

type ProductApiDto = Omit<ProductDto, "price"> & {
  price: Omit<ProductDto["price"], "amountMinor"> & {
    amountMinor: number | SerializedLong;
  };
};

export type ProductListParams = {
  pageSize?: number;
  pageToken?: string;
  search?: string;
  status?: string;
};

export type ProductListResponse = {
  products: ProductDto[];
  pageInfo: {
    hasNextPage: boolean;
    nextPageToken: string;
  };
};

function normalizeAmountMinor(value: number | SerializedLong) {
  if (typeof value === "number") return value;

  return value.low + (value.high ?? 0) * 2 ** 32;
}

function normalizeProduct(product: ProductApiDto): ProductDto {
  return {
    ...product,
    price: {
      ...product.price,
      amountMinor: normalizeAmountMinor(product.price.amountMinor),
    },
  };
}

export async function listProducts(params: ProductListParams = {}) {
  const query = new URLSearchParams();
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.pageToken) query.set("pageToken", params.pageToken);
  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);

  const suffix = query.size ? "?" + query.toString() : "";
  return apiRequest<{
    products: ProductApiDto[];
    pageInfo: ProductListResponse["pageInfo"];
  }>("/products" + suffix).then((response) => ({
    ...response,
    products: response.products.map(normalizeProduct),
  }));
}

export async function getProduct(id: string) {
  return apiRequest<ProductApiDto>("/products/" + id).then(normalizeProduct);
}
