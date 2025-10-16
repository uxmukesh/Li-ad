import { MdConstruction, MdSchedule } from "react-icons/md";

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-4">
            <MdConstruction className="text-primary-600 text-3xl" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-300 mb-4">Coming Soon</h2>
        <p className="text-gray-500 text-lg mb-6">
          This category is currently under development. We're working hard to
          bring you amazing new features!
        </p>
        <div className="flex items-center justify-center text-sm text-gray-400">
          <MdSchedule className="text-sm mr-2" />
          Stay tuned for updates
        </div>
      </div>
    </div>
  );
}
