import React from 'react';
import { Link } from 'react-router-dom';

const AvailableItem = () => {
    return (
        <div className="px-4 sm:px-8 md:px-36">
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
            <Link to={"/Biryani"}>
            <div>
              <img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/Hgq3rf9/biryani.png" 
                    alt="Biryani" 
                    
                />
                <p className='text-center font-extrabold -mt-3'>Biryani</p>
              </div>
            </Link>
               <Link to={"Pizza"}>
               <div>
                <img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/PFBV4qh/pizza.png" 
                    alt="Pizza" 
                />
                  <p className='text-center font-extrabold -mt-3'>Pizza</p>
                </div>
               </Link>
         <Link to={"/Burger"}>
         <div>
               <img 
                    className="w-20 h-20 mt-6 mx-auto object-contain" 
                    src="https://i.ibb.co.com/yy1Jc6N/burger-removebg-preview.png" 
                    alt="Burger" 
                />
                  <p className='text-center font-extrabold mt-2'>Burger</p>
               </div>
         </Link>
        <Link to={"/Chicken"}>
        <div>
              <img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/FJg7xmP/Chicken.png" 
                    alt="Chicken" 
                />
                  <p className='text-center font-extrabold -mt-3'>Chicken</p>
              </div>
        </Link>
           <Link to={"/Chinese"}>
           <div>
              <img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/jLzCxbQ/Chinese.png" 
                    alt="Chinese" 
                />
                  <p className='text-center font-extrabold -mt-3'>Chinese</p>
              </div>
           </Link>
         <Link to={"/Cake"}>
         <div>
             <img 
                    className="w-32 h-32  mx-auto object-contain" 
                    src="https://i.ibb.co.com/12qMjL0/Cake.png" 
                    alt="Cake" 
                />
                  <p className='text-center font-extrabold -mt-3'>Cake</p>
             </div>
         </Link>
              <Link to={"/Beef"}>
              <div><img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/wMjCr5Q/beep.png" 
                    alt="Beef" 
                />
                  <p className='text-center font-extrabold -mt-3'>Beef</p>
                </div>
              </Link>
             <Link to={"/Juice"}>
             <div>
              <img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/LRQjdvF/drinks.png" 
                    alt="Drinks" 
                />
                  <p className='text-center font-extrabold -mt-3'>Juice</p>
              </div>
             </Link>
            </div>
        </div>
    );
};

export default AvailableItem;
