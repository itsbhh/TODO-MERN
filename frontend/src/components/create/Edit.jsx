import React from "react";

const Edit = ({ display }) => {
  return (
    <>
     <div className="update d-flex
                justify-content-center">
      <div
        className=" p-5 d-flex
                justify-content-center
                align-items-start flex-column updates"
      >
          <h3>Edit & Update Your Task</h3>
          <input type="text" className="my-2 p-2 todo-inputs" />
          <textarea className="p-2 todo-inputs" />
         <div className="w-100 
                align-items-start ">
         <button className="btn-update p-2 my-3">Update</button>
         <button className="btn-update p-2 my-3 mx-5 close"onClick={() => display("none")}>Close</button>
         </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
