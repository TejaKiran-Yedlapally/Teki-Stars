import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';
import ErrorPage from './ErrorPage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

const Home = () => {
  const [url, setUrl] = useState('');
  const [courseName, setCourseName] = useState('');
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const APIKEY = import.meta.env.VITE_YT_API_KEY;

  const extractId = () => {
    const regex = /[?&]list=([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const stored = localStorage.getItem("pathfound_courses");
    if (stored) {
      setCourses(JSON.parse(stored));
    }
  }, []);


  const createCourse = async () => {
    const id = extractId();
    try {
      if (id !== null) {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${APIKEY}`
        );

        const playList = response.data.items.map((video) => ({
          videoId: video.snippet.resourceId.videoId,
          title: video.snippet.title,
          description: video.snippet.description,
          complete: false,
        }));

        setCourses((prev) => {
          const updated = [...prev, { courseName: courseName.trim(), playList }];
          localStorage.setItem("pathfound_courses", JSON.stringify(updated));
          return updated;
        });

        setShowCreateCourse(false);
        setCourseName('');
        setUrl('');
      } else {
        throw new Error('Invalid Playlist URL');
      }
    } catch (error) {
      alert('Enter a correct Playlist URL');
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 w-full h-full bg-gradient-to-tr from-teal-100 via-blue-100 to-purple-100" />

      <div className="w-screen h-auto p-10 flex justify-center">
        <div className="w-11/12 max-w-screen-xl mt-11 h-auto">
          {/* Header */}
          <div className="w-full flex justify-between items-center">
            <div>
              <Text as="h1" className="text-4xl font-bold text-gray-800" text="Learning Dashboard" />
              <Text as="p" className="mt-2 text-gray-600" text="Track your progress and earn rewards" />
            </div>
            <Button
              onClick={() => setShowCreateCourse(!showCreateCourse)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition-all"
              name={showCreateCourse ? 'Close Form' : 'Create Course'}
            />
          </div>

          {/* Course Form */}
          {showCreateCourse && (
            <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <Text as="h2" className="text-2xl font-semibold mb-2 text-gray-800" text="Create a New Course" />
              <Text as="p" className="mb-6 text-gray-600" text="Enter a YouTube playlist URL to create a course" />

              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex flex-col w-full md:w-2/3">
                  <Text as="span" text="YouTube Playlist URL" />
                  <Input
                    value={url}
                    placeHolder="https://youtube.com/playlist?list=..."
                    onChange={(e) => setUrl(e.target.value)}
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/3">
                  <Text as="span" text="Course Name" />
                  <Input
                    value={courseName}
                    placeHolder="Course Name"
                    onChange={(e) => setCourseName(e.target.value)}
                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={createCourse}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                  name="Create"
                />
                <Button
                  onClick={() => setShowCreateCourse(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  name="Cancel"
                />
              </div>
            </div>
          )}

          {/* Course Listing */}
          <div className="mt-14">
            <Text as="h2" className="text-3xl font-semibold text-gray-800 mb-6" text="Your Courses" />
            <div className="flex flex-wrap gap-6">
              {courses.length > 0 ? (
                courses.map((values, index) => (
                  <CourseCard key={index} title={values.courseName} playList={values.playList} />
                ))
              ) : (
                <ErrorPage text="No Courses" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
