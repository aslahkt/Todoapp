import React from "react";

const Todoitems = ({
  id,
  text,
  isComplete,
  date,
  deleteTodo,
  toggle,
  editTodo,
  description,
}) => {


  return (
    <div className="flex items-center justify-between my-2 p-2 bg-black   bg w-[50%] ">
      <div className="flex items-center ]">

        
        
        <input
          type="checkbox"
          checked={isComplete}
          onChange={() => toggle(id)}
          className="mr-2"
        />


        <div className={isComplete ? "line-through" : ""} >
          <p className="bg-500 px-8 py-1 rounded-2xl w-[150px] break-all hyphens-auto text-left content-center text-white ">{text}</p>{" "}
        </div>

       
        

          <span className="w-[150px] break-all content-center text-white"> &nbsp; {description}</span>
          <span className="     ml-5 pl-[0px] rounded-2xl w-[100px]  text-left content-center text-white">  {date}</span>
        
      </div>


      <div className="flex">

    
        <button
          onClick={() => editTodo(id)}
          className="bg-white m-1 p-2 rounded-xl"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTodo(id)}
          className="bg-red-500 m-1  p-2 rounded-xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todoitems;
