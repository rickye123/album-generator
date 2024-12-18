const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-2' });

const dynamoDB = new AWS.DynamoDB();

async function fetchAllItems() {
    const scanResponse = await dynamoDB.scan({
        TableName: 'AlbumList-nghmy3wjsra6rkbt7ijpvfrima-dev'
    }).promise();

    const itemsToDelete = scanResponse.Items.map(item => ({
        DeleteRequest: {
            Key: { id: { S : item.id.S } }
        }
    }));

    return itemsToDelete;
}

async function deleteItemsInBatch(items) {
    const request = {
        RequestItems: {
            'AlbumList-nghmy3wjsra6rkbt7ijpvfrima-dev': items,
        }
    };

    try {
        const response = await dynamoDB.batchWriteItem(request).promise();
        console.log('Delete success', response);
    } catch (error) {
        console.error('Error performing batch delete:', error);
    }
}

(async () => {
    try {
        const items = await fetchAllItems();
        console.log(`Found ${items.length} items to delete`);
        await deleteItemsInBatch(items);
    } catch (error) {
        console.error('Error clearing table', error);
    }
})();