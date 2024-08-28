import { Search } from "lucide-react";
import { useState } from "react";
import useCreateComment from "../../../../hooks/Comment/useCreateComment";

type CommentFormTypes = {
  setCommentSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  productId: string;
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<"info" | "error" | "success">
  >;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function CommentForm({
  userId,
  productId,
  setCommentSubmitted,
  setInformativeModalMessage,
  setInformativeModalType,
  setShowInformativeModal,
}: CommentFormTypes) {
  const createComment = useCreateComment();
  const [commentValue, setCommentValue] = useState("");
  const handleAddingComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId) {
      createComment({ productId, text: commentValue, userId }).then(() => {
        setCommentSubmitted((prev) => !prev);
      });
      setCommentValue("");
    } else {
      setInformativeModalMessage("You need to Register first");
      setInformativeModalType("info");
      setShowInformativeModal(true);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleAddingComment(e);
        setCommentValue("");
      }}
      className="flex justify-center h-[5rem] items-center w-full border-[1px] relative bg-white rounded-lg"
    >
      <input
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        className="border-primary-pastel-blue w-full outline-none border-[3px] border-dotted bg-transparent rounded-lg py-[1.15rem] px-[1rem] font-bold text-neutral-dark-grayish-blue"
      />
      <button
        type="submit"
        className="hover:z-[3] hover:scale-[1.1] cursor-pointer absolute right-[3rem]"
      >
        <Search className="text-primary-pastel-blue" />
      </button>
    </form>
  );
}
