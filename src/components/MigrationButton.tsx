import React, { useState } from 'react';
import { migrateExistingLists, checkMigrationNeeded } from '../utils/migrateLists';

const MigrationButton: React.FC = () => {
    const [migrating, setMigrating] = useState(false);
    const [result, setResult] = useState<string>('');

    const handleMigration = async () => {
        setMigrating(true);
        setResult('');

        try {
            const needsMigration = await checkMigrationNeeded();

            if (!needsMigration) {
                setResult('No migration needed. All lists already have the required fields.');
                return;
            }

            const migrationResult = await migrateExistingLists();

            if (migrationResult.success) {
                setResult(`Migration successful! Updated ${migrationResult.migratedCount} lists.`);
            } else {
                setResult(`Migration failed: ${migrationResult.error}`);
            }
        } catch (error) {
            setResult(`Migration error: ${error}`);
        } finally {
            setMigrating(false);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px' }}>
            <h3>Database Migration</h3>
            <p>This will add default values for sharing fields to existing collections.</p>
            <button
                onClick={handleMigration}
                disabled={migrating}
                style={{
                    padding: '10px 20px',
                    backgroundColor: migrating ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: migrating ? 'not-allowed' : 'pointer'
                }}
            >
                {migrating ? 'Migrating...' : 'Run Migration'}
            </button>
            {result && (
                <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: result.includes('successful') ? '#d4edda' : '#f8d7da',
                    border: `1px solid ${result.includes('successful') ? '#c3e6cb' : '#f5c6cb'}`,
                    borderRadius: '4px'
                }}>
                    {result}
                </div>
            )}
        </div>
    );
};

export default MigrationButton;