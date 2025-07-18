import Text from "./Text";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CourseCard = ({ title, playList }) => {
  const navigate = useNavigate();

  // Use the first video's ID to show a thumbnail
  const thumbnailId = playList?.[0]?.videoId;

  useEffect(() => {
    console.log(playList);
  }, [playList]);

  return (
    <div className="w-[336px] h-[420px] bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-200 ease-in-out border border-gray-100">
      <div className="h-[60%] w-full flex flex-col justify-center items-center p-4">
        {thumbnailId ? (
          <img
            src={`https://img.youtube.com/vi/${thumbnailId}/hqdefault.jpg`}
            alt="Course thumbnail"
            className="w-full h-[180px] object-cover rounded-lg shadow-md"
          />
        ) : (
          <div className="w-full h-[180px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            No thumbnail
          </div>
        )}
        <Text className="mt-3 font-semibold text-lg text-gray-800 text-center" as="h4" text={title} />
        <Text className="mt-1 text-sm text-gray-500 text-center" text="Explore this course to start learning" as="p" />
      </div>

      <div className="h-[40%] w-full flex flex-col justify-start items-center gap-3 px-4 py-3">
        <Text
          as="p"
          className="w-full text-sm text-gray-600"
          text={`Progress: 0%`} // You can update with real progress later
        />

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `0%` }} />
        </div>

        <div className="w-full flex justify-between items-center mt-2">
          <Text
            className="text-sm text-gray-700"
            as="p"
            text={`${playList.length} videos`}
          />
          <Button
            onClick={() =>
              navigate("/course", {
                state: { playList: playList, title: title },
              })
            }
            className="w-[90px] h-[34px] bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
            name="Continue"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
