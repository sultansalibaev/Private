<?php

return [
    #'class' => 'yii\db\Connection',

    'enableSchemaCache' => false,

    // Duration of schema cache.
    'schemaCacheDuration' => 3600,

    // Name of the cache component used to store schema information
    'schemaCache' => 'cache',
	'class' => 'kak\clickhouse\Connection',
        'dsn' => 'localhost',
        'port' => '8123',
    'database' => 'imas',  // use other database name
	'username' => 'default',
    'password' => 'jre57zehfjwh56',
    // Schema cache options (for production environment)
    //'enableSchemaCache' => true,
    //'schemaCacheDuration' => 60,
    //'schemaCache' => 'cache',
];
