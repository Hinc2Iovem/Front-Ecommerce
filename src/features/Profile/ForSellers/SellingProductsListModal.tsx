import { Link } from "react-router-dom";
import useGetProductsByUserId from "../../../hooks/Profile/useGetProductsByUserId";
import ButtonHoverPromptModal from "../../shared/ButtonAsideHoverPromtModal/ButtonHoverPromptModal";
import FormatCurrency from "../../../utilities/FormatCurrency";

type SellingProductsListModalTypes = {
  showProdactsListModal: boolean;
  isLightBox: boolean;
  userId: string;
};

export default function SellingProductsListModal({
  isLightBox,
  showProdactsListModal,
  userId,
}: SellingProductsListModalTypes) {
  const products = useGetProductsByUserId({ userId });

  return (
    <aside
      className={`${
        isLightBox && showProdactsListModal
          ? "absolute z-[4] bg-neutral-magnolia w-[30rem] h-[50rem] top-[calc(50%-25rem)] left-[calc(50%-15rem)]"
          : "hidden"
      } transition-all rounded-md opacity-100 p-[1rem]`}
    >
      <ul className="flex flex-col gap-[1rem] h-full overflow-y-auto">
        {products.map((p) => (
          <SellingProductItemModal
            key={p._id}
            description={p.description}
            frontImg={p.frontImg}
            price={Number(p.price)}
            productId={p._id}
            title={p.title}
          />
        ))}
      </ul>
    </aside>
  );
}

type SellingProductItemModalTypes = {
  productId: string;
  title: string;
  description: string;
  price: number;
  frontImg: string;
};

function SellingProductItemModal({
  productId,
  title,
  price,
  description,
  frontImg,
}: SellingProductItemModalTypes) {
  return (
    <li className="border-primary-pastel-blue border-[3px] border-dotted flex gap-[1rem] items-center p-[.4rem] rounded-sm">
      <Link to={`/products/${productId}`}>
        <img
          src={frontImg}
          alt={title}
          className="cursor-pointer hover:scale-[1.1] w-[5rem] h-[5rem] object-contain"
        />
      </Link>
      <div className="text-neutral-cool-gray font-medium">
        <Link to={`/products/${productId}`}>
          <ButtonHoverPromptModal
            contentName={title}
            positionByAbscissa="left"
            variant="icon"
            className="bg-transparent"
          >
            <h5 className="hover:text-black m-0">
              {title.substring(0, 10) + "..."} -{" "}
              <span>{FormatCurrency(price)}</span>
            </h5>
          </ButtonHoverPromptModal>
        </Link>
        <p className="text-[1.4rem]">{description.substring(0, 10) + "..."}</p>
      </div>
    </li>
  );
}
