import { useCallback, useEffect, useState } from "react";
import useGetAllBecomingSellerRequest from "../../hooks/BecomingSellerRequest/useGetAllBecomingSellerRequest";
import { BecomingSellerRequestTypes } from "../../types/BecomingSellerRequestTypes";
import Header from "../Header/Header";
import PermissionItem from "./PermissionItem";
import InformativeModal, {
  InformativeModalTypes,
} from "../shared/Modal/InformativeModal";

export default function Permission() {
  const [informativeModalType, setInformativeModalType] =
    useState<InformativeModalTypes>("success");
  const [informativeModalMessage, setInformativeModalMessage] = useState("");
  const [showInformativeModal, setShowInformativeModal] = useState(false);
  const getAllSellerRequests = useGetAllBecomingSellerRequest();
  const [sellerRequests, setSellerRequests] = useState<
    BecomingSellerRequestTypes[] | []
  >([]);
  const [respondedRequestId, setRespondedRequestId] = useState("");
  const [value, setValue] = useState("");

  const filterWaitingSellerRequests = useCallback(
    (
      sellerRequests: BecomingSellerRequestTypes[]
    ): BecomingSellerRequestTypes[] => {
      if (respondedRequestId) {
        return sellerRequests.filter(
          (item) => item._id !== respondedRequestId && item.status === "waiting"
        );
      }
      return sellerRequests.filter((req) => req.status === "waiting");
    },
    [respondedRequestId]
  );

  useEffect(() => {
    getAllSellerRequests().then((r) => {
      if (r) {
        setSellerRequests(r);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header setValue={setValue} showPillsOrNot={false} />
      <section className="max-w-[146rem] m-auto p-[1rem]">
        {sellerRequests?.length > 0 && (
          <div className="mt-[3rem] w-full flex flex-col gap-[1rem] p-[1rem]">
            {filterWaitingSellerRequests(sellerRequests).map((sellReq) => {
              return (
                <PermissionItem
                  key={sellReq._id}
                  setRespondedRequestId={setRespondedRequestId}
                  setInformativeModalMessage={setInformativeModalMessage}
                  setShowInformativeModal={setShowInformativeModal}
                  setInformativeModalType={setInformativeModalType}
                  {...sellReq}
                />
              );
            })}
          </div>
        )}
      </section>
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
