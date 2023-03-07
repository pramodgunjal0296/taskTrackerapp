import React from "react";

const TaskSection = ({ task }) => {
  return (
    <div className="flex items-center justify-center flex-col w-1/2 border border-gray-200 mr-20">
      <h1 className="text-3xl font-bold mb-2">Tasks Section</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-3xl">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-center">Title</th>
            <th className="px-6 py-3 text-center">Description</th>
            <th className="px-6 py-3 text-center">Time Tracked</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center ">
              {task.title}
            </td>
            <td className="text-center px-6 py-4">{task.description}</td>
            <td className="text-center px-6 py-4">{`${task.timeTracked}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaskSection;
