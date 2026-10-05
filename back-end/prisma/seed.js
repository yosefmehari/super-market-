const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const sampleProducts = [
  // Electronics
  {
    name: "Ultra Wireless Noise-Cancelling Headphones",
    description: "Premium over-ear wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality for music lovers.",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Smart Fitness Watch Series 5",
    description: "Advanced fitness tracker with heart-rate monitoring, built-in GPS, sleep analysis, and a bright AMOLED touchscreen display.",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    category: "Electronics",
    stock: 18,
  },
  {
    name: "Portable Bluetooth Speaker Pro",
    description: "Rugged waterproof portable speaker with 360-degree surround sound, rich bass, and 20 hours of continuous playback.",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80",
    category: "Electronics",
    stock: 30,
  },

  // Clothing
  {
    name: "Classic Organic Cotton Crewneck T-Shirt",
    description: "Ultra-soft 100% certified organic cotton t-shirt with a relaxed modern fit and pre-shrunk fabric for lasting comfort.",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    category: "Clothing",
    stock: 50,
  },
  {
    name: "Vintage Denim Jacket",
    description: "Timeless trucker-style denim jacket crafted from heavyweight durable denim with custom brass hardware.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
    category: "Clothing",
    stock: 20,
  },
  {
    name: "Slim Fit Stretch Chino Trousers",
    description: "Versatile stretch chinos designed for everyday comfort and refined style, featuring moisture-wicking cotton blend fabric.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=80",
    category: "Clothing",
    stock: 35,
  },

  // Shoes
  {
    name: "Breathable Performance Running Sneakers",
    description: "Lightweight running shoes engineered with responsive foam cushioning and a breathable engineered mesh upper.",
    price: 119.99,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    category: "Shoes",
    stock: 15,
  },
  {
    name: "Classic Canvas Low-Top Shoes",
    description: "Iconic casual canvas sneakers with vulcanized rubber sole and timeless silhouette that pairs with any outfit.",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80",
    category: "Shoes",
    stock: 40,
  },
  {
    name: "Premium Leather Chelsea Boots",
    description: "Handcrafted genuine leather boots with elastic side gussets, pull tabs, and durable non-slip rubber outsoles.",
    price: 159.99,
    imageUrl: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80",
    category: "Shoes",
    stock: 12,
  },

  // Accessories
  {
    name: "Minimalist Full-Grain Leather Bi-Fold Wallet",
    description: "Slim RFID-blocking wallet made from premium vegetable-tanned leather with 8 card slots and a currency sleeve.",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
    category: "Accessories",
    stock: 45,
  },
  {
    name: "Polarized Retro Sunglasses",
    description: "Classic unisex sunglasses with UV400 polarized lenses, anti-glare protection, and lightweight acetate frame.",
    price: 69.99,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    category: "Accessories",
    stock: 22,
  },
  {
    name: "Everyday Commuter Canvas Backpack",
    description: "Water-resistant canvas backpack with dedicated 15-inch padded laptop compartment and ergonomic shoulder straps.",
    price: 64.99,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    category: "Accessories",
    stock: 28,
  },

  // Home
  {
    name: "Ceramic Pour-Over Coffee Maker Set",
    description: "Artisanal ceramic dripper with heat-resistant borosilicate glass carafe for the ultimate handcrafted morning coffee.",
    price: 44.99,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    category: "Home",
    stock: 16,
  },
  {
    name: "Ultrasonic Aroma Essential Oil Diffuser",
    description: "Whisper-quiet cool mist diffuser with ambient LED lighting, timer settings, and auto shut-off safety feature.",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    category: "Home",
    stock: 32,
  },
  {
    name: "Woven Cotton Textured Throw Blanket",
    description: "Cozy 100% breathable woven cotton throw blanket featuring decorative fringe edges, perfect for sofa or bed.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
    category: "Home",
    stock: 20,
  },
];

async function seed() {
  console.log("🌱 Starting database seed...");

  // Clear existing products so the seed can be safely re-run
  const deleted = await prisma.product.deleteMany({});
  console.log(`Cleaned up ${deleted.count} existing products.`);

  for (const productData of sampleProducts) {
    const product = await prisma.product.create({
      data: productData,
    });
    console.log(`  ✓ Created product: ${product.name} [${product.category}] ($${product.price})`);
  }

  const total = await prisma.product.count();
  console.log(`\n✅ Database seed completed successfully! Total products: ${total}`);
}

seed()
  .catch((err) => {
    console.error("❌ Error while seeding database:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
