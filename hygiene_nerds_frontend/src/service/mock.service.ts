import { LoginDto } from "../types/Auth.dto";

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  brandName: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

const mockProducts: ProductDto[] = [
  {
    id: 1,
    name: "Laptop X1",
    description: "High-performance laptop for professionals.",
    brandName: "BrandA",
    price: 1200,
    imageUrl: "laptop_x1.jpg",
    category: "Electronics",
    stock: 10,
  },
  {
    id: 2,
    name: "Smartphone Y2",
    description: "Latest smartphone with advanced camera.",
    brandName: "BrandB",
    price: 800,
    imageUrl: "smartphone_y2.jpg",
    category: "Electronics",
    stock: 20,
  },
  {
    id: 3,
    name: "T-Shirt Z3",
    description: "Comfortable cotton t-shirt.",
    brandName: "BrandC",
    price: 30,
    imageUrl: "tshirt_z3.jpg",
    category: "Clothing",
    stock: 50,
  },
  {
    id: 4,
    name: "Book A4",
    description: "A thrilling novel.",
    brandName: "BrandD",
    price: 25,
    imageUrl: "book_a4.jpg",
    category: "Books",
    stock: 30,
  },
  {
    id: 5,
    name: "Headphones Pro",
    description: "Noise cancelling headphones",
    brandName: "BrandE",
    price: 150,
    imageUrl: "headphones_pro.jpg",
    category: "Electronics",
    stock: 15,
  },
  {
    id: 6,
    name: "Running Shoes",
    description: "Lightweight running shoes for athletes.",
    brandName: "BrandF",
    price: 90,
    imageUrl: "running_shoes.jpg",
    category: "Sports",
    stock: 40,
  },
  {
    id: 7,
    name: "Coffee Maker",
    description: "Automatic coffee maker with timer.",
    brandName: "BrandG",
    price: 75,
    imageUrl: "coffee_maker.jpg",
    category: "Appliances",
    stock: 25,
  },
  {
    id: 8,
    name: "Desk Chair",
    description: "Ergonomic desk chair for office use.",
    brandName: "BrandH",
    price: 180,
    imageUrl: "desk_chair.jpg",
    category: "Furniture",
    stock: 12,
  },
  {
    id: 9,
    name: "Garden Tools Set",
    description: "Complete set of garden tools.",
    brandName: "BrandI",
    price: 60,
    imageUrl: "garden_tools.jpg",
    category: "Garden",
    stock: 35,
  },
  {
    id: 10,
    name: "Puzzle 1000 Pieces",
    description: "Challenging 1000-piece puzzle.",
    brandName: "BrandJ",
    price: 20,
    imageUrl: "puzzle.jpg",
    category: "Toys",
    stock: 60,
  },
  {
    id: 11,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse.",
    brandName: "BrandK",
    price: 40,
    imageUrl: "wireless_mouse.jpg",
    category: "Electronics",
    stock: 22,
  },
  {
    id: 12,
    name: "Denim Jeans",
    description: "Classic denim jeans.",
    brandName: "BrandL",
    price: 55,
    imageUrl: "denim_jeans.jpg",
    category: "Clothing",
    stock: 45,
  },
  {
    id: 13,
    name: "Cookbook",
    description: "Delicious recipes from around the world.",
    brandName: "BrandM",
    price: 35,
    imageUrl: "cookbook.jpg",
    category: "Books",
    stock: 28,
  },
  {
    id: 14,
    name: "Yoga Mat",
    description: "Non-slip yoga mat for exercise.",
    brandName: "BrandN",
    price: 30,
    imageUrl: "yoga_mat.jpg",
    category: "Sports",
    stock: 55,
  },
  {
    id: 15,
    name: "Blender",
    description: "High-speed blender for smoothies.",
    brandName: "BrandO",
    price: 85,
    imageUrl: "blender.jpg",
    category: "Appliances",
    stock: 18,
  },
  {
    id: 16,
    name: "Dining Table",
    description: "Modern dining table for family meals.",
    brandName: "BrandP",
    price: 250,
    imageUrl: "dining_table.jpg",
    category: "Furniture",
    stock: 8,
  },
  {
    id: 17,
    name: "Shovel",
    description: "Durable shovel for gardening.",
    brandName: "BrandQ",
    price: 22,
    imageUrl: "shovel.jpg",
    category: "Garden",
    stock: 42,
  },
  {
    id: 18,
    name: "Board Game",
    description: "Fun board game for family nights.",
    brandName: "BrandR",
    price: 28,
    imageUrl: "board_game.jpg",
    category: "Toys",
    stock: 38,
  },
  {
    id: 19,
    name: "Keyboard",
    description: "Mechanical Keyboard for gaming.",
    brandName: "BrandS",
    price: 100,
    imageUrl: "keyboard.jpg",
    category: "Electronics",
    stock: 13,
  },
  {
    id: 20,
    name: "Winter Jacket",
    description: "Warm winter jacket for cold weather.",
    brandName: "BrandT",
    price: 120,
    imageUrl: "winter_jacket.jpg",
    category: "Clothing",
    stock: 33,
  },
];

export const mockfetchProducts = async (): Promise<{ data: ProductDto[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockProducts });
    }, 500); // Simulate network latency
  });
};

const accounts = [
  {
    id: 1,
    email: "admin@example.com",
    password: "admin123",
    role: "USER_ADMIN",
  },
  {
    id: 2,
    email: "user@example.com",
    password: "user123",
    role: "USER_CUSTOMER",
  },
];

// src/types/Auth.dto.ts
export interface LoginDto {
  username: string;
  password: string;
}

// Mock login API call
function mockLogin(username, password) {
  const user = accounts.find(
    (acc) => acc.email === username && acc.password === password,
  );

  if (user) {
    return { status: 200, message: "OK", role: user.role };
  }

  return { status: 401, message: "INVALID_CREDENTIALS" };
}
