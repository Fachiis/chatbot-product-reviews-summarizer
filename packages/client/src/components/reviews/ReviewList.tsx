import StarRating from '@/components/reviews/StarRating.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button.tsx';
import { HiSparkles } from 'react-icons/hi2';
import ReviewSkeleton from '@/components/reviews/ReviewSkeleton.tsx';
import {
   type GetReviewsResponse,
   reviewsApi,
   type SummarizeResponse,
} from '@/components/reviews/reviewsApi.ts';

interface IProp {
   productId: number;
}

function ReviewList({ productId }: Readonly<IProp>) {
   const summaryMutation = useMutation<SummarizeResponse>({
      mutationFn: () => reviewsApi.summarizeReviews(productId),
   });

   const reviewsQuery = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId], // Used for caching and refetching
      queryFn: () => reviewsApi.fetchReviews(productId),
   });

   if (reviewsQuery?.isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((i) => (
               <ReviewSkeleton key={i} />
            ))}
         </div>
      );
   }

   if (reviewsQuery?.isError) {
      return (
         <p className="text-red-500">
            Could not load reviews. Please try again later.
         </p>
      );
   }

   if (reviewsQuery?.data?.reviews?.length === 0) {
      return null;
   }

   const currentSummary =
      reviewsQuery?.data?.summary ?? summaryMutation?.data?.summary;

   return (
      <div>
         <div className="mb-5">
            {currentSummary ? (
               <p>{currentSummary}</p>
            ) : (
               <div>
                  <Button
                     onClick={() => summaryMutation.mutate()}
                     disabled={summaryMutation.isPending}
                     className="cursor-pointer"
                  >
                     <HiSparkles />
                     Summarize
                  </Button>
                  {summaryMutation.isPending && (
                     <div className="mt-5">
                        <ReviewSkeleton />
                     </div>
                  )}
                  {summaryMutation.isError && (
                     <p className="text-red-500 mt-2">
                        Could not generate summary. Try again!
                     </p>
                  )}
               </div>
            )}
         </div>
         <div className="flex flex-col gap-5">
            {reviewsQuery?.data?.reviews?.map((review) => (
               <div key={review?.id}>
                  <div className="font-semibold">{review?.author}</div>
                  <div>
                     <StarRating value={review?.rating} />{' '}
                  </div>
                  <p className="py-2">{review.content}</p>
               </div>
            ))}
         </div>
      </div>
   );
}

export default ReviewList;
