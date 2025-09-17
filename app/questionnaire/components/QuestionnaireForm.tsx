import React, { useState } from 'react';
import ImageColorPicker from '../../../components/ImageColorPicker';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface FileUploadState {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  fileName: string | null;
  error: string | null;
  previewUrl?: string;
}

const initialFileUploadState: FileUploadState = {
  status: 'idle',
  progress: 0,
  fileName: null,
  error: null,
};


const FileUploadWidget: React.FC<{
  label: string;
  description: string;
  id: string;
  accept: string;
  showPreview?: boolean;
}> = ({ label, description, id, accept, showPreview = false }) => {
  const [uploadState, setUploadState] = useState<FileUploadState>(initialFileUploadState);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset state for new upload
    setUploadState({ ...initialFileUploadState, status: 'uploading', fileName: file.name });
    
    // Create object URL for preview if applicable
    let previewUrl: string | undefined = undefined;
    if (showPreview && file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
    }


    // File size validation (e.g., 10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadState({
        status: 'error',
        progress: 0,
        fileName: file.name,
        error: 'File is too large (max 10MB).',
      });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      return;
    }
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadState(prev => {
        const newProgress = prev.progress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return { ...prev, progress: 100, status: 'success', previewUrl };
        }
        return { ...prev, progress: newProgress, previewUrl };
      });
    }, 100);
  };
  
  const resetUpload = () => {
    if (uploadState.previewUrl) {
        URL.revokeObjectURL(uploadState.previewUrl);
    }
    setUploadState(initialFileUploadState);
  };
  
  const fileInputClasses = "w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 cursor-pointer";
  const labelClass = "block text-slate-300 font-semibold mb-2";
  const descriptionClass = "text-sm text-slate-400 mt-1";

  return (
    <div className="bg-slate-900/50 p-4 rounded-md border border-slate-700/50">
      <label htmlFor={id} className={labelClass}>{label}</label>
      <p className={descriptionClass}>{description}</p>
      
      {uploadState.status === 'idle' && (
        <input type="file" id={id} name={id} accept={accept} className={fileInputClasses} onChange={handleFileChange} />
      )}

      {uploadState.status === 'uploading' && (
        <div className="mt-2">
            <p className="text-sm text-slate-300 truncate">{uploadState.fileName}</p>
            <div className="w-full bg-slate-700 rounded-full h-2.5 mt-1">
                <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${uploadState.progress}%` }}></div>
            </div>
        </div>
      )}

      {uploadState.status === 'success' && (
        <div className="mt-2 flex items-center justify-between bg-brand-secondary/10 p-3 rounded-lg">
            <div className="flex items-center min-w-0">
                {showPreview && uploadState.previewUrl ? (
                    <img src={uploadState.previewUrl} alt="logo preview" className="w-10 h-10 object-contain rounded-md mr-3" />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-secondary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )}
                <p className="text-sm text-slate-200 truncate">{uploadState.fileName}</p>
            </div>
            <button type="button" onClick={resetUpload} className="text-slate-400 hover:text-white flex-shrink-0 ml-2">&times;</button>
        </div>
      )}

      {uploadState.status === 'error' && (
        <div className="mt-2 bg-red-500/10 p-3 rounded-lg">
            <p className="text-sm text-red-400 font-semibold">Upload Failed</p>
            <p className="text-sm text-red-400">{uploadState.error}</p>
            <button type="button" onClick={resetUpload} className="text-sm text-white mt-2 font-semibold hover:underline">Try again</button>
        </div>
      )}

    </div>
  );
};


const QuestionnaireForm: React.FC = () => {
  const [formData, setFormData] = useState({
    // Section 1: Business Info
    contactPerson: '',
    email: '',
    phone: '',
    businessName: '',
    currentWebsite: '',
    businessDescription: '',
    uniqueSellingProposition: '',
    
    // Competitors
    competitor1_name: '', competitor1_likes: '', competitor1_dislikes: '',
    
    // Audience
    targetAudience_demographics: '',
    targetAudience_goals: '',
    targetAudience_painPoints: '',

    // Section 2: Project Goals
    primaryGoal: '',
    successMetrics: '',
    requiredPages: [] as string[],
    budget: '',
    timeline: '',

    // Section 3: Design
    brandWords: '',
    designStyle: '',
    designStyleOther: '',
    hasLogo: '',
    hasBranding: '',
    brandColors: '',
    likedWebsites: '',
    dislikedWebsites: '',

    // Section 4: Content
    contentProvider: '',
    needsBlog: '',

    // Section 5: Features
    features: [] as string[],
    
    // Section 6: Technical
    domainStatus: '',
    maintenanceInterest: '',
    additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // FIX: The useMutation hook expects a function reference from the generated API, not a string.
  const addQuestionnaire = useMutation(api.questionnaires.addQuestionnaire);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => {
      const currentValues = prev[name as keyof typeof prev] as string[];
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] };
      } else {
        return { ...prev, [name]: currentValues.filter(item => item !== value) };
      }
    });
  };

  const handlePaletteChange = (colors: string[]) => {
    setFormData(prev => ({ ...prev, brandColors: colors.join(', ') }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Convex mutations will ignore extra fields in the formData object
      // so we can pass the whole state.
      await addQuestionnaire(formData);
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Failed to submit questionnaire:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-brand-dark p-8 rounded-lg border border-brand-secondary/50 text-center">
        <div className="text-brand-secondary mb-4 inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Thank You for Your Submission!</h2>
        <p className="text-slate-300 mt-2">We have received your questionnaire. We will review your answers and get in touch with you shortly to discuss the next steps.</p>
      </div>
    );
  }
  
  const inputClass = "w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary";
  const labelClass = "block text-slate-300 font-semibold mb-2";
  const fieldsetSpace = "space-y-6";
  const legendClass = "text-2xl font-bold text-white border-b border-slate-700 pb-3 mb-6 w-full";
  const descriptionClass = "text-sm text-slate-400 mt-1";
  const subLabelClass = "text-sm text-slate-400 font-medium";
  const subFieldsetSpace = "space-y-4 bg-slate-900/50 p-4 rounded-md border border-slate-700/50";

  const pagesOptions = ['Home', 'About Us', 'Our Team', 'Services', 'Pricing', 'Portfolio/Gallery', 'Testimonials', 'Blog', 'Contact', 'FAQ', 'Privacy Policy'];
  const featuresOptions = {
    'Content Display': ['Photo Gallery', 'Testimonials Section', 'Social Media Feed Integration', 'Embedded Maps'],
    'User Interaction': ['Advanced Forms', 'Newsletter Signup', 'Live Chat', 'Customer Login Area'],
    'Business Logic': ['E-commerce / Online Store', 'Booking / Appointment System'],
  };
  

  return (
    <div className="bg-brand-dark p-6 md:p-8 rounded-lg border border-slate-800">
      <form onSubmit={handleSubmit} noValidate className="space-y-12">
        
        {/* Section 1 */}
        <fieldset className={fieldsetSpace}>
          <legend className={legendClass}>1. Business & Brand Identity</legend>
          <div className="grid md:grid-cols-2 gap-6">
            <div><label htmlFor="contactPerson" className={labelClass}>Contact Person</label><input type="text" id="contactPerson" name="contactPerson" onChange={handleChange} className={inputClass} required /></div>
            <div><label htmlFor="email" className={labelClass}>Email Address</label><input type="email" id="email" name="email" onChange={handleChange} className={inputClass} required /></div>
            <div><label htmlFor="phone" className={labelClass}>Phone Number</label><input type="tel" id="phone" name="phone" onChange={handleChange} className={inputClass} /></div>
            <div><label htmlFor="businessName" className={labelClass}>Business Name</label><input type="text" id="businessName" name="businessName" onChange={handleChange} className={inputClass} required /></div>
          </div>
          <div><label htmlFor="currentWebsite" className={labelClass}>Current Website & Social Media Links (if any)</label><input type="text" id="currentWebsite" name="currentWebsite" onChange={handleChange} className={inputClass} placeholder="e.g., yoursite.com, facebook.com/yourbusiness" /></div>
          <div><label htmlFor="businessDescription" className={labelClass}>Briefly describe your business and the services/products you offer.</label><textarea id="businessDescription" name="businessDescription" rows={4} onChange={handleChange} className={inputClass} required /></div>
          <div><label htmlFor="uniqueSellingProposition" className={labelClass}>What makes your business unique compared to your competitors?</label><p className={descriptionClass}>What is your unique selling proposition (USP)?</p><textarea id="uniqueSellingProposition" name="uniqueSellingProposition" rows={3} onChange={handleChange} className={inputClass} /></div>
          
          <div>
            <label className={labelClass}>Competitor Analysis</label>
            <div className={subFieldsetSpace}>
                <label htmlFor="competitor1_name" className={subLabelClass}>Competitor 1 Website</label>
                <input type="text" id="competitor1_name" name="competitor1_name" onChange={handleChange} className={inputClass} placeholder="www.competitor.com" />
                <label htmlFor="competitor1_likes" className={subLabelClass}>What do you LIKE about their website?</label>
                <textarea id="competitor1_likes" name="competitor1_likes" rows={2} onChange={handleChange} className={inputClass} />
                <label htmlFor="competitor1_dislikes" className={subLabelClass}>What do you DISLIKE about their website?</label>
                <textarea id="competitor1_dislikes" name="competitor1_dislikes" rows={2} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          
          <div>
            <label className={labelClass}>Target Audience</label>
            <div className={subFieldsetSpace}>
                <label htmlFor="targetAudience_demographics" className={subLabelClass}>Describe your ideal customer (age, gender, location, occupation, etc.)</label>
                <textarea id="targetAudience_demographics" name="targetAudience_demographics" rows={3} onChange={handleChange} className={inputClass} />
                <label htmlFor="targetAudience_painPoints" className={subLabelClass}>What problems does your business solve for them?</label>
                <textarea id="targetAudience_painPoints" name="targetAudience_painPoints" rows={3} onChange={handleChange} className={inputClass} placeholder="e.g., 'They need a reliable plumber who shows up on time.'" />
                <label htmlFor="targetAudience_goals" className={subLabelClass}>What do you want them to DO on your website?</label>
                <textarea id="targetAudience_goals" name="targetAudience_goals" rows={3} onChange={handleChange} className={inputClass} placeholder="e.g., 'Fill out the contact form', 'Book an appointment', 'Buy a product'." />
            </div>
          </div>
        </fieldset>

        {/* Section 2 */}
        <fieldset className={fieldsetSpace}>
          <legend className={legendClass}>2. Project Goals & Scope</legend>
          <div><label htmlFor="primaryGoal" className={labelClass}>What is the single most important goal for this website?</label><p className={descriptionClass}>e.g., "Generate 10 new leads per month," "Sell products online," "Establish professional credibility."</p><input type="text" id="primaryGoal" name="primaryGoal" onChange={handleChange} className={inputClass} /></div>
          <div><label htmlFor="successMetrics" className={labelClass}>How will you measure the success of the new website?</label><p className={descriptionClass}>What specific numbers will tell you the site is working?</p><textarea id="successMetrics" name="successMetrics" rows={3} onChange={handleChange} className={inputClass} placeholder="e.g., More contact form submissions, higher online sales, fewer support calls, etc." /></div>
          <div><label className={labelClass}>What are the key pages you think you'll need?</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">{pagesOptions.map(page => <label key={page} className="flex items-center space-x-2 text-slate-300"><input type="checkbox" name="requiredPages" value={page} onChange={handleCheckboxChange} className="form-checkbox bg-slate-700 border-slate-600 text-brand-primary focus:ring-brand-primary" /> <span>{page}</span></label>)}</div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div><label htmlFor="budget" className={labelClass}>What is your approximate budget for this project?</label><select id="budget" name="budget" onChange={handleChange} className={inputClass}><option value="">Please select a range</option><option value="<1500">&lt; R1,500</option><option value="1500-2000">R1,500 - R2,000</option><option value="2000-5000">R2,000 - R5,000</option><option value="5000-10000">R5,000 - R10,000</option><option value=">10000">&gt; R10,000</option></select></div>
            <div><label htmlFor="timeline" className={labelClass}>What is your desired timeline for launching the website?</label><select id="timeline" name="timeline" onChange={handleChange} className={inputClass}><option value="">Please select</option><option value="1-2 Weeks">1-2 Weeks</option><option value="2-4 Weeks">2-4 Weeks</option><option value="1-2 Months">1-2 Months</option><option value="Flexible">Flexible</option></select></div>
          </div>
        </fieldset>
        
        {/* Section 3 */}
        <fieldset className={fieldsetSpace}>
          <legend className={legendClass}>3. Design & Aesthetics</legend>
          <div className="grid md:grid-cols-2 gap-6">
            <div><label htmlFor="brandWords" className={labelClass}>List 3-5 words that describe your brand's desired feel.</label><p className={descriptionClass}>e.g., "Modern, clean, trustworthy"</p><input type="text" id="brandWords" name="brandWords" onChange={handleChange} className={inputClass} /></div>
            <div><label htmlFor="designStyle" className={labelClass}>Which design style best fits your brand?</label><p className={descriptionClass}>Select the closest option.</p><select id="designStyle" name="designStyle" value={formData.designStyle} onChange={handleChange} className={inputClass}><option value="">Please select</option><option value="minimalist">Minimalist & Clean</option><option value="bold">Bold & Modern</option><option value="playful">Playful & Creative</option><option value="corporate">Corporate & Professional</option><option value="elegant">Elegant & Sophisticated</option><option value="other">Other</option></select>
            {formData.designStyle === 'other' && (
                <div className="mt-4">
                    <label htmlFor="designStyleOther" className={subLabelClass}>Please describe the style:</label>
                    <input type="text" id="designStyleOther" name="designStyleOther" value={formData.designStyleOther} onChange={handleChange} className={inputClass} placeholder="e.g., 'Rustic, organic, natural'" />
                </div>
            )}
            </div>
          </div>
          <div><label htmlFor="hasLogo" className={labelClass}>Do you have an existing logo?</label><select id="hasLogo" name="hasLogo" value={formData.hasLogo} onChange={handleChange} className={inputClass}><option value="">Please select</option><option value="yes">Yes, I have a logo.</option><option value="no">No, I need one created.</option></select></div>
          
          {(formData.hasLogo === 'yes') && (
            <FileUploadWidget 
              id="logoUpload"
              label="Upload Your Logo"
              description="Please upload your logo in a high-quality format (e.g., SVG, PNG, AI)."
              accept="image/*"
              showPreview={true}
            />
          )}

          <div>
            <label htmlFor="hasBranding" className={labelClass}>Do you have other brand design materials?</label>
            <p className={descriptionClass}>e.g., flyers, social media posts, brand guides.</p>
            <select id="hasBranding" name="hasBranding" value={formData.hasBranding} onChange={handleChange} className={inputClass}>
              <option value="">Please select</option>
              <option value="yes">Yes, I will provide them.</option>
              <option value="no">No, I don't have any.</option>
            </select>
          </div>

          {formData.hasBranding === 'yes' && (
            <FileUploadWidget 
              id="brandMaterialsUpload"
              label="Upload Brand Materials"
              description="You can upload a single .zip file with your assets."
              accept=".zip,.rar,.7zip"
            />
          )}
          
          <div className="pt-4 space-y-4">
            <label htmlFor="brandColors" className={labelClass}>Brand Colors (HEX codes)</label>
            <p className={descriptionClass}>
              Enter your brand's HEX codes below (e.g., #0891b2, #10b981). If you're unsure, upload a logo or inspirational image to generate a palette.
            </p>
            <input 
              type="text" 
              id="brandColors" 
              name="brandColors" 
              value={formData.brandColors}
              onChange={handleChange}
              className={inputClass}
              placeholder="#1a2b3c, #d4e5f6, ..."
            />
            <ImageColorPicker onPaletteChange={handlePaletteChange} />
          </div>

          <div><label htmlFor="likedWebsites" className={labelClass}>Please list 2-3 websites you like and explain what you like about them.</label><textarea id="likedWebsites" name="likedWebsites" rows={4} onChange={handleChange} className={inputClass} /></div>
          <div><label htmlFor="dislikedWebsites" className={labelClass}>Please list 1-2 websites you DISLIKE and explain why.</label><p className={descriptionClass}>This helps us understand what to avoid.</p><textarea id="dislikedWebsites" name="dislikedWebsites" rows={3} onChange={handleChange} className={inputClass} /></div>
        </fieldset>

        {/* Section 4 & 5 */}
        <fieldset className={fieldsetSpace}>
          <legend className={legendClass}>4. Content & Functionality</legend>
          <div><label htmlFor="contentProvider" className={labelClass}>Who will be providing the written content (text) and images for the website?</label><select id="contentProvider" name="contentProvider" onChange={handleChange} className={inputClass}><option value="">Please select</option><option value="client-all">I will provide all text and images.</option><option value="client-some">I will provide some, but I need help.</option><option value="developer-all">I need you to source/create all content.</option></select></div>
          <div><label htmlFor="needsBlog" className={labelClass}>Do you require a blog or news section on your website?</label><select id="needsBlog" name="needsBlog" onChange={handleChange} className={inputClass}><option value="">Please select</option><option value="yes">Yes</option><option value="no">No</option><option value="not-sure">Not sure yet</option></select></div>
          <div><label className={labelClass}>Do you need any of the following special features?</label>
            <div className="space-y-4 mt-2">
            {Object.entries(featuresOptions).map(([category, options]) => (
              <div key={category}>
                <h4 className="text-slate-400 font-semibold text-md mb-2">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {options.map(feature => (
                    <label key={feature} className="flex items-center space-x-2 text-slate-300">
                      <input type="checkbox" name="features" value={feature} onChange={handleCheckboxChange} className="form-checkbox bg-slate-700 border-slate-600 text-brand-primary focus:ring-brand-primary" />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            </div>
          </div>
        </fieldset>

        {/* Section 6 */}
        <fieldset className={fieldsetSpace}>
            <legend className={legendClass}>5. Technical & Logistics</legend>
            <div className="grid md:grid-cols-2 gap-6">
                <div><label htmlFor="domainStatus" className={labelClass}>Do you already own a domain name (e.g., yourbusiness.co.za)?</label><select id="domainStatus" name="domainStatus" onChange={handleChange} className={inputClass}><option value="">Please select</option><option value="yes">Yes</option><option value="no">No, I need help getting one</option></select></div>
                <div><label htmlFor="maintenanceInterest" className={labelClass}>Are you interested in an ongoing website maintenance plan?</label><select id="maintenanceInterest" name="maintenanceInterest" onChange={handleChange} className={inputClass}><option value="">Please select</option><option value="yes">Yes, tell me more</option><option value="no">No, not at this time</option><option value="not-sure">I'm not sure yet</option></select></div>
            </div>
            <div><label htmlFor="additionalInfo" className={labelClass}>Is there anything else we should know about your project?</label><textarea id="additionalInfo" name="additionalInfo" rows={4} onChange={handleChange} className={inputClass} /></div>
        </fieldset>

        {/* Submission */}
        <div className="text-right pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-primary hover:bg-brand-primary/80 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 w-full md:w-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionnaireForm;