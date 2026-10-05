const http = require("http");
const app = require("../src/app");

async function runTests() {
  console.log("🧪 Running Comprehensive Backend API Tests...\n");

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  let passed = 0;
  let failed = 0;

  async function request(path) {
    const res = await fetch(`${baseUrl}${path}`);
    const data = await res.json();
    return { status: res.status, data };
  }

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    console.log("Test Group 1: Health Check");
    const health = await request("/api/health");
    assert(health.status === 200, "GET /api/health returns 200");
    assert(health.data.success === true, "GET /api/health success is true");

    // 2. Products listing
    console.log("\nTest Group 2: Product Listing & Pagination");
    const productsAll = await request("/api/products");
    assert(productsAll.status === 200, "GET /api/products returns 200");
    assert(productsAll.data.success === true, "GET /api/products returns success: true");
    assert(Array.isArray(productsAll.data.data), "GET /api/products data is an array");
    assert(productsAll.data.pagination.total === 15, `Total products is 15 (got ${productsAll.data.pagination.total})`);

    // 3. Pagination limit
    const paged = await request("/api/products?page=1&limit=5");
    assert(paged.status === 200, "GET /api/products?page=1&limit=5 returns 200");
    assert(paged.data.data.length === 5, `Limit 5 returns 5 products (got ${paged.data.data.length})`);
    assert(paged.data.pagination.totalPages === 3, "Total pages is 3 with limit 5");

    // 4. Search
    console.log("\nTest Group 3: Search Functionality");
    const searched = await request("/api/products?search=phone");
    assert(searched.status === 200, "GET /api/products?search=phone returns 200");
    assert(searched.data.data.length > 0, "Search 'phone' finds headphone products");
    assert(
      searched.data.data.every((p) => p.name.toLowerCase().includes("phone") || p.description.toLowerCase().includes("phone")),
      "All search results contain search term in name or description"
    );

    // 5. Category filter
    console.log("\nTest Group 4: Category Filtering");
    const electronics = await request("/api/products?category=Electronics");
    assert(electronics.status === 200, "GET /api/products?category=Electronics returns 200");
    assert(electronics.data.data.length === 3, `Found 3 electronics (got ${electronics.data.data.length})`);
    assert(electronics.data.data.every((p) => p.category === "Electronics"), "All returned items belong to 'Electronics'");

    // 6. Combined query
    console.log("\nTest Group 5: Combined Query (Search + Category)");
    const combined = await request("/api/products?search=phone&category=Electronics");
    assert(combined.status === 200, "GET /api/products?search=phone&category=Electronics returns 200");
    assert(combined.data.data.length >= 1, "Combined query returns matching products");
    assert(combined.data.data.every((p) => p.category === "Electronics"), "Combined result category is Electronics");

    // 7. Single Product - Existing
    console.log("\nTest Group 6: Single Product Retrieval");
    const sampleProduct = productsAll.data.data[0];
    const single = await request(`/api/products/${sampleProduct.id}`);
    assert(single.status === 200, `GET /api/products/:id returns 200 for ID ${sampleProduct.id}`);
    assert(single.data.success === true, "Single product returns success: true");
    assert(single.data.data.id === sampleProduct.id, "Returned product ID matches requested ID");
    assert(typeof single.data.data.price === "number", "Product price is numeric");

    // 8. Single Product - Non-existing ID
    console.log("\nTest Group 7: Error Cases");
    const notFound = await request("/api/products/non-existing-cuid-12345");
    assert(notFound.status === 404, "GET /api/products/non-existing-id returns 404");
    assert(notFound.data.success === false, "404 returns success: false");
    assert(notFound.data.message === "Product not found", "Returns proper 'Product not found' message");

    // 9. Invalid query parameters
    const invalidQuery = await request("/api/products?page=-1");
    assert(invalidQuery.status === 400, "GET /api/products?page=-1 returns 400");
    assert(invalidQuery.data.success === false, "Invalid query returns success: false");

    // 10. Unknown route
    const unknownRoute = await request("/api/unknown-endpoint");
    assert(unknownRoute.status === 404, "GET /api/unknown-endpoint returns 404");

    console.log(`\n========================================`);
    console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution error:", err);
    process.exit(1);
  } finally {
    server.close();
  }
}

runTests();
