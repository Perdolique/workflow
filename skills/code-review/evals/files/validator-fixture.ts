interface Task {
  title: string;
}

const unusedLabel = 'task';

function formatTask(task: Task): string {
  return task.title.trim();
}

export function renderTask(task: Task): string {
  return formatTask(task);
}
