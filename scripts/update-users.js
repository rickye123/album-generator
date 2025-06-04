const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

// Your DynamoDB table name (replace with your actual table name)
const listTable = 'List-nghmy3wjsra6rkbt7ijpvfrima-dev';
const albumTable = 'Album-nghmy3wjsra6rkbt7ijpvfrima-dev';
const albumListTable = 'AlbumList-nghmy3wjsra6rkbt7ijpvfrima-dev';
const listeningPileTable = 'ListeningPileEntry-nghmy3wjsra6rkbt7ijpvfrima-dev';

// Define your userId (set this to the current user's ID)
const userId = '26821204-3011-7063-4654-71ebaeba6dd8';

// Update function to set userId on existing items
const updateItems = async (tableName, keyName, userId) => {
    const params = {
        TableName: tableName,
    };

    try {
        // Scan to get all records
        const data = await docClient.scan(params).promise();
        const items = data.Items;

        for (let item of items) {
            // Add userId to each item
            const updateParams = {
                TableName: tableName,
                Key: { id: item.id }, // Use the primary key (e.g., id) to find the record
                UpdateExpression: 'set userId = :userId',
                ExpressionAttributeValues: {
                    ':userId': userId,
                },
            };

            await docClient.update(updateParams).promise();
            console.log(`Updated item with ID: ${item.id}`);
        }

    } catch (err) {
        console.error('Error updating items:', err);
    }
};

// Run updates for each table
const run = async () => {
    await updateItems(listTable, 'id', userId);
    await updateItems(albumTable, 'id', userId);
    await updateItems(albumListTable, 'id', userId);
    await updateItems(listeningPileTable, 'id', userId);
};

run().then(() => console.log('User ID update completed.'));
