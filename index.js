const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// التحقق من حالة الخدمة
app.get('/', (req, res) => {
  res.json({
    status: 'active',
    message: 'Instagram Followers API',
    endpoints: {
      getServices: '/api/services',
      getStats: '/api/stats',
      checkUsername: '/api/check/:username',
      simulateOrder: '/api/order (POST)'
    },
    version: '1.0.0'
  });
});

// جلب قائمة الخدمات المتاحة
app.get('/api/services', async (req, res) => {
  try {
    // محاكاة بيانات الخدمات
    const services = [
      {
        id: 1,
        name: "Instagram Followers - High Quality",
        description: "Real and active followers with profile pictures",
        price: "$0.99 per 100",
        deliveryTime: "24-48 hours",
        minOrder: 100,
        maxOrder: 10000,
        features: ["Real Profiles", "No Password Required", "Instant Start"]
      },
      {
        id: 2,
        name: "Instagram Likes - Premium",
        description: "High-quality likes from real accounts",
        price: "$0.49 per 100",
        deliveryTime: "1-2 hours",
        minOrder: 100,
        maxOrder: 5000,
        features: ["Fast Delivery", "Real Engagement", "Safe"]
      },
      {
        id: 3,
        name: "Instagram Views",
        description: "Increase your video views instantly",
        price: "$0.29 per 1000",
        deliveryTime: "Instant",
        minOrder: 1000,
        maxOrder: 50000,
        features: ["Instant Start", "High Retention", "All Countries"]
      }
    ];
    
    res.json({
      success: true,
      services: services,
      count: services.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// جلب إحصائيات الموقع
app.get('/api/stats', async (req, res) => {
  try {
    const stats = {
      totalOrders: Math.floor(Math.random() * 10000) + 5000,
      activeUsers: Math.floor(Math.random() * 5000) + 1000,
      followersDelivered: Math.floor(Math.random() * 1000000) + 500000,
      satisfactionRate: "98.5%",
      uptime: "99.9%"
    };
    
    res.json({
      success: true,
      stats: stats,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// التحقق من اسم المستخدم
app.get('/api/check/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    if (!username) {
      return res.status(400).json({
        success: false,
        error: "Username is required"
      });
    }
    
    // محاكاة التحقق من صحة اسم المستخدم
    const isValid = /^[a-zA-Z0-9._]{1,30}$/.test(username);
    
    res.json({
      success: true,
      username: username,
      isValid: isValid,
      message: isValid ? 
        "Username is valid and ready for order" : 
        "Invalid username format"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// محاكاة طلب جديد
app.post('/api/order', async (req, res) => {
  try {
    const { 
      username, 
      serviceId, 
      quantity, 
      email 
    } = req.body;
    
    if (!username || !serviceId || !quantity || !email) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }
    
    // إنشاء معرف فريد للطلب
    const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const order = {
      orderId: orderId,
      username: username,
      serviceId: serviceId,
      quantity: quantity,
      email: email,
      status: "processing",
      startTime: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      progress: 0
    };
    
    // محاكاة معالجة الطلب
    setTimeout(() => {
      // في التطبيق الحقيقي، هنا سيتم تحديث حالة الطلب
      console.log(`Order ${orderId} processed for ${username}`);
    }, 1000);
    
    res.json({
      success: true,
      message: "Order created successfully",
      order: order,
      nextSteps: [
        "Check your email for confirmation",
        "Order will start within 1-2 hours",
        "Track progress using order ID"
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// تتبع حالة الطلب
app.get('/api/track/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({
        success: false,
        error: "Order ID is required"
      });
    }
    
    // محاكاة بيانات التتبع
    const progress = Math.min(100, Math.floor(Math.random() * 100));
    
    res.json({
      success: true,
      orderId: orderId,
      status: progress < 100 ? "processing" : "completed",
      progress: progress,
      delivered: Math.floor(progress * 100 / 100), // حساب العدد الموصّل
      estimatedTimeRemaining: progress < 100 ? 
        `${Math.floor(Math.random() * 12) + 1} hours` : 
        "Completed",
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// صفحة 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found"
  });
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
});
