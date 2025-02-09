'use client'

import React from "react";
import { CustomTable } from "ramailocustomtable";
// import "./customTableStyles.css"
// Define column structure with actions
const columns = [
  { 
    title: "Name", 
    dataIndex: "name", 
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  { 
    title: "Age", 
    dataIndex: "age", 
    key: "age",
    sorter: (a, b) => a.age - b.age
  },
  { 
    title: "Address", 
    dataIndex: "address", 
    key: "address",
    sorter: (a, b) => a.address.localeCompare(b.address)
  },
  { 
    title: "Actions", 
    key: "actions",
    render: (_, record) => (
      <div className="flex gap-2">
        <button 
          onClick={() => handleView(record)}
          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
        >
          View
        </button>
        <button 
          onClick={() => handleEdit(record)}
          className="px-3 py-1 text-sm text-yellow-600 hover:text-yellow-800 bg-yellow-100 hover:bg-yellow-200 rounded transition-colors"
        >
          Edit
        </button>
        <button 
          onClick={() => handleDelete(record)}
          className="px-3 py-1 text-sm text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 rounded transition-colors"
        >
          Delete
        </button>
      </div>
    )
  }
];

// Sample data
const data = [
  { key: "1", name: "John Doe", age: 32, address: "New York" },
  { key: "2", name: "Jane Smith", age: 28, address: "London" },
  { key: "3", name: "Sam Wilson", age: 40, address: "Paris" },
  { key: "4", name: "Emma Brown", age: 35, address: "Tokyo" },
  { key: "5", name: "Michael Chen", age: 45, address: "Singapore" }
];

// Action handlers
const handleView = (record) => {
  console.log("Viewing:", record);
  alert(`Viewing: ${record.name}`);
};

const handleEdit = (record) => {
  console.log("Editing:", record);
  alert(`Editing: ${record.name}`);
};

const handleDelete = (record) => {
  console.log("Deleting:", record);
  alert(`Deleting: ${record.name}`);
};

// Custom styles
const headerStyle = {
  backgroundColor: "#fce7f3 !important", // Light pink background
  color: "#be185d", // Dark pink text
  fontWeight: "600",
  padding: "12px 16px",
};

const rowStyle = (record, index) => ({
  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#f3f4f6",
  }
});

const paginationStyle = {
  ".ant-pagination":{
    marginRight:"1rem"
  },
  ".ant-pagination-item": {
    backgroundColor: "#dcfce7 !important", // Light green background
    borderColor: "#22c55e", // Green border
    color: "#15803d", // Dark green text
  },
  ".ant-pagination-item-active": {
    backgroundColor: "#22c55e", // Green background for active page
    borderColor: "#16a34a",
    color: "#ffffff",
  }
};

const customStyles = {
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden"
};

const StyledCustomTable = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Custom Styled Table Client side</h2>
      <CustomTable
        columns={columns}
        dataSource={data}
        headerStyle={headerStyle}
        rowStyle={rowStyle}
        paginationStyle={paginationStyle}
        customStyles={customStyles}
        pagination={{
          pageSize: 3,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        rowClassName={(record, index) => 
          `hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`
        }
      />
    </div>
  );
};

export default StyledCustomTable;