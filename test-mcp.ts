const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");
const path = require('path');

async function runTest() {
  try {
    // Initialize transport
    const transport = new StdioClientTransport({
        command: "node",
        args: [path.join(process.env.APPDATA, 'npm', 'supabase-mcp.js')]
      });

console.log('Starting MCP client...');
    // Initialize MCP client
    const client = new Client(
      {
        name: "ppb-bolt-client",
        version: "1.0.0"
      },
      {
        capabilities: {
          resources: {
            schemes: ["projects", "schema", "table"]
          },
          tools: {
            names: ["add-project", "switch-project"]
          }
        }
      }
    );

    // Connect the client
    await client.connect(transport);
    console.log('Connected to MCP server');

    // Add the project to MCP
    await client.callTool({
      name: "add-project",
      arguments: {
        name: "ppb-bolt",
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
      }
    });
    console.log('Added Supabase project to MCP');

    // List available projects
    const projects = await client.readResource({ uri: "projects://list" });
    console.log('Available projects:', projects);

    // Get schema information
    const schema = await client.readResource({ uri: "schema://ppb-bolt/database" });
    console.log('Database schema:', schema);

    // Query topping_categories table
    const toppingCategories = await client.readResource({
      uri: "table://ppb-bolt/topping_categories/records"
    });
    console.log('Topping Categories:', toppingCategories);

  } catch (error) {
    console.error('Error:', error);
  }
}

runTest();