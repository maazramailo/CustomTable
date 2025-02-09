'use client'

import React, { useState, useEffect } from "react";
import { CustomTable } from "ramailocustomtable";

// API function to fetch data from dummyJSON
const fetchTableData = async (page, pageSize) => {
  const skip = (page - 1) * pageSize;
  try {
    const response = await fetch(`https://dummyjson.com/users?limit=${pageSize}&skip=${skip}`);
    const data = await response.json();
    return {
      data: data.users.map(user => ({
        key: user.id,
        name: `${user.firstName} ${user.lastName}`,
        age: user.age,
        address: `${user.address.city}, ${user.address.state}`,
        email: user.email,
        company: user.company.name
      })),
      total: data.total
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

const columns = [
  { 
    title: "Name", 
    dataIndex: "name", 
    key: "name",
    sorter: true
  },
  { 
    title: "Age", 
    dataIndex: "age", 
    key: "age",
    sorter: true
  },
  { 
    title: "Address", 
    dataIndex: "address", 
    key: "address",
    sorter: true
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company"
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
  backgroundColor: "#fce7f3 !important",
  color: "#be185d",
  fontWeight: "600",
  padding: "12px 16px",
};

const rowStyle = (record, index) => ({
  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
  transition: "background-color 0.3s",
});

const paginationStyle = {
  ".ant-pagination": {
    marginRight: "1rem"
  },
  ".ant-pagination-item": {
    backgroundColor: "#dcfce7 !important",
    borderColor: "#22c55e",
    color: "#15803d",
  },
  ".ant-pagination-item-active": {
    backgroundColor: "#22c55e !important",
    borderColor: "#16a34a",
    color: "#ffffff",
  }
};

const customStyles = {
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden"
};

const DummyAPITable = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const fetchData = async (page, size) => {
    setLoading(true);
    try {
      const response = await fetchTableData(page, size);
      setData(response.data);
      setTotalItems(response.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">User Data Table</h2>
      <CustomTable
        columns={columns}
        dataSource={data}
        loading={loading}
        headerStyle={headerStyle}
        rowStyle={rowStyle}
        paginationStyle={paginationStyle}
        customStyles={customStyles}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
          onChange: handlePageChange,
        }}
        rowClassName={(record, index) => 
          `hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`
        }
      />
    </div>
  );
};

export default DummyAPITable;