import { motion } from 'framer-motion';
import reviews from '../../data/reviews.json';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(s => (
        <svg
          key={s}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={s <= rating ? '#C8590A' : 'none'}
          stroke="#C8590A"
          strokeWidth="1.5"
          className="flex-shrink-0"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function CustomerStories() {
  const displayReviews = reviews.slice(0, 4);

  return (
    <section className="py-24 lg:py-28 bg-[#F7F4EE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-12 lg:mb-16">
          <p className="label-caps text-[#C8590A] text-xs mb-3">Customer Stories</p>
          <h2 className="font-display text-3xl lg:text-4xl font-medium text-[#1A1A18]">
            What people are saying
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-[#E2DDDA] p-6 flex flex-col gap-4"
            >
              <StarRating rating={review.rating} />

              <p className="text-[#1A1A18] text-sm leading-relaxed flex-1">
                "{review.text}"
              </p>

              <div className="border-t border-[#E2DDDA] pt-4 flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1A1A18]">{review.author}</p>
                  <p className="text-xs text-[#6B6860] mt-0.5">{review.location}</p>
                </div>
                <span className="label-caps text-[#C8590A] text-[9px]">✓ Verified</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-12 flex flex-wrap gap-12 pt-12 border-t border-[#E2DDDA]">
          {[
            { label: 'Average Rating', value: '4.8 / 5' },
            { label: 'Verified Reviews', value: '200+' },
            { label: 'Repeat Customers', value: '68%' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="font-display text-3xl lg:text-4xl font-medium text-[#1A1A18]">{stat.value}</p>
              <p className="label-caps text-[#6B6860] text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
