import React from 'react';
import { FaGraduationCap, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

const Education: React.FC = () => {
  const activities = [
    {
      icon: FaUsers,
      title: 'Floorball Interest Group Leader',
      organization: 'NUS Pioneer House',
      description: 'Leading and organizing floorball sessions for the residential community.'
    },
    {
      icon: FaUsers,
      title: 'Member',
      organization: 'NUS Social Impact Catalyst',
      description: 'Contributing to social impact initiatives and community development projects.'
    },
    {
      icon: FaHandHoldingHeart,
      title: 'Activity Coordinator',
      organization: 'St. John\'s Dementia Centre',
      description: 'Organizing activities and providing support for individuals with dementia.'
    }
  ];

  return (
    <section id="education" className="h-full flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="section-title">Education & Activities</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            My academic journey and involvement in community activities that shape my character and leadership skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div className="card">
            <div className="flex items-center mb-6">
              <FaGraduationCap className="text-3xl text-accent-blue mr-4" />
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  National University of Singapore
                </h4>
                <p className="text-gray-300 mb-1">Bachelor of Computing in Computer Science</p>

                <p className="text-sm text-gray-400 mt-2">Expected Graduation: 2027</p>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-700 my-4"></div>
              
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Eunoia Junior College
                </h4>
                <p className="text-accent-blue font-medium">Grades: AAA/A</p>
                <p className="text-sm text-gray-400 mt-2">Graduated in: 2021</p>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="card">
            <h3 className="text-2xl font-bold text-white mb-6">Leadership & Community</h3>
            
            <div className="space-y-6">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <activity.icon className="text-xl text-accent-blue mt-1" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {activity.title}
                    </h4>
                    <p className="text-accent-blue font-medium mb-2">
                      {activity.organization}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education; 