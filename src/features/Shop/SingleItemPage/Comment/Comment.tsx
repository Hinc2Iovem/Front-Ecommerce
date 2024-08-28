import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { useEffect, useState } from "react";
import { getAllComments } from "../../../../api/queries/commentQueries";
import { CommentTypes } from "../../../../types/CommentTypes";

type CommentProps = {
  productId: string;
  userId: string;
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<"info" | "error" | "success">
  >;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function Comment({
  productId,
  userId,
  setInformativeModalMessage,
  setInformativeModalType,
  setShowInformativeModal,
}: CommentProps) {
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [comments, setComments] = useState<CommentTypes[]>([]);
  useEffect(() => {
    getAllComments({ productId }).then((r) => {
      if (r) {
        setComments(r);
      }
    });
  }, [productId, commentSubmitted]);

  return (
    <section className="bg-white flex flex-col gap-[2rem] rounded-lg max-w-[1110px] mx-auto p-[3rem] relative w-full">
      <CommentForm
        productId={productId}
        userId={userId}
        setInformativeModalMessage={setInformativeModalMessage}
        setInformativeModalType={setInformativeModalType}
        setShowInformativeModal={setShowInformativeModal}
        setCommentSubmitted={setCommentSubmitted}
      />
      {typeof comments === "object" ? (
        <div className="w-full flex flex-col gap-[1.5rem]">
          {comments.map((c) => (
            <CommentItem
              key={c._id}
              setInformativeModalMessage={setInformativeModalMessage}
              setInformativeModalType={setInformativeModalType}
              setShowInformativeModal={setShowInformativeModal}
              {...c}
            />
          ))}
        </div>
      ) : (
        <div className="w-fit text-[5rem] text-gray-500">......</div>
      )}
    </section>
  );
}
