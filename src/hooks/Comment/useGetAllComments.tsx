import { useEffect, useState } from "react";
import { CommentTypes } from "../../types/CommentTypes";
import { getAllComments } from "../../api/queries/commentQueries";

export default function useGetAllComments({
  productId,
}: {
  productId: string;
}) {
  const [comments, setComments] = useState<CommentTypes[] | []>([]);

  useEffect(() => {
    getAllComments({ productId }).then((r) => {
      if (r) {
        setComments(r);
      }
    });
  }, [productId]);
  return comments;
}
