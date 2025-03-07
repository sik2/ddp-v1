import { NoticeComment, NoticeCommentListProps } from "@/types";
import { formatDate } from "@/lib/utils";

export default function NoticeCommentList({
  comments,
}: NoticeCommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="mt-4 text-center py-8 text-slate-500">
        등록된 댓글이 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4 text-slate-700">
        댓글 ({comments.length})
      </h3>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-slate-50 rounded-lg border border-slate-200/80"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs text-slate-500">
                {formatDate(comment.created_at)}
              </div>
            </div>
            <div className="text-slate-700 whitespace-pre-line">
              {comment.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
