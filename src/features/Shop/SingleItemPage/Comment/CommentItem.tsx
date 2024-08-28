import { EyeOff, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CommentTypes } from "../../../../types/CommentTypes";
import dislike from "../../../../assets/images/Shop/comment/dislike.svg";
import like from "../../../../assets/images/Shop/comment/like.svg";
import useGetUser from "../../../../hooks/Profile/useGetUser";
import FormatBigNumbers from "../../../../utilities/FormatBigNumbers";
import useGetReactedComment from "../../../../hooks/Comment/useGetReactedComment";
import SubCommentForm from "./SubComment/SubCommentForm";
import SubComment from "./SubComment/SubComment";
import { SubCommentTypes } from "../../../../types/SubCommentTypes";
import { getAllSubComments } from "../../../../api/queries/subCommentQueries";
import useGetDecodedJWTValues from "../../../../hooks/Auth/useGetDecodedJWTValues";
import { ReactedCommentTypes } from "../../../../types/ReactedCommentTypes";
import useUpdateCommentLikes from "../../../../hooks/Comment/useUpdateCommentLikes";

type CommentItemTypes = {
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<"info" | "error" | "success">
  >;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
} & CommentTypes;

export default function CommentItem({
  _id,
  amountOfDisLikes,
  amountOfLikes,
  text,
  userId,
  setInformativeModalMessage,
  setInformativeModalType,
  setShowInformativeModal,
}: CommentItemTypes) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [reply, setReply] = useState("");

  const [reactedComment, setReactedComment] =
    useState<ReactedCommentTypes | null>(null);

  const [showReplies, setShowReplies] = useState(false);
  const [subCommentSubmitted, setSubCommentSubmitted] = useState(false);
  const [subComments, setSubComments] = useState<SubCommentTypes[]>([]);

  useEffect(() => {
    getAllSubComments({ commentId: _id }).then((r) => {
      if (r) {
        setSubComments(r);
      }
    });
  }, [_id, subCommentSubmitted]);

  const user = useGetUser({ userId });
  const { userId: id } = useGetDecodedJWTValues();

  const [currentAmountOfLikes, setCurrentAmountOfLikes] =
    useState(amountOfLikes);
  const [currentAmountOfDisLikes, setCurrentAmountOfDisLikes] =
    useState(amountOfDisLikes);

  const [currentLiked, setCurrentLiked] = useState(reactedComment?.isLiked);
  const [reactionClicked, setReactionClicked] = useState("");

  const updateCommentLikes = useUpdateCommentLikes();
  const getReactedComment = useGetReactedComment();
  useEffect(() => {
    getReactedComment({ commentId: _id, userId }).then((r) => {
      if (r) {
        setReactedComment(r);
      }
    });
  }, [getReactedComment, _id, userId]);

  useEffect(() => {
    if (reactedComment?.isLiked) {
      setCurrentLiked(reactedComment?.isLiked);
    }
  }, [reactedComment]);

  const handleLike = useCallback(() => {
    if (id) {
      if (reactedComment) {
        if (!currentLiked) {
          setCurrentLiked(true);
          setCurrentAmountOfLikes((prev) => prev + 1);
          setCurrentAmountOfDisLikes((prev) => prev - 1);
          updateCommentLikes({
            commentId: _id,
            isLiked: true,
            userId: id,
          });
        }
      } else {
        if (reactionClicked === "") {
          setCurrentAmountOfLikes((prev) => prev + 1);
          updateCommentLikes({
            commentId: _id,
            isLiked: true,
            userId: id,
          });
        } else if (reactionClicked === "dislike") {
          setCurrentAmountOfLikes((prev) => prev + 1);
          updateCommentLikes({
            commentId: _id,
            isLiked: true,
            userId: id,
          });
          setCurrentAmountOfDisLikes((prev) => prev - 1);
        }
      }
    }
  }, [
    currentLiked,
    reactedComment,
    _id,
    id,
    reactionClicked,
    updateCommentLikes,
  ]);

  const handleDisLike = useCallback(() => {
    if (id) {
      if (reactedComment) {
        if (currentLiked) {
          setCurrentLiked(false);
          setCurrentAmountOfLikes((prev) => prev - 1);
          setCurrentAmountOfDisLikes((prev) => prev + 1);
          updateCommentLikes({
            commentId: _id,
            isLiked: false,
            userId: id,
          });
        }
      } else {
        if (reactionClicked === "") {
          setCurrentAmountOfDisLikes((prev) => prev + 1);
          updateCommentLikes({
            commentId: _id,
            isLiked: false,
            userId: id,
          });
        } else if (reactionClicked === "like") {
          setCurrentAmountOfLikes((prev) => prev - 1);
          updateCommentLikes({
            commentId: _id,
            isLiked: false,
            userId: id,
          });
          setCurrentAmountOfDisLikes((prev) => prev + 1);
        }
      }
    }
  }, [
    currentLiked,
    reactedComment,
    _id,
    id,
    reactionClicked,
    updateCommentLikes,
  ]);

  return (
    <section
      className={`${
        subComments.length || subCommentSubmitted ? "mb-[2rem]" : ""
      }`}
    >
      <div className="flex flex-col gap-[.5rem] relative">
        <div className="flex items-center">
          <User />
          <h3>{user.username}</h3>
        </div>
        <p>{text}</p>
        <div className="w-fit flex gap-[1rem] items-center">
          <div className="flex items-center gap-[.3rem] text-[1.4rem] font-medium">
            <p>{FormatBigNumbers(currentAmountOfLikes)}</p>
            <button
              onClick={() => {
                handleLike();
                setReactionClicked("like");
              }}
              className={`${
                reactionClicked === "like" ? "shadow-md rounded-full" : ""
              } p-[.5rem] hover:scale-[1.01] active:scale-[0.98]`}
            >
              <img src={like} alt="Like" />
            </button>
          </div>
          <div className="flex items-center gap-[.3rem] text-[1.4rem] font-medium">
            <p>{FormatBigNumbers(currentAmountOfDisLikes)}</p>
            <button
              onClick={() => {
                handleDisLike();
                setReactionClicked("dislike");
              }}
              className={`${
                reactionClicked === "dislike" ? "shadow-md rounded-full" : ""
              } p-[.5rem] hover:scale-[1.01] active:scale-[0.98]`}
            >
              <img src={dislike} alt="Dislike" />
            </button>
          </div>
          <button
            onClick={() => setShowReplyForm((prev) => !prev)}
            className="w-fit text-gray-700 hover:text-black transition-all text-[1.5rem] font-medium"
          >
            reply
          </button>
        </div>
        <div
          className={`${
            subComments.length || subCommentSubmitted ? "" : "hidden"
          }`}
        >
          <button
            onClick={() => setShowReplies(true)}
            className={`${
              showReplies ? "hidden" : ""
            } absolute bottom-[-2.5rem] text-gray-600 hover:text-gray-800 transition-all`}
          >
            See Replies
          </button>
          <button
            onClick={() => setShowReplies(false)}
            className={`${showReplies ? "" : "hidden"} ${
              showReplyForm ? "bottom-[-10rem]" : "bottom-[-3rem]"
            } absolute left-[-.5rem] text-gray-600 hover:text-gray-800 transition-all`}
          >
            <EyeOff />
          </button>
        </div>
      </div>
      <SubCommentForm
        setShowReplyForm={setShowReplyForm}
        showReplyForm={showReplyForm}
        setReply={setReply}
        reply={reply}
        commentId={_id}
        userId={id ?? ""}
        setSubCommentSubmitted={setSubCommentSubmitted}
        setInformativeModalMessage={setInformativeModalMessage}
        setInformativeModalType={setInformativeModalType}
        setShowInformativeModal={setShowInformativeModal}
      />
      {subComments.length > 0 &&
        subComments?.map((sc) => (
          <SubComment
            key={sc._id}
            setInformativeModalMessage={setInformativeModalMessage}
            setInformativeModalType={setInformativeModalType}
            setShowInformativeModal={setShowInformativeModal}
            showSubComment={showReplies}
            {...sc}
          />
        ))}
    </section>
  );
}
