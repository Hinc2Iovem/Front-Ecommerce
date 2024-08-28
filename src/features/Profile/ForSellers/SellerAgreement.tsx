import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMakeRequestBecomingSeller from "../../../hooks/BecomingSellerRequest/useMakeRequestBecomingSeller";
import InformativeModal, {
  InformativeModalTypes,
} from "../../shared/Modal/InformativeModal";

type SellerAgreementTypes = {
  isLightBox: boolean;
  setIsLightBox: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
};

export default function SellerAgreement({
  isLightBox,
  setIsLightBox,
  userId,
}: SellerAgreementTypes) {
  const [informativeModalType, setInformativeModalType] =
    useState<InformativeModalTypes>("success");
  const [informativeModalMessage, setInformativeModalMessage] = useState("");
  const [showInformativeModal, setShowInformativeModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const becomingSellerRequest = useMakeRequestBecomingSeller();

  const handleAgreement = async () => {
    if (isConfirmed) {
      becomingSellerRequest({ userId });
      setIsLightBox(false);
      setInformativeModalMessage("Your request is now under consideration");
      setInformativeModalType("info");
      setShowInformativeModal((prev) => !prev);
    } else {
      setInformativeModalMessage("You need to confirm first");
      setInformativeModalType("error");
      setShowInformativeModal((prev) => !prev);
    }
  };

  return (
    <>
      <aside
        className={`${
          isLightBox
            ? "absolute z-[4] bg-neutral-magnolia w-full md:max-w-[80rem] max-w-[30rem] h-[50rem] top-[calc(50%-25rem)] md:left-[calc(50%-40rem)] left-[calc(50%-15rem)]"
            : "hidden"
        } transition-all rounded-md opacity-90 p-[1rem] scroll-smooth overflow-y-auto`}
      >
        <h1 className="text-center font-medium text-[2.5rem]">
          Terms of agreement
        </h1>
        <div className=" border-black mb-[.5rem] border-b-[1px] w-full"></div>
        <p className="text-[1.5rem] ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
          necessitatibus recusandae accusamus ducimus, eius voluptas repudiandae
          et sequi eligendi velit esse, libero veritatis voluptatum possimus
          facere soluta expedita placeat ipsum doloremque id, labore cumque.
          Adipisci doloremque placeat voluptas mollitia, similique quia
          voluptatem, natus magnam sequi voluptatum architecto nobis,
          consequuntur quod laboriosam ex. Provident repellat rem architecto
          molestiae dolor, fugiat nobis hic possimus quo quidem eum deleniti
          praesentium numquam ea qui blanditiis deserunt nesciunt delectus!
          Soluta adipisci quod non. Officia, provident minus. Facilis libero,
          tempora autem incidunt cumque exercitationem asperiores in esse fugiat
          similique reiciendis, aperiam, beatae cupiditate rem saepe officiis
          earum ab ducimus error blanditiis. Sequi labore quasi voluptatibus
          alias quod nesciunt ea libero odit saepe sed consectetur dolores, ipsa
          maxime, tempora ducimus reiciendis, odio quis temporibus. Dolores
          dignissimos deserunt suscipit quaerat eligendi voluptas! Molestiae,
          porro perspiciatis vero minima fugiat suscipit quam commodi sed ab
          sapiente quod nulla mollitia pariatur nemo deleniti cum natus odit,
          placeat debitis aliquid. Aspernatur rem veritatis esse! Neque animi
          dolorem excepturi placeat nesciunt quasi similique quidem eos pariatur
          exercitationem voluptatem dolorum, laborum dicta quas molestias
          perspiciatis mollitia illum, omnis laboriosam error maxime numquam
          corrupti? Expedita maxime cumque hic nemo iure quo, fugit quia
          corrupti <span className="text-[.5rem]">scam</span> aperiam.
        </p>
        <div className=" border-black my-[.5rem] border-b-[1px] w-full"></div>
        <div className="flex items-center gap-[.5rem] justify-between">
          <div className="flex items-center gap-[.5rem]">
            <label htmlFor="sellerAgreement">Confirm? </label>
            <input
              checked={isConfirmed}
              onChange={() => setIsConfirmed((prev) => !prev)}
              id="sellerAgreement"
              type="checkbox"
              className="cursor-pointer"
            />
          </div>
          <button
            className="hover:bg-white px-[1rem] py-[.5rem] rounded-md transition-all hover:translate-x-1 active:scale-[.97]"
            onClick={handleAgreement}
          >
            Submit
          </button>
        </div>
      </aside>
      <InformativeModal
        closeOnClick={true}
        duration={1500}
        appearsFrom="bottom"
        positionX="right-[1rem]"
        positionY="bottom-[1rem]"
        type={informativeModalType}
        message={informativeModalMessage}
        setShowInformativeModal={setShowInformativeModal}
        showInformativeModal={showInformativeModal}
      />
    </>
  );
}
