import { useEffect, useState } from "react";
import LightBox from "../shared/LightBox";
import SellerAgreement from "./ForSellers/SellerAgreement";
import useGetBecomingSellerRequestByUserId from "../../hooks/BecomingSellerRequest/useGetBecomingSellerRequestByUserId";
import { BecomingSellerRequestTypes } from "../../types/BecomingSellerRequestTypes";

type ProfileFooterTypes = {
  roles: string[];
  userId: string;
};

export default function ProfileFooter({ roles, userId }: ProfileFooterTypes) {
  const [isLightBox, setIsLightBox] = useState(false);
  const sellerRequest = useGetBecomingSellerRequestByUserId();
  const [requestInfo, setRequestInfo] =
    useState<BecomingSellerRequestTypes | null>(null);

  useEffect(() => {
    sellerRequest({ userId }).then((r) => {
      if (r) {
        setRequestInfo(r);
      }
    });
  }, [sellerRequest, userId]);

  if (requestInfo && requestInfo.status !== "denied") {
    return null;
  }

  return (
    <>
      <SellerAgreement
        isLightBox={isLightBox}
        setIsLightBox={setIsLightBox}
        userId={userId}
      />
      <LightBox isLightBox={isLightBox} setIsLightBox={setIsLightBox} />

      <footer
        className={` ${
          roles?.includes("Seller") ? "hidden" : "visible"
        } w-full bg-white p-[.5rem]`}
      >
        <div className="max-w-[146rem] m-auto p-[1rem] flex items-center justify-between">
          <h3>Want to try yourself as a seller?</h3>
          <button
            className="border-black border-[1px] px-[1rem] py-[1rem] rounded-md hover:border-none hover:bg-green-400 hover:text-white transition-colors"
            onClick={() => setIsLightBox(true)}
          >
            Become a seller
          </button>
        </div>
      </footer>
    </>
  );
}
