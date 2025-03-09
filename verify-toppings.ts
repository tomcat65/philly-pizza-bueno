import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function verifyToppings() {
    let transport: StdioClientTransport | null = null;
    let client: Client | null = null;

    try {
        console.log('Initializing transport...');
        transport = new StdioClientTransport({
            command: "node",
            args: ["C:/Users/TOMAS/coding/projects/ai_coding/supabase-multi-mcp/dist/server.js"],
            options: {
                debug: true,
                timeout: 30000
            }
        });
        console.log('Transport initialized');

        console.log('Creating MCP client...');
        client = new Client(
            { name: "ppb-bolt-client", version: "1.0.0" },
            {
                capabilities: {
                    tools: { 
                        names: ["add-project", "switch-project", "get-table-content"] 
                    }
                }
            }
        );
        console.log('MCP client created');

        console.log('Connecting to MCP server...');
        await client.connect(transport);
        console.log('Connected to MCP server successfully');

        // Add project if needed
        console.log('\nAdding project...');
        try {
            await client.callTool({
                name: "add-project",
                arguments: {
                    name: "ppb-bolt",
                    url: "https://spnqnrrpwcndcpklappc.supabase.co",
                    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbnFucnJwd2NuZGNwa2xhcHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MjE4NjIsImV4cCI6MjA1NDk5Nzg2Mn0.JjOXhNroOzGrB2otjSBgazebaZ0idysop6OWGNxSlLY"
                }
            });
            console.log('Project added successfully');
        } catch (addError) {
            console.log('Note: Project may already exist:', addError);
        }

        // Switch to project
        console.log('\nSwitching to project...');
        await client.callTool({
            name: "switch-project",
            arguments: {
                name: "ppb-bolt"
            }
        });
        console.log('Switched to project successfully');

        // Get all topping-related data
        console.log('\nFetching topping data...');
        
        // 1. Get topping categories
        console.log('\nFetching topping categories...');
        const categoriesResult = await client.callTool({
            name: "get-table-content",
            arguments: {
                projectName: "ppb-bolt",
                tableName: "topping_categories"
            }
        });
        console.log('Topping categories:', categoriesResult);

        // 2. Get toppings
        console.log('\nFetching toppings...');
        const toppingsResult = await client.callTool({
            name: "get-table-content",
            arguments: {
                projectName: "ppb-bolt",
                tableName: "toppings"
            }
        });
        console.log('Toppings:', toppingsResult);

        // 3. Get topping options
        console.log('\nFetching topping options...');
        const optionsResult = await client.callTool({
            name: "get-table-content",
            arguments: {
                projectName: "ppb-bolt",
                tableName: "topping_options"
            }
        });
        console.log('Topping options:', optionsResult);

        // 4. Get product topping availability
        console.log('\nFetching product topping availability...');
        const availabilityResult = await client.callTool({
            name: "get-table-content",
            arguments: {
                projectName: "ppb-bolt",
                tableName: "product_topping_availability"
            }
        });
        console.log('Product topping availability:', availabilityResult);

        // Organize the data
        const toppingData = {
            categories: categoriesResult,
            toppings: toppingsResult,
            options: optionsResult,
            availability: availabilityResult
        };

        console.log('\nComplete topping data:', JSON.stringify(toppingData, null, 2));

    } catch (error) {
        console.error('Error occurred:');
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Stack trace:', error.stack);
        } else {
            console.error('Unknown error:', error);
        }
    } finally {
        if (transport) {
            try {
                console.log('Closing transport...');
                await transport.close();
                console.log('Transport closed successfully');
            } catch (closeError) {
                console.error('Error closing transport:', closeError);
            }
        }
    }
}

verifyToppings(); 