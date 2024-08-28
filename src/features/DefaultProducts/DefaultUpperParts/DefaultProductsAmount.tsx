type DefaultProductsAmountTypes = {
  currentValue: number;
};

export default function DefaultProductsAmount({
  currentValue,
}: DefaultProductsAmountTypes) {
  return (
    <h3 className="text-[2rem] text-gray-700 sm:self-auto self-end">
      You can add {10 - currentValue} more
    </h3>
  );
}
