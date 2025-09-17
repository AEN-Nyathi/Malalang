import React from 'react';
import QuestionnaireForm from '/app/questionnaire/components/QuestionnaireForm.tsx';

const QuestionnairePage: React.FC = () => {
  return (
    <main>
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Website Project Questionnaire</h1>
            <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
              Please fill out this form to the best of your ability. The more detail you provide, the better we can understand your vision and needs for the new website.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <QuestionnaireForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default QuestionnairePage;