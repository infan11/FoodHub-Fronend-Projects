import React from 'react';
import { Link } from 'react-router-dom';

const AvailableItem = () => {
    return (
        <div data-aos="fade-up" className="px-4 sm:px-8 md:px-36">
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
            <Link to={"/biryani"}>
            <div>
              <img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/Hgq3rf9/biryani.png" 
                    alt="Biryani" 
                    
                />
                <p className='text-center font-extrabold -mt-3 text-red-500'>Biryani</p>
              </div>
            </Link>
               <Link to={"/pizza"}>
               <div>
                <img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/PFBV4qh/pizza.png" 
                    alt="Pizza" 
                />
                  <p className='text-center font-extrabold -mt-3 text-red-500'>Pizza</p>
                </div>
               </Link>
         <Link to={"/burger"}>
         <div>
               <img 
                    className="w-20 h-20 mt-6 mx-auto object-contain" 
                    src="https://i.ibb.co.com/yy1Jc6N/burger-removebg-preview.png" 
                    alt="Burger" 
                />
                  <p className='text-center font-extrabold mt-2 text-red-500'>Burger</p>
               </div>
         </Link>
        <Link to={"/chicken"}>
        <div>
              <img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/FJg7xmP/Chicken.png" 
                    alt="Chicken" 
                />
                  <p className='text-center font-extrabold -mt-3 text-red-500'>Chicken</p>
              </div>
        </Link>
           <Link to={"/chinese"}>
           <div>
              <img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/jLzCxbQ/Chinese.png" 
                    alt="Chinese" 
                />
                  <p className='text-center font-extrabold -mt-3 text-red-500'>Chinese</p>
              </div>
           </Link>
         <Link to={"/cake"}>
         <div>
             <img 
                    className="w-32 h-32  mx-auto object-contain" 
                    src="https://i.ibb.co.com/12qMjL0/Cake.png" 
                    alt="Cake" 
                />
                  <p className='text-center font-extrabold -mt-3 text-red-500'>Cake</p>
             </div>
         </Link>
              <Link to={"/beef"}>
              <div><img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/wMjCr5Q/beep.png" 
                    alt="Beef" 
                />
                  <p className='text-center font-extrabold -mt-3 text-red-500'>Beef</p>
                </div>
              </Link>
             <Link to={"/juice"}>
             <div>
              <img 
                    className="w-32 h-32 mx-auto object-contain" 
                    src="https://i.ibb.co.com/LRQjdvF/drinks.png" 
                    alt="Drinks" 
                />
                  <p className='text-center font-extrabold -mt-3 text-red-500'>Juice</p>
              </div>
             </Link>
            </div>
        </div>
    );
};

export default AvailableItem;
