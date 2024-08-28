import { useEffect, useState } from "react";
import { SubCommentTypes } from "../../types/SubCommentTypes";
import { getAllSubComments } from "../../api/queries/subCommentQueries";

export default function useGetAllSubComments({
  commentId,
}: {
  commentId: string;
}) {
  const [subcomments, setSubComments] = useState<SubCommentTypes[] | []>([]);

  useEffect(() => {
    getAllSubComments({ commentId }).then((r) => {
      if (r) {
        setSubComments(r);
      }
    });
  }, [commentId]);
  return subcomments;
}
