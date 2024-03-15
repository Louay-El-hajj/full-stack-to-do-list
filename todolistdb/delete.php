<?php
include('connection.php');

$task_id = $_POST['task_id'];

$query = $mysqli->prepare('DELETE FROM tasks WHERE id = ?');
$query->bind_param('i', $task_id);

if ($query->execute()) {
    $response['status'] = "task_deleted";
} else {
    $response['status'] = "task_deletion_failed";
}

echo json_encode($response);
