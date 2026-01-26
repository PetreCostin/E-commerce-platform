// Mock Inventory Management Service
// This simulates an external inventory management API

class InventoryService {
  constructor() {
    // Mock inventory data
    this.inventory = new Map();
  }

  // Check product availability
  async checkAvailability(productId, quantity) {
    // Simulate API delay
    await this.delay(100);

    const stock = this.inventory.get(productId) || { available: 1000 };
    
    return {
      productId,
      available: stock.available >= quantity,
      currentStock: stock.available,
      requested: quantity,
    };
  }

  // Reserve inventory
  async reserveInventory(productId, quantity) {
    await this.delay(100);

    const stock = this.inventory.get(productId) || { available: 1000, reserved: 0 };
    
    if (stock.available >= quantity) {
      stock.available -= quantity;
      stock.reserved += quantity;
      this.inventory.set(productId, stock);
      
      return {
        success: true,
        productId,
        reserved: quantity,
        remainingStock: stock.available,
      };
    }

    return {
      success: false,
      productId,
      message: 'Insufficient inventory',
      availableStock: stock.available,
    };
  }

  // Release reserved inventory
  async releaseInventory(productId, quantity) {
    await this.delay(100);

    const stock = this.inventory.get(productId) || { available: 1000, reserved: 0 };
    stock.available += quantity;
    stock.reserved = Math.max(0, stock.reserved - quantity);
    this.inventory.set(productId, stock);

    return {
      success: true,
      productId,
      released: quantity,
    };
  }

  // Update inventory levels
  async updateInventory(productId, quantity) {
    await this.delay(100);

    const stock = this.inventory.get(productId) || { available: 0, reserved: 0 };
    stock.available = quantity;
    this.inventory.set(productId, stock);

    return {
      success: true,
      productId,
      newStock: quantity,
    };
  }

  // Get inventory status
  async getInventoryStatus(productId) {
    await this.delay(50);

    const stock = this.inventory.get(productId) || { available: 1000, reserved: 0 };
    
    return {
      productId,
      available: stock.available,
      reserved: stock.reserved,
      total: stock.available + stock.reserved,
    };
  }

  // Simulate async delay
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
const inventoryService = new InventoryService();

module.exports = inventoryService;
