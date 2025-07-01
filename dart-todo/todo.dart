import 'dart:io';

void main() {
  List<String> todoList = [];

  while (true) {
    print('\n--- TO-DO LIST ---');
    print('\n welcome backk!')
    print('1. View tasks');
    print('2. Add task');
    print('3. Remove task');
    print('4. Exit');
    stdout.write('Choose an option: ');
    String? choice = stdin.readLineSync();

    switch (choice) {
      case '1':
        viewTasks(todoList);
        break;
      case '2':
        addTask(todoList);
        break;
      case '3':
        removeTask(todoList);
        break;
      case '4':
        print('Goodbye!');
        return;
      default:
        print('Invalid option. Try again.');
    }
  }
}

void viewTasks(List<String> tasks) {
  if (tasks.isEmpty) {
    print('No tasks yet!');
  } else {
    print('\nYour Tasks:');
    for (int i = 0; i < tasks.length; i++) {
      print('${i + 1}. ${tasks[i]}');
    }
  }
}

void addTask(List<String> tasks) {
  stdout.write('Enter a new task: ');
  String? task = stdin.readLineSync();
  if (task != null && task.trim().isNotEmpty) {
    tasks.add(task.trim());
    print('Task added!');
  } else {
    print('Task cannot be empty.');
  }
}

void removeTask(List<String> tasks) {
  viewTasks(tasks);
  if (tasks.isEmpty) return;

  stdout.write('Enter the task number to remove: ');
  String? input = stdin.readLineSync();
  int? index = int.tryParse(input ?? '');

  if (index != null && index > 0 && index <= tasks.length) {
    print('Removed: ${tasks.removeAt(index - 1)}');
  } else {
    print('Invalid task number.');
  }
}
