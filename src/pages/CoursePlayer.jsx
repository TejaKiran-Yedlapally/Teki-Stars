import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CoursePlayer = () => {
  const [currentVideo, setCurrentVideo] = useState('');
  const [description, setDescription] = useState('');
  const [completedVideos, setCompletedVideos] = useState({});
  const [expanded, setExpanded] = useState(false);

  const location = useLocation();
  const { state } = location;
  const { playList = [], title = '' } = state || {};
  const navigate = useNavigate();

  const onClick = (videoId, videoDescription) => {
    setCurrentVideo(videoId);
    setDescription(videoDescription);
  };

  const toggleCompleted = (videoId) => {
    setCompletedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar */}
      <aside className="w-2/5 bg-white shadow-lg overflow-y-auto p-6 border-r border-blue-200">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">{title}</h1>
        <div className="space-y-4">
          {playList.map((video, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg shadow hover:shadow-md transition-all cursor-pointer ${completedVideos[video.videoId]
                ? 'bg-green-100 border border-green-400'
                : 'bg-white'
                }`}
              onClick={() => onClick(video.videoId, video.description)}
            >
              <div className="flex items-center gap-4">
                <lord-icon
                  src="https://cdn.lordicon.com/rfoqztsr.json"
                  trigger="hover"
                  style={{ width: '40px', height: '40px' }}
                ></lord-icon>
                <div>
                  <h4 className="text-base font-semibold text-gray-800">{video.title}</h4>
                </div>
              </div>
              <button onClick={(e) => {
                e.stopPropagation();
                toggleCompleted(video.videoId);
              }}>
                {completedVideos[video.videoId] ? (
                  <lord-icon
                    src="https://cdn.lordicon.com/aupkjxuw.json"
                    trigger="in"
                    delay="100"
                    state="in-check"
                    colors="primary:#16c72e"
                    style={{ height: '24px', width: '24px' }}
                  ></lord-icon>
                ) : (
                  <lord-icon
                    src="https://cdn.lordicon.com/aupkjxuw.json"
                    trigger="hover"
                    style={{ height: '24px', width: '24px' }}
                  ></lord-icon>
                )}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 z-50 bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          ← Back To Home
        </button>
      </aside>

      {/* Main Content */}
      <div className="w-3/5 p-8">
        {currentVideo ? (
          <div className="flex flex-col gap-6 h-full">
            <div className="relative pb-[56.25%] h-0 rounded-xl shadow-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideo}?rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-inner overflow-y-auto max-h-48">
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {expanded
                  ? description
                  : description.length > 300
                    ? description.slice(0, 300) + '...'
                    : description}
              </p>
              {description.length > 300 && (
                <button
                  onClick={toggleExpanded}
                  className="mt-2 text-blue-600 hover:underline text-sm"
                >
                  {expanded ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-lg">Select a video to play</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;
