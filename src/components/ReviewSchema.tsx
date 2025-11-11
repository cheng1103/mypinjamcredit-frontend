interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

interface ReviewSchemaProps {
  reviews: Review[];
}

export function ReviewSchema({ reviews }: ReviewSchemaProps) {
  if (reviews.length === 0) return null;

  const aggregateRating = {
    ratingValue: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Money Line Solutions',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating,
      worstRating: aggregateRating.worstRating
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
