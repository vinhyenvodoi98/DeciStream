import { Spinner } from "../Icon";

interface LoadingProps {
  isVisible: boolean;
  title?: string;
}

const Loading: React.FC<LoadingProps> = ({ isVisible, title }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-4 w-60 h-48 grid grid-rows-4 grid-flow-col gap-4">
        <div className="flex justify-between items-center mb-4 row-span-1">
          <h3 className="text-lg font-semibold">{title || 'Processing'}</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => console.log("close")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 8.586L13.293 5.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-center items-center row-span-2">
          <Spinner />
        </div>
        <div className="flex justify-center items-center row-span-1">
          Please wait for a second !
        </div>
      </div>
    </div>
  );
};

export default Loading;
