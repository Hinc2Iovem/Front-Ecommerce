type DefaultAmountOfProductsTypes = {
  productAmount: number;
  currentProductId: string;
};

export default function RecommendedAmountOfProducts({
  productAmount,
  currentProductId,
}: DefaultAmountOfProductsTypes) {
  return (
    <h3
      className={`${
        currentProductId ? "" : "hidden"
      } text-gray-700 text-[2rem] self-end`}
    >
      You can add {productAmount} more products
    </h3>
  );
}
