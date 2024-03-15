<?php
include('connection.php');

$task_name = $_POST['task_name'];
$task_description = $_POST['task_description'];
$user_id = $_POST['user_id']; 

$query = $mysqli->prepare('INSERT INTO tasks (task_name, task_description, user_id) VALUES (?, ?, ?)');
$query->bind_param('ssi', $task_name, $task_description, $user_id);

if ($query->execute()) {
    $response['status'] = "task_created";
    $response['task_id'] = $mysqli->insert_id;
} else {
    $response['status'] = "task_creation_failed";
}

echo json_encode($response);
