import { User } from "lucide-react";
import InputLabelGoesDown from "../shared/InputLabelGoesDown";
import useAllowBecomingSeller from "../../hooks/BecomingSellerRequest/useAllowBecomingSeller";
import { FormEvent, useState } from "react";
import { BecomingSellerRequestTypes } from "../../types/BecomingSellerRequestTypes";
import useGetUser from "../../hooks/Profile/useGetUser";
import FormatDate from "../../utilities/FormatDate";
import { InformativeModalTypes } from "../shared/Modal/InformativeModal";

const basicRejectionResponse =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis recusandae, voluptas incidunt suscipit voluptate natus?";

type PermissionItemTypes = {
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<InformativeModalTypes>
  >;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRespondedRequestId: React.Dispatch<React.SetStateAction<string>>;
} & BecomingSellerRequestTypes;

export default function PermissionItem({
  _id,
  createdAt,
  userId,
  setRespondedRequestId,
  setInformativeModalMessage,
  setInformativeModalType,
  setShowInformativeModal,
}: PermissionItemTypes) {
  const allowBecomeSeller = useAllowBecomingSeller();
  const [reqStatus, setReqStatus] = useState<"denied" | "allowed">("denied");
  const [rejectionReason, setRejectionReason] = useState("");
  const user = useGetUser({ userId });

  const handleAllowingBecomingSeller = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (reqStatus === "denied") {
        if (!rejectionReason.trim() || !rejectionReason.length) {
          setInformativeModalMessage("Rejection reason is required!");
          setInformativeModalType("error");
          setShowInformativeModal((prev) => !prev);
          return;
        }
        setRespondedRequestId(_id);
        setInformativeModalMessage("This User will not be a seller");
        setInformativeModalType("info");
        setShowInformativeModal((prev) => !prev);
        return await allowBecomeSeller({
          userId,
          requestId: _id,
          status: reqStatus,
          denyingReason: rejectionReason,
        });
      } else {
        if (userId) {
          setRespondedRequestId(_id);
          setInformativeModalMessage("Seller role was successufully given");
          setInformativeModalType("success");
          setShowInformativeModal((prev) => !prev);
          await allowBecomeSeller({
            userId,
            requestId: _id,
            status: reqStatus,
          });
        }
      }
    } catch (error) {
      console.error("Failed: ", error);
    }
  };

  return (
    <div className="bg-white flex flex-col gap-[.5rem] p-[1rem] rounded-lg shadow-sm shadow-black">
      <div className="flex sm:flex-row flex-col-reverse gap-[1rem] justify-between">
        <div className="flex items-center">
          <User className="w-[4rem] h-[4rem]" />
          <div className="flex flex-col">
            <h3>Username: {user.username}</h3>
            <p>id: {_id}</p>
          </div>
        </div>

        <div className="sm:self-auto self-end">
          <p>Created at: {FormatDate(createdAt, "dd-mm-yyyy")}</p>
        </div>
      </div>
      <form>
        <InputLabelGoesDown
          htmlFor="reasonForRejection"
          id="reasonForRejection"
          placeHolder="Request is denied because of...."
          type="text"
          value={rejectionReason}
          setValue={setRejectionReason}
          className="my-[1rem]"
        />

        <div className="flex items-center gap-[.5rem]">
          <label htmlFor="confirmUserUserId">Confirm request?</label>
          <input
            id="confirmUserUserId"
            type="checkbox"
            onChange={() =>
              setReqStatus((prev) => {
                if (prev === "denied") {
                  return "allowed";
                } else {
                  return "denied";
                }
              })
            }
            value={reqStatus}
          />
        </div>
        <div className="flex sm:items-center justify-between sm:flex-row flex-col">
          <button
            className="my-[1rem] active:scale-[.97] shadow-sm shadow-black p-[1rem] outline-none hover:bg-primary-orange hover:text-white rounded-md transition-all hover:translate-x-1"
            type="button"
            onClick={() => setRejectionReason(basicRejectionResponse)}
          >
            Give basic response for rejection
          </button>
          <button
            onClick={handleAllowingBecomingSeller}
            className="my-[1rem] active:scale-[.97] shadow-sm shadow-black p-[1rem] outline-none hover:bg-green-400 hover:text-white rounded-md transition-all hover:translate-x-1"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
