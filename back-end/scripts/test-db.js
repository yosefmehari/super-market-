require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

async function testConnection() {
  console.log("🔍 Testing database connection with current .env configuration...\n");

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("❌ DATABASE_URL is not set in .env!");
    process.exit(1);
  }

  const maskedUrl = databaseUrl.replace(/:([^:@]+)@/, ":****@");
  console.log(`Connecting to: ${maskedUrl}\n`);

  const prisma = new PrismaClient();

  try {
    const result = await prisma.$queryRaw`SELECT 1 as connected, current_database() as database, version() as version;`;
    console.log("✅ Database connection SUCCESSFUL!");
    console.log("Database info:", result[0]);

    try {
      const count = await prisma.product.count();
      console.log(`Total products in database: ${count}`);
    } catch {
      console.log("ℹ️  Note: 'products' table has not been migrated yet on this database.");
      console.log("   Run 'npm run prisma:migrate' and 'npm run prisma:seed' to create and seed it.");
    }
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection FAILED!");
    console.error(`Error Code: ${error.code || "N/A"}`);
    if (error.message.includes("password authentication failed") || error.message.includes("not valid")) {
      console.error("\n👉 Root Cause: The database password in .env is incorrect.");
      console.error("   Please verify your Supabase database password in the Supabase Dashboard:");
      console.error("   Dashboard -> Project Settings -> Database -> Database password (or click Reset password).");
    } else if (error.message.includes("Can't reach database server")) {
      console.error("\n👉 Root Cause: Cannot reach database server.");
      console.error("   Ensure '?sslmode=require' is present and check if the Supabase project is active or paused.");
    } else {
      console.error(`Message: ${error.message}`);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
