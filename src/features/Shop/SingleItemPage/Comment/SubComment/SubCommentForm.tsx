import useCreateSubComment from "../../../../../hooks/SubComment/useCreateSubComment";
import useEscapeOfModal from "../../../../../hooks/UI/useEscapeOfModal";

type SubCommentTypes = {
  setReply: React.Dispatch<React.SetStateAction<string>>;
  reply: string;
  setShowReplyForm: React.Dispatch<React.SetStateAction<boolean>>;
  showReplyForm: boolean;
  commentId: string;
  userId: string;
  setSubCommentSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<"info" | "error" | "success">
  >;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function SubCommentForm({
  showReplyForm,
  setShowReplyForm,
  reply,
  setReply,
  commentId,
  userId,
  setSubCommentSubmitted,
  setInformativeModalMessage,
  setInformativeModalType,
  setShowInformativeModal,
}: SubCommentTypes) {
  const createSubComment = useCreateSubComment();
  useEscapeOfModal({ value: showReplyForm, setValue: setShowReplyForm });
  const handleAddingReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      createSubComment({ commentId, text: reply, userId }).then(() =>
        setSubCommentSubmitted((prev) => !prev)
      );
      setReply("");
      setShowReplyForm(false);
    } else {
      setInformativeModalMessage("You need to Register first");
      setInformativeModalType("info");
      setShowInformativeModal((prev) => !prev);
    }
  };
  return (
    <form
      onSubmit={handleAddingReply}
      className={`${showReplyForm ? "" : "hidden"} flex relative mb-[4.5rem]`}
    >
      <input
        type="text"
        className="w-full py-[.5rem] px-[1rem] outline-none border-b-[2px] border-gray-600 border-dotted text-gray-700 text-[1.4rem]"
        placeholder="....."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button className="absolute bottom-[-4rem] p-[.5rem] rounded-md shadow-md bg-primary-orange text-white text-[1.6rem] hover:scale-[1.01] active:scale-[0.99]">
        Submit
      </button>
      <button
        type="button"
        onClick={() => setShowReplyForm(false)}
        className="absolute bottom-[-4rem] left-[7rem] p-[.5rem] rounded-md shadow-md bg-white text-black text-[1.6rem] hover:scale-[1.01] active:scale-[0.99]"
      >
        Cancel
      </button>
    </form>
  );
}
