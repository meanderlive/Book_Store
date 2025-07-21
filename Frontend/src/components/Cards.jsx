// import React from "react";

// function Cards({ item, img }) {
//   return (
//     <>
//       <div className="mt-4 my-3 p-3">
//         <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
//           <figure>

//             <img src={img ? img : item.image} alt="Shoes"  style={{width: '100%', height: 300, objectFit: 'cover'}}/>


//           </figure>
//           <div className="card-body">
//             <h2 className="card-title">
//               {item.name}
//               <div className="badge badge-secondary">{item.category}</div>
//             </h2>
//             <p>{item.title}</p>
//             <div className="card-actions justify-between">
//               <div className="badge badge-outline">${item.price}</div>
//               <div className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
//                 Buy Now
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cards;



import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/buy/${item.isbn13}`, { state: { book: item } });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
      <p className="text-sm text-gray-600 mb-4">{item.subtitle}</p>
      <p className="text-pink-600 font-bold mb-2">{item.price}</p>
      <button
        onClick={handleBuyNow}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded transition duration-300"
      >
        Buy Now
      </button>
    </div>
  );
}

export default Cards;

