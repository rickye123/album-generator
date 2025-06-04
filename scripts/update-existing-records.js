const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-2' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'Album-nghmy3wjsra6rkbt7ijpvfrima-dev';

const updateAllAlbums = async () => {
    const scanParams = {
        TableName: tableName,
    };

    let items;
    do {
        items = await dynamoDB.scan(scanParams).promise();

        for (const item of items.Items) {
            if (item.hideAlbum === undefined) {
                const updateParams = {
                    TableName: tableName,
                    Key: { id: item.id },
                    UpdateExpression: 'SET hideAlbum = :hideAlbum',
                    ExpressionAttributeValues: {
                        ':hideAlbum': false,
                    },
                };

                await dynamoDB.update(updateParams).promise();
            }
        }

        scanParams.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (items.LastEvaluatedKey);

    console.log('All albums updated successfully!');
};

updateAllAlbums().catch(console.error);
