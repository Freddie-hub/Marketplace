export interface Product {
    id: number;
    name: string;
    grade: 'A' | 'B' | 'C';
    price: number;
    variety: string;
    image: string;
    description: string;
    currentStock: number;
    farmer: {
      Fname: string;
      Lname: string;
    };
    warehouse: {
      name: string;
      location: string;
    };
  }
  
  export const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Arabica Coffee Beans',
      grade: 'A',
      price: 15.50,
      variety: 'Bourbon',
      image: '/images/Coffee.jpg',
      description: 'High-quality Arabica beans with notes of chocolate and citrus. Grown at high altitude for a rich, complex flavor. Perfect for espresso and drip coffee.',
      currentStock: 150, 
      farmer: {
        Fname: 'John',
        Lname: 'Doe',
      },
      warehouse: {
        name: 'Nairobi Central Warehouse',
        location: 'Nairobi, Kenya',
      },
    },
    {
      id: 2,
      name: 'Robusta Coffee Beans',
      grade: 'B',
      price: 9.75,
      variety: 'Nganda',
      image: '/images/Coffee.jpg',
      description: 'Bold and strong Robusta beans with a classic, powerful coffee flavor. Ideal for blends that require a caffeine kick and a rich crema.',
      currentStock: 320,
      farmer: {
        Fname: 'Jane',
        Lname: 'Smith',
      },
      warehouse: {
        name: 'Mombasa Port Storage',
        location: 'Mombasa, Kenya',
      },
    },
    {
      id: 3,
      name: 'Peaberry Coffee Beans',
      grade: 'A',
      price: 22.00,
      variety: 'SL28',
      image: '/images/Coffee.jpg',
      description: 'A rare and prized mutation where only one bean develops inside the coffee cherry, resulting in a brighter, more vibrant flavor profile.',
      currentStock: 85,
      farmer: {
        Fname: 'Peter',
        Lname: 'Jones',
      },
      warehouse: {
        name: 'Nyeri Hills Co-op',
        location: 'Nyeri, Kenya',
      },
    },
    {
        id: 4,
        name: 'Peaberry Coffee Beans',
        grade: 'A',
        price: 22.00,
        variety: 'SL28',
        image: '/images/Coffee.jpg',
        description: 'A rare and prized mutation where only one bean develops inside the coffee cherry, resulting in a brighter, more vibrant flavor profile.',
        currentStock: 85,
        farmer: {
          Fname: 'Peter',
          Lname: 'Jones',
        },
        warehouse: {
          name: 'Nyeri Hills Co-op',
          location: 'Nyeri, Kenya',
        },
      },
      {
        id: 5,
        name: 'Peaberry Coffee Beans',
        grade: 'A',
        price: 22.00,
        variety: 'SL28',
        image: '/images/Coffee.jpg',
        description: 'A rare and prized mutation where only one bean develops inside the coffee cherry, resulting in a brighter, more vibrant flavor profile.',
        currentStock: 85,
        farmer: {
          Fname: 'Peter',
          Lname: 'Jones',
        },
        warehouse: {
          name: 'Nyeri Hills Co-op',
          location: 'Nyeri, Kenya',
        },
      },
  ];