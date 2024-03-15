<?php
include('connection.php');

$user_id = $_POST['user_id'];

$query = $mysqli->prepare('SELECT id, task_name, task_description FROM tasks WHERE user_id = ?');
$query->bind_param('i', $user_id);
$query->execute();
$query->store_result();
$query->bind_result($task_id, $task_name, $task_description);

$tasks = array();
while ($query->fetch()) {
    $task = array(
        'task_id' => $task_id,
        'task_name' => $task_name,
        'task_description' => $task_description
    );
    $tasks[] = $task;
}

if (!empty($tasks)) {
    $response['status'] = "tasks_found";
    $response['tasks'] = $tasks;
} else {
    $response['status'] = "no_tasks_found";
}

echo json_encode($response);
?>
