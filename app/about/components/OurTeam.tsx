import React from 'react';
import { teamMembers } from '@/lib/constants/about';

const OurTeam: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Meet Our Team</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            The people dedicated to bringing your digital vision to life.
          </p>
        </div>
        <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-brand-dark rounded-lg p-6 text-center border border-slate-800 transform transition duration-500 hover:-translate-y-2 hover:border-brand-primary/50">
              <img 
                src={member.imageUrl} 
                alt={`Photo of ${member.name}`} 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 ring-4 ring-slate-700"
              />
              <h3 className="text-2xl font-bold text-white">{member.name}</h3>
              <p className="text-brand-primary font-semibold mb-3">{member.title}</p>
              <p className="text-slate-400">{member.bio}</p>
          
                <div className="mt-4">
                  <h4 className="text-xl font-bold text-white mb-2">Skills</h4>
                  <div className="flex flex-wrap justify-center">
                    {member.skills.map(skill => (
                      <span key={skill.name} className="bg-slate-700 text-slate-300 px-2 py-1 rounded-md text-sm m-1 flex items-center">
                        {skill.icon} <span className="ml-2">{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
          
            
                  <div className="mt-4">
                      <h4 className="text-xl font-bold text-white mb-2">Contact</h4>
                      <div className="flex flex-wrap justify-center">
                          {member.contacts.map(contact => (
                              <a href={contact.link || (contact.name === 'email' ? `mailto:${contact.value}` : `tel:${contact.value}`)} key={contact.name} className="bg-slate-700 text-slate-300 px-2 py-1 rounded-md text-sm m-1 flex items-center">
                                {contact.icon} <span className="ml-2">{contact.name}: {contact.value}</span>
                              </a>
                          ))}
                      </div>
                  </div>
          
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
