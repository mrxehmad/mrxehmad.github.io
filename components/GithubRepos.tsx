import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '@helpers/animation';

interface Repo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
}

const GithubRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/mrxehmad/repos?sort=created&direction=desc&per_page=26');
        const data = await response.json();
        setRepos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return <div className="text-center">Loading repositories...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo, index) => (
        <motion.div
          key={repo.name}
          initial="hidden"
          animate="visible"
          variants={slideUp}
          custom={index * 0.1}
          className="bg-white dark:bg-dark-gray p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {repo.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {repo.description || 'No description available'}
            </p>
            <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                {repo.stargazers_count}
              </span>
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                {repo.forks_count}
              </span>
            </div>
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default GithubRepos; 