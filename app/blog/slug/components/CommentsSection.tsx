import React, { useState } from 'react';

const CommentsSection: React.FC = () => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    // Simulate API call for display purposes
    setTimeout(() => {
      setSubmittedMessage('Your comment has been submitted for review.');
      setComment('');
      setIsSubmitting(false);
      setTimeout(() => setSubmittedMessage(''), 5000); // Clear message after 5 seconds
    }, 1000);
  };

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Leave a Comment</h2>
      {submittedMessage ? (
        <div className="bg-brand-secondary/20 border border-brand-secondary text-brand-secondary px-4 py-3 rounded-lg relative" role="alert">
          <span className="block sm:inline">{submittedMessage}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea
              id="comment"
              name="comment"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Join the discussion..."
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors duration-300"
              required
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              disabled={!comment.trim() || isSubmitting}
              className="bg-brand-primary hover:bg-brand-primary/80 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default CommentsSection;
