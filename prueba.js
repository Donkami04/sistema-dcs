const data = [
    { id: 1, name: 'Manzana', category: 'Frutas' },
    { id: 2, name: 'Pera', category: 'Frutas' },
    { id: 3, name: 'Zanahoria', category: 'Verduras' },
    { id: 4, name: 'Plátano', category: 'Frutas' },
    { id: 5, name: 'Tomate', category: 'Verduras' },
  ];

  const keyword = 'tas';
  const filteredData = data.filter(obj =>
    Object.values(obj).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(keyword.toLowerCase())
    )
  );
  
  console.log(filteredData);
  
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    console.log(value);
  };