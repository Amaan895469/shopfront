import React from "react";

const CreateCustomer = ({ name, setName, handleCreateCustomer }) => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <p className="text-[2vw] font-semibold text-zinc-200">Place Order:</p>
      <input
        type="text"
        placeholder="Enter Customer name"
        className="text-[1.5vw] font-semibold text-black bg-zinc-200 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-100"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleCreateCustomer}
        className="text-[1.5vw] font-semibold text-white bg-zinc-700 py-2 px-6 rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
      >
        Start Ordering
      </button>
    </div>
  );
};

export default CreateCustomer;
