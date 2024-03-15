<?php
include('connection.php');


$task_id = $_POST['task_id'];
$updated_task_name = $_POST['updated_task_name'];
$updated_task_description = $_POST['updated_task_description'];

$query = $mysqli->prepare('UPDATE tasks SET task_name = ?, task_description = ? WHERE id = ?');
$query->bind_param('ssi', $updated_task_name, $updated_task_description, $task_id);

if ($query->execute()) {
    $response['status'] = "task_updated";
} else {
    $response['status'] = "task_update_failed";
}

echo json_encode($response);
