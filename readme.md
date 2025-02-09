# Custom Data Table Documentation

## Client-Side Implementation

### Overview
A customizable React table component that supports pagination, sorting, and CRUD operations. Built using the `ramailocustomtable` package with Tailwind CSS styling.

### Features
- Responsive data table with custom styling
- Client-side sorting for columns
- Pagination with configurable page size
- Action buttons for View/Edit/Delete operations
- Custom row and header styling
- Hover effects and transitions
- Alternating row colors

### Installation

```bash
npm install ramailocustomtable
```

### Usage

1. Import the component:
```jsx
import { CustomTable } from "ramailocustomtable";
```

2. Define your columns:
```jsx
const columns = [
  { 
    title: "Name", 
    dataIndex: "name", 
    key: "name",
    sorter: true
  },
  // ... additional columns
];
```

3. Implement the table:
```jsx
<CustomTable
  columns={columns}
  dataSource={data}
  pagination={{
    pageSize: 3,
    showSizeChanger: true,
    showTotal: (total) => `Total ${total} items`,
  }}
  // ... additional props
/>
```

### Styling

The component supports several styling options:

1. Header Styling:
```javascript
const headerStyle = {
  backgroundColor: "#fce7f3 !important",
  color: "#be185d",
  fontWeight: "600",
  padding: "12px 16px",
};
```

2. Row Styling:
```javascript
const rowStyle = (record, index) => ({
  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
  transition: "background-color 0.3s",
});
```

3. Pagination Styling:
```javascript
const paginationStyle = {
  ".ant-pagination-item": {
    backgroundColor: "#dcfce7 !important",
    borderColor: "#22c55e",
    color: "#15803d",
  }
  // ... additional pagination styles
};
```

## Server-Side Implementation

### Overview
The server-side implementation includes API integration with pagination support, using the dummyJSON API as an example.

### Features
- Server-side pagination
- Data fetching with error handling
- Dynamic page size adjustment
- Loading state management
- Total items tracking

### API Integration

1. Fetch Function:
```javascript
const fetchTableData = async (page, pageSize) => {
  const skip = (page - 1) * pageSize;
  try {
    const response = await fetch(`https://dummyjson.com/users?limit=${pageSize}&skip=${skip}`);
    const data = await response.json();
    return {
      data: data.users.map(user => ({
        // ... data transformation
      })),
      total: data.total
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
```

### State Management

```javascript
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);
const [totalItems, setTotalItems] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(5);
```

### Data Fetching Implementation

```javascript
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
```

### Best Practices

1. Error Handling
- Implement proper error handling for API calls
- Show user-friendly error messages
- Log errors for debugging

2. Loading States
- Display loading indicators during data fetching
- Disable actions while loading
- Maintain UI responsiveness

3. Data Transformation
- Transform API data to match table requirements
- Handle missing or null values
- Format dates and special fields

4. Performance
- Implement proper pagination
- Use appropriate page sizes
- Cache results when possible
- Implement debouncing for search/filter operations

### Security Considerations

1. Input Validation
- Validate page numbers and sizes
- Sanitize search inputs
- Implement proper CORS headers

2. Authentication
- Implement proper authentication for protected routes
- Include authentication headers in requests
- Handle session expiration

3. Data Protection
- Implement proper data access controls
- Sanitize sensitive information
- Follow data protection regulations