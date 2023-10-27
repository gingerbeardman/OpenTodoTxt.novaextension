function openSomething(todoargs) {
  if (!nova.workspace.path) {
    nova.workspace.showInformativeMessage(
      nova.localize("This workspace has no path.")
    );
    return;
  }

  var process = new Process("/usr/bin/open", {
    args: todoargs,
  });

  var lines = [];

  process.onStderr(function (data) {
    if (data) {
      lines.push(data);
    }
  });

  process.onDidExit(function (status) {
    if (status != 0) {
      nova.workspace.showInformativeMessage(
        nova.localize("Error launching app:") +
          "\n\n" +
          lines.join("")
      );
    }
  });

  process.start();
}
function openApp() {
    openSomething(["-a", nova.config.get("todo.app")])
}
function openBoth() {
    openSomething(["-a", nova.config.get("todo.app"), nova.workspace.path + "/done.txt", nova.workspace.path + "/todo.txt"])
}
function openTodo() {
    openSomething(["-a", nova.config.get("todo.app"), nova.workspace.path + "/todo.txt"])
}
function openDone() {
    openSomething(["-a", nova.config.get("todo.app"), nova.workspace.path + "/done.txt"])
}
module.exports = openApp;
module.exports = openBoth;
module.exports = openTodo;
module.exports = openDone;

exports.activate = function () {
  // Do work when the extension is activated
};

exports.deactivate = function () {
  // Clean up state before the extension is deactivated
};

nova.commands.register('todo.openApp', async () => {
  openApp();
});
nova.commands.register('todo.openBoth', async () => {
  openBoth();
});
nova.commands.register('todo.openTodo', async () => {
  openTodo();
});
nova.commands.register('todo.openDone', async () => {
  openDone();
});
