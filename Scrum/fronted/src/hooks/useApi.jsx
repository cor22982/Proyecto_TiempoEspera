import { useState } from 'react';

const useApi = (link) => {
  const [error, setError] = useState({});
  
  const llamado = async (body,metodo) => {
    const fetchOptions = {
      method: metodo,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(link, fetchOptions);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    setError(data);
  };

  const llamadowithheader = async (headers,body,metodo) => {
    const fetchOptions = {
      method: metodo,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(headers.map(header => [header.title, header.value]))
      }
    };
    const response = await fetch(link, fetchOptions);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    setError(data);
  };

  const llamadowithheaderwithoutbody = async (headers,metodo) => {
    const fetchOptions = {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(headers.map(header => [header.title, header.value]))
      }
    };
    const response = await fetch(link, fetchOptions);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    setError(data);
  };

  const llamadowithoutbody = async (metodo) => {
    const fetchOptions = {
      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(link, fetchOptions);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    setError(data);
  }

  return { error, llamado, llamadowithoutbody, llamadowithheader, llamadowithheaderwithoutbody,setError };
};

export default useApi;

