import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const items = [
    { name: "Biryani", path: "/biryani", img: "https://i.ibb.co/Hgq3rf9/biryani.png" },
    { name: "Pizza", path: "/pizza", img: "https://i.ibb.co/PFBV4qh/pizza.png" },
    { name: "Burger", path: "/burger", img: "https://i.ibb.co/yy1Jc6N/burger-removebg-preview.png" },
    { name: "Chicken", path: "/chicken", img: "https://i.ibb.co/FJg7xmP/Chicken.png" },
    { name: "Chinese", path: "/chinese", img: "https://i.ibb.co/jLzCxbQ/Chinese.png" },
    { name: "Cake", path: "/cake", img: "https://i.ibb.co/12qMjL0/Cake.png" },
    { name: "Beef", path: "/beef", img: "https://i.ibb.co/wMjCr5Q/beep.png" },
    { name: "Juice", path: "/juice", img: "https://i.ibb.co/LRQjdvF/drinks.png" },
];

const AvailableItem = () => {
    return (
        <div data-aos="fade-up" className="px-4 sm:px-8 md:px-36">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {items.map((item, index) => (
                    <Link to={item.path} key={index}>
                        <motion.div 
                            className="flex flex-col items-center"
                            whileHover={{ scale: 1.1 }} 
                            transition={{ duration: 0.3 }}
                        >
                            <img 
                                className="w-28 h-28 object-contain"
                                src={item.img} 
                                alt={item.name} 
                            />
                           
                        </motion.div>
                        <p className="text-center font-Caveat font-extrabold  text-red-500">{item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AvailableItem;
