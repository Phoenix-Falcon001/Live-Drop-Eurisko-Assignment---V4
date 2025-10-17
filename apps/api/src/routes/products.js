import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products - Get all products with optional search/filter
router.get('/', async (req, res) => {
  try {
    const { search, tag } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (tag) {
      query.tags = tag;
    }

    let products = await Product.find(query);

    // If no products in database, create demo products
    if (products.length === 0) {
      console.log('📦 Creating demo products...');
      
      const demoProducts = [
        {
          name: 'Wireless Bluetooth Headphones',
          description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life.',
          price: 199.99,
          category: 'Electronics',
          tags: ['audio', 'wireless', 'bluetooth', 'noise-cancelling'],
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          stock: 50
        },
        {
          name: 'Smartphone Pro',
          description: 'Latest smartphone with advanced triple camera system and all-day battery.',
          price: 999.99,
          category: 'Electronics',
          tags: ['mobile', 'smartphone', 'camera', '5g'],
          imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
          stock: 30
        },
        {
          name: 'Laptop Ultra',
          description: 'Thin and light laptop with high-performance processor and stunning display.',
          price: 1299.99,
          category: 'Electronics',
          tags: ['laptop', 'portable', 'work', 'gaming'],
          imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
          stock: 20
        },
        {
          name: 'Smart Watch Series X',
          description: 'Advanced smartwatch with health monitoring and GPS tracking.',
          price: 349.99,
          category: 'Wearables',
          tags: ['watch', 'fitness', 'health', 'smart'],
          imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
          stock: 75
        },
        {
          name: 'Tablet Mini',
          description: 'Compact tablet perfect for reading, browsing, and entertainment.',
          price: 449.99,
          category: 'Electronics',
          tags: ['tablet', 'portable', 'entertainment'],
          imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
          stock: 40
        },
        {
          name: 'Gaming Console Pro',
          description: 'Next-gen gaming console with 4K gaming and immersive experience.',
          price: 499.99,
          category: 'Gaming',
          tags: ['gaming', 'console', 'entertainment', '4k'],
          imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
          stock: 25
        }
      ];

      // Insert demo products
      products = await Product.insertMany(demoProducts);
      console.log(`✅ Created ${products.length} demo products`);
    }

    res.json({ products });
  } catch (error) {
    console.error('Products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;