import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  const updateData = async (id, updatedData) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${url}/${id}`, updatedData);
      setData(data.map((item) => (item.id === id ? response.data : item)));
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const createData = async (newData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, newData);
      setData([...data, response.data]);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const deleteData = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${url}/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return { data, isLoading, error, updateData, createData, deleteData };
};

export default useApi;
