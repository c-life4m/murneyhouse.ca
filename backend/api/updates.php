<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

readfile(__DIR__ . '/../data/Updates.json');
