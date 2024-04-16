import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-[#F7F0F0] h-[703px] w-full flex justify-center items-center">
            <div className="text-center">
                <h2 className="pt-18 text-5xl font-semibold leading-16">
                    Welcome <br /> to <br /> ONLINE QUIZ APP <br />
                </h2>
                <div className="flex justify-center mt-8">
                    <ul className="flex gap-4">
                        <li>
                            <NavLink className="bg-blue-900 text-white py-2 px-4 rounded-lg" to="/admin">Admin</NavLink>
                        </li>
                        <li>
                            <NavLink className="bg-blue-900 text-white py-2 px-4 rounded-lg" to="/quiz-stepper">Take Quiz</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
