import React, { useState, useEffect } from "react";
import moment from "moment";

export default function MyApp() {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      setIntervalId(id);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setIsPaused(true);
  };

  const openModal = () => {
    setIsOpen(true);
    pauseTimer();
  };
  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleSaveTask = () => {
    setIsOpen(false);
    const task = {
      title,
      description,
      timeTracked: moment.utc(timer * 1000).format("HH:mm:ss"),
    };
    setTasks((tasks) => [...tasks, task]);
    setTitle("");
    setDescription("");
    setTimer(0);
    setIsRunning(false);
  };

  return (
    <section className="container m-auto flex justify-center flex-col bg-gray-100  ">
      <header className="flex items-center bg-gray-900 text-white p-4 top-0 fixed w-full uppercase justify-center">
        <label className="text-3xl">Time-Tracking Application</label>
      </header>
      <div
        style={{ top: "20%" }}
        className=" fixed flex flex-row m-auto items-center w-full justify-center gap-20"
      >
        <div className="flex flex-col items-center justify-center w-1/2  ">
          <h1 className="text-3xl font-bold mb-2">Timer Section</h1>
          <div className="text-2xl font-medium mb-2">
            {moment.utc(timer * 1000).format("HH:mm:ss")}
          </div>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded ${
                isRunning && "opacity-50 cursor-not-allowed"
              }`}
              disabled={isRunning}
              onClick={startTimer}
            >
              Start
            </button>
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded ${
                !isRunning && !isPaused && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isRunning || isPaused}
              onClick={pauseTimer}
            >
              Pause
            </button>
            <button
              data-modal-target="popup-modal"
              data-modal-toggle="popup-modal"
              className={`px-4 py-2 bg-blue-500 text-white rounded ${
                !isPaused && "opacity-50 cursor-not-allowed"
              }`}
              disabled={isRunning || !isPaused}
              onClick={openModal}
            >
              Save
            </button>

            {isOpen && (
              <>
                <div className="justify-center   items-center flex overflow-x-hidden overflow-y-auto fixed inset-0  z-100 outline-none focus:outline-none">
                  <div className="relative w-auto bg-white z-50 rounded-3xl  my-6 mx-auto max-w-sm">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 ">
                        <h3 className="text-xl text-center font-semibold">
                          Enter your Task
                        </h3>
                        <button
                          className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={closeModal}
                        >
                          <span className="bg-transparent cursor-pointer text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      <div className="relative p-6 flex-auto">
                        <form
                          onSubmit={handleSaveTask}
                          className="bg-white flex items-start justify-center flex-col gap-2"
                        >
                          <div className="flex items-center justify-center gap-2 flex-row">
                            <label className="w-28">Title</label>

                            <input
                              type="text"
                              id="title"
                              required
                              onChange={(e) => setTitle(e.target.value)}
                              className="bg-white text-center p-2 text-black w-full border border-red-800"
                              placeholder="Enter the title "
                            />
                          </div>
                          <div className="flex items-center justify-center gap-2 flex-row">
                            <label>Description</label>
                            <input
                              type="text"
                              required
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Enter the Description "
                              className="bg-white text-center text-black h-20 w-full border border-red-800"
                            />
                          </div>
                          <div className="flex items-center ml-20 justify-center gap-2 flex-row">
                            <button
                              onClick={closeModal}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
              </>
            )}
          </div>
        </div>
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
              {tasks.map((task, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center ">
                    {task.title}
                  </td>
                  <td className="text-center px-6 py-4">{task.description}</td>
                  <td className="text-center px-6 py-4">{`${task.timeTracked}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="flex justify-center m-auto w-full bg-black p-4 bottom-0 fixed ">
        <label className="text-white font-bold">This App is Developed By  @pramodgunjal </label>
      </footer>
    </section>
  );
}
