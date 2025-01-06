import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [userInfo, setUserInfo] = useState(null);

    // Fetch tasks and user info on component mount
    useEffect(() => {
        fetchTasks();
        fetchUserInfo();
    }, []);

    // Fetch all tasks
    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('/api/v1/tasks/alltask', { withCredentials: true });
            setTasks(data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Failed to load tasks');
        }
    };

    // Fetch user info
    const fetchUserInfo = async () => {
        try {
            const { data } = await axios.get('/api/v1/users/profile', { withCredentials: true });
            setUserInfo(data.user);  // data.user should be the user information
        } catch (error) {
            console.error('Error fetching user info:', error);
            toast.error('Failed to load user information');
        }
    };

    // Add a new task
    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/tasks/addtask', newTask, { withCredentials: true });
            toast.success(data.message || 'Task added successfully');
            fetchTasks(); // Refresh the task list
            setNewTask({ title: '', description: '' });
        } catch (error) {
            console.error('Error adding task:', error);
            toast.error('Failed to add task');
        }
    };

    // Update task completion status
    const handleToggleCompletion = async (id) => {
        try {
            const { data } = await axios.put(`/api/v1/tasks/update/${id}`, {}, { withCredentials: true });
            toast.success(data.message || 'Task status updated');
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Failed to update task');
        }
    };

    // Delete a task
    const handleDeleteTask = async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/tasks/delete/${id}`, { withCredentials: true });
            toast.success(data.message || 'Task deleted successfully');
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task');
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        try {
            await axios.get('/api/v1/users/logout', {}, { withCredentials: true });
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Failed to log out');
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
            <h1 className="text-4xl font-bold text-center py-6">Task Manager</h1>

            {/* User Info Section */}
            {userInfo ? (
                <div className="absolute top-4 right-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">{userInfo.username}</h3>
                    <button
                        onClick={handleLogout}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div>Loading user info...</div>
            )}

            <form onSubmit={handleAddTask} className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
                <input
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                    className="w-full p-3 mb-4 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    required
                    className="w-full p-3 mb-4 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Add Task
                </button>
            </form>

            <h2 className="text-2xl font-semibold text-center mb-4">Task List</h2>
            <ul className="space-y-4 max-w-2xl mx-auto">
                {tasks.map((task) => (
                    <li key={task._id} className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold">{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
                        <div className="mt-2">
                            <button
                                onClick={() => handleToggleCompletion(task._id)}
                                className="mr-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                            >
                                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task._id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <ToastContainer />
        </div>
    );
}

export default Home;
