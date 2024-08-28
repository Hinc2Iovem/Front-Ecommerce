import { EyeOff, User } from "lucide-react";
import { SubCommentTypes } from "../../../../../types/SubCommentTypes";
import dislike from "../../../../../assets/images/Shop/comment/dislike.svg";
import like from "../../../../../assets/images/Shop/comment/like.svg";
import useGetUser from "../../../../../hooks/Profile/useGetUser";
import { useCallback, useEffect, useState } from "react";
import useGetReactedSubComment from "../../../../../hooks/SubComment/useGetReactedSubComment";
import FormatBigNumbers from "../../../../../utilities/FormatBigNumbers";
import SubCommentForm from "./SubCommentForm";
import { getAllSubComments } from "../../../../../api/queries/subCommentQueries";
import useUpdateSubCommentLikes from "../../../../../hooks/SubComment/useUpdateSubCommentLikes";
import { ReactedCommentTypes } from "../../../../../types/ReactedCommentTypes";

export type SubCommentComponentTypes = {
  showSubComment: boolean;
  setInformativeModalType: React.Dispatch<
    React.SetStateAction<"info" | "error" | "success">
  >;
  setShowInformativeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInformativeModalMessage: React.Dispatch<React.SetStateAction<string>>;
} & SubCommentTypes;

export default function SubComment({
  _id,
  amountOfDisLikes,
  amountOfLikes,
  text,
  userId,
  showSubComment,
  setInformativeModalMessage,
  setInformativeModalType,
  setShowInformativeModal,
}: SubCommentComponentTypes) {
  const user = useGetUser({ userId });

  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [currentAmountOfLikes, setCurrentAmountOfLikes] =
    useState(amountOfLikes);
  const [currentAmountOfDisLikes, setCurrentAmountOfDisLikes] =
    useState(amountOfDisLikes);

  const getReactedComment = useGetReactedSubComment();
  const [reactedComment, setReactedComment] =
    useState<ReactedCommentTypes | null>(null);
  useEffect(() => {
    getReactedComment({ subCommentId: _id, userId }).then((r) => {
      if (r) {
        setReactedComment(r);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, userId]);

  const [currentLiked, setCurrentLiked] = useState(reactedComment?.isLiked);
  const [reactionClicked, setReactionClicked] = useState("");

  const [subCommentSubmitted, setSubCommentSubmitted] = useState(false);
  const [subComments, setSubComments] = useState<SubCommentTypes[]>([]);
  const updateSubCommentLikes = useUpdateSubCommentLikes();

  useEffect(() => {
    getAllSubComments({ commentId: _id }).then((r) => {
      if (r) {
        setSubComments(r);
      }
    });
  }, [_id, subCommentSubmitted]);

  useEffect(() => {
    if (reactedComment) {
      setCurrentLiked(reactedComment?.isLiked);
    }
  }, [reactedComment]);

  const [reply, setReply] = useState("");

  const handleLike = useCallback(() => {
    if (reactedComment) {
      if (!currentLiked) {
        setCurrentLiked(true);
        setCurrentAmountOfLikes((prev) => (prev += 1));
        setCurrentAmountOfDisLikes((prev) => (prev -= 1));
        updateSubCommentLikes({
          subCommentId: _id,
          isLiked: true,
          userId: user._id,
        });
      }
    } else {
      if (reactionClicked === "") {
        setCurrentAmountOfLikes((prev) => (prev += 1));
        updateSubCommentLikes({
          subCommentId: _id,
          isLiked: true,
          userId: user._id,
        });
      } else if (reactionClicked === "dislike") {
        setCurrentAmountOfDisLikes((prev) => (prev -= 1));
        setCurrentAmountOfLikes((prev) => (prev += 1));
      }
    }
  }, [
    _id,
    currentLiked,
    reactedComment,
    reactionClicked,
    user._id,
    updateSubCommentLikes,
  ]);

  const handleDisLike = useCallback(() => {
    if (reactedComment) {
      if (currentLiked) {
        setCurrentLiked(false);
        setCurrentAmountOfLikes((prev) => (prev -= 1));
        setCurrentAmountOfDisLikes((prev) => (prev += 1));
        updateSubCommentLikes({
          subCommentId: _id,
          isLiked: false,
          userId: user._id,
        });
      }
    } else {
      if (reactionClicked === "") {
        setCurrentAmountOfDisLikes((prev) => (prev += 1));
        updateSubCommentLikes({
          subCommentId: _id,
          isLiked: false,
          userId: user._id,
        });
      } else if (reactionClicked === "like") {
        setCurrentAmountOfDisLikes((prev) => (prev += 1));
        setCurrentAmountOfLikes((prev) => (prev -= 1));
      }
    }
  }, [
    _id,
    currentLiked,
    reactedComment,
    reactionClicked,
    user._id,
    updateSubCommentLikes,
  ]);

  return (
    <section
      className={`${
        showSubComment ? "" : "hidden"
      } mb-[1rem] ml-[2rem] mt-[1rem]`}
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
                reactionClicked === "like" ||
                (currentLiked && subComments.length)
                  ? "shadow-md rounded-full"
                  : ""
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
                reactionClicked === "dislike" ||
                (!currentLiked && subComments.length)
                  ? "shadow-md rounded-full"
                  : ""
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
        <div className={`${subComments.length ? "mb-[1rem]" : "hidden"}`}>
          <button
            onClick={() => setShowReplies(true)}
            className={`${
              showReplies ? "hidden" : ""
            } absolute bottom-[-.8rem] left-[-1rem] text-gray-600 hover:text-gray-800 transition-all`}
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
        setSubCommentSubmitted={setSubCommentSubmitted}
        setShowReplyForm={setShowReplyForm}
        showReplyForm={showReplyForm}
        setReply={setReply}
        reply={reply}
        commentId={_id}
        userId={user._id}
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
