<?php
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    if (file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(['status' => 'success', 'message' => 'Data saved successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to write to file']);
    }
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data']);
}
?>
