import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <section className="flex flex-col justify-center items-center">
            <h2 className="mt-5 text-4xl mb-6">Welcome to Admin Page</h2>
            <hr />
            <hr />
            <div className="flex flex-col justify-start align-middle">
                <Link to="/create-quiz" className="text-xl text-blue-500 mb-5 hover:underline">
                    Create a New Quiz
                </Link>
                <Link to="/all-quizzes" className="text-xl text-blue-500 hover:underline">
                    Manage existing Quizzes
                </Link>
            </div>
        </section>
    );
};

export default Admin;
