import React from 'react';

interface ResultCardProps {
  title: string;
  content: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, content }) => {
  // Function to format the content
  const formatContent = (text: string) => {
    // Split the text into sections
    const sections = text.split('\n\n');
    
    return sections.map((section, index) => {
      // Check if the section is a header (starts with **)
      if (section.startsWith('**')) {
        return (
          <h3 key={index} className="text-xl font-bold text-blue-600 mb-2">
            {section.replace(/\*\*/g, '')}
          </h3>
        );
      }
      
      // Check if the section is a list item (starts with *)
      if (section.startsWith('*')) {
        const items = section.split('\n').filter(item => item.trim().startsWith('*'));
        return (
          <ul key={index} className="list-disc pl-6 mb-4">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700 mb-2">
                {item.replace(/^\*\s*/, '')}
              </li>
            ))}
          </ul>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 mb-4">
          {section}
        </p>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto my-8 transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{title}</h2>
      <div className="prose prose-lg">
        {formatContent(content)}
      </div>
    </div>
  );
};

export default ResultCard; 