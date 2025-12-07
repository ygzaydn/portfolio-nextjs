# Tmux on Ubuntu

- [Tmux on Ubuntu](#tmux-on-ubuntu)
  - [Introduction to Tmux and Terminal Multiplexing](#introduction-to-tmux-and-terminal-multiplexing)
  - [Installing Tmux on Ubuntu](#installing-tmux-on-ubuntu)
  - [Starting and Managing Tmux Sessions](#starting-and-managing-tmux-sessions)
    - [Starting a New Session](#starting-a-new-session)
    - [Detaching and Reattaching Sessions](#detaching-and-reattaching-sessions)
    - [Naming and Organizing Sessions](#naming-and-organizing-sessions)
    - [Using Windows and Panes in Tmux](#using-windows-and-panes-in-tmux)
  - [Customizing Tmux](#customizing-tmux)
  - [Real-World Workflows with Tmux](#real-world-workflows-with-tmux)

## Introduction to Tmux and Terminal Multiplexing

Tmux is a **terminal multiplexer**, it lets you run multiple terminal sessions within a single window or remote shell. Instead of opening separate terminal windows or SSH connections for different tasks, you can use tmux to split one terminal into many panes and persist sessions in the background. This means you can start processes, detach from the terminal, and keep those processes running even if you disconnect or close your laptop. It's like having a window manager for your terminal, which is especially useful in remote workflows where reliability and multitasking are key.

**Why do you need tmux?** Here are some of the main benefits of using tmux in your development and server administration workflow:

- Persistent Sessions: You can keep your shell sessions running even after logging out or losing SSH connection. Long-running tasks (builds, scripts, etc.) continue working in tmux until you reattach.
- Multitasking with Panes: Tmux allows vertical and horizontal split-screen panes, so you can view and control multiple command-line tasks side by side in one window. For example, you might edit code in one pane while running tests or monitoring logs in another.
- Single SSH Connection: When working on a remote server, one SSH session with tmux can host multiple shells. You don’t need to open multiple SSH connections – tmux multiplexes them within one login.
- Organization: You can manage numerous tasks in an organized way – tmux sessions act like projects or contexts, each containing multiple windows and panes for related tasks. This beats a jumble of separate terminals and helps keep things structured.
- Customization and Efficiency: Tmux is highly configurable, allowing custom keybindings, color schemes, and behaviors to suit your needs. It’s also lighter on resources than opening many graphical terminal windows.

In summary, tmux is indispensable for anyone who works extensively in the terminal or over SSH. Next, we’ll walk through installing tmux on Ubuntu, then dive into usage examples and tips to boost your productivity.

## Installing Tmux on Ubuntu

Installing tmux on Ubuntu is straightforward since it’s available in the official package repositories. Follow these steps to get tmux set up:

- Update Package Lists: Open a terminal and update your package lists to ensure you get the latest version available. Use sudo to run as administrator:
  ```bash
  sudo apt update
  ```
  This fetches the latest package information for Ubuntu’s repositories.
- Install tmux: Now install the tmux package using APT:
  ```bash
  sudo apt install tmux
  ```
  Approve the installation when prompted. This will download and install tmux and any required dependencies.
- Verify the Installation (Optional): After installation, you can check that tmux is installed correctly by querying its version:
  ```bash
  tmux -V
  ```
  This should output tmux’s version number (for example, tmux 3.x). If you see a version, tmux is ready to use.

Tmux should be installed on your Ubuntu system after those steps. The next sections will show how to use tmux to manage terminal sessions.

## Starting and Managing Tmux Sessions

Once tmux is installed, you can start using it to create sessions that hold your work.

### Starting a New Session

To start a new tmux session, simply run the tmux command in your terminal:

```bash
tmux
```

This will launch tmux and put you inside a new session. You’ll notice a status bar appear at the bottom of the terminal with information like the session name, window number, and current time. By default, tmux names sessions numerically (0, 1, 2, …). If you prefer to assign a human-friendly name, you can do so when creating the session. For example:

```bash
tmux new -s mysession
```

This command starts a new tmux session named “mysession” instead of a numeric ID. Naming sessions is optional but highly recommended once you have multiple sessions, as it’s much easier to remember names than numbers.

**Tip:** You can list all active tmux sessions with:

```bash
tmux ls
```

This will display a list of sessions by name/ID along with how many windows each has, etc., which helps in managing and attaching to the correct session.

### Detaching and Reattaching Sessions

One of tmux’s most powerful features is the ability to **detach** from a session (leave it running in the background) and **reattach** later. This is what allows you to keep processes running after you disconnect.

- To detach from your current tmux session (i.e. leave it running and return to the normal shell), press the tmux prefix followed by d. By default, the prefix is `Ctrl+B`. So, hit `Ctrl+B`, then `D` (you don’t need to hold D, just press it after the prefix). Tmux will detach and you’ll get back to your regular shell prompt, while your session (and any processes in it) stays alive in the background. You can also detach by typing the command `tmux detach` from inside a tmux session.
- To reattach to a tmux session, use `tmux attach`. This will reattach to the most recently used session. If you have multiple sessions, specify the one you want by name or number, `tmux attach -t mysession`. This attaches to the session named “mysession” (or you could use its numeric ID). Once attached, your terminal returns to exactly where you left off in that tmux session, with all your windows and processes intact. This is incredibly useful for remote servers – for example, you can start a long job in tmux, detach, log out, and later reconnect via SSH and reattach to see the job’s progress.

Remember, detaching does not terminate the session or any processes inside it. Everything continues to run in the background. If you want to end a session (when your work is done), you can either:

- Inside tmux, type the `exit` command in each pane (closing the shells will eventually close the session when the last pane exits), or
- Use tmux command from outside to kill it, for example
  ```bash
  tmux kill-session -t mysession
  ```

If for some reason you want to kill all tmux sessions, you can stop the tmux server with:

```bash
tmux kill-server
```

> Be careful with that, as it will terminate everything in all sessions.

### Naming and Organizing Sessions

As mentioned, naming your sessions (with the `-s` flag or by renaming) is a best practice for keeping your tmux usage organized. When starting a session you can name it up front (tmux new -s name). If you started one without a name or want to change it, you can rename a session at any time. In a tmux session, press the prefix (`Ctrl+B` by default) and then `$`. This brings up a prompt to rename the current session – type a new name and hit Enter. Alternatively, from a regular shell you can run:

```bash
tmux rename-session -t old_name new_name
```

to rename a session by its current name or ID. For example:

```bash
tmux rename-session -t 0 server-maintenance
```

would rename session _0_ to _“server-maintenance”_. Having descriptive session names (like _webserver_, _database_, or _projectX_) makes it much easier to attach to the right session later and generally keeps you sane when juggling multiple tmux sessions. You can run multiple sessions simultaneously. If you are inside one session and want to start another, you could detach and run tmux new `-s` another, or from within tmux you can hit `Ctrl+B` then `:` to get a tmux command prompt and type new-session `-s` another. Tmux also provides a quick session switcher: press `Ctrl+B` then `s` to see a list of sessions and select one to switch to.

### Using Windows and Panes in Tmux

Within each tmux session, you can have multiple windows and each window can be split into multiple panes. This is how tmux lets you organize and view several terminal activities at once. A window in tmux is like a tab or a separate screen within the session. For example, you might have one window for editing code, another for running a development server, and another for logs. By default, when you start a session you’re in a window (typically numbered _0_) with one pane (taking up the whole screen). You can create new windows with the prefix command: press `Ctrl+B` then `C` to create a [C]reate new window. Each window will show up in the status bar with an index (0,1,2,…) and an optional name. You can switch windows with `Ctrl+B` + `N` (next) or `Ctrl+B` + `P` (previous), or directly by index (e.g. `Ctrl+B` + `0` for window 0). Renaming windows is also possible (to avoid all your windows just being named after the shell or command running). To rename the current window, press `Ctrl+B` then `,`, type a new name, and hit `Enter`.

Panes are subdivisions of a window. All panes in tmux are essentially independent terminal areas within the same window grid. Splitting your window into panes is where tmux really shines for multitasking. You can split a window two ways:

- Vertical split: Press `Ctrl+B` then `%` to split the current pane vertically into two panes side by side. This gives you a left and right pane.
- Horizontal split: Press `Ctrl+B` then `"` to split the current pane horizontally, into top and bottom panes.

Each pane is like a full terminal – you can run whatever commands or programs you want in each. You can keep splitting panes as needed (each new pane will share the space of the one you split). A tmux session with one window split into three panes (one on the left, two on the right). Each pane runs an independent shell. After splitting, you will see multiple panes on your screen, each with its own border. By default, the new pane will be active (your cursor goes there). To navigate between panes, use the prefix plus arrow keys: for example, `Ctrl+B` + `right-arrow` moves to the pane on the right, `Ctrl+B` + `up-arrow` to the pane above, etc. A quick way to switch panes is `Ctrl+B` then `O` which cycles to the next pane, and Ctrl+B then ; which toggles to the previous pane.

The active pane is usually highlighted with a different colored border. You can also resize panes if needed. One method is to hold the prefix and press `Ctrl` + an `arrow key` (e.g. Ctrl+B then hold Ctrl and press →) to nudge a pane boundary in that direction, one cell at a time. This allows you to give one pane more space or another less. (Ensure you’re in the pane you want to resize relative to.) To close a pane, you can simply terminate the shell in that pane. For instance, type exit or hit Ctrl+D inside a pane to close it. If that was the last pane in a window, the window will close as well. Tmux also has a shortcut `Ctrl+B` + `X` which will prompt you to confirm closing the pane (this is safer to avoid accidents).

Closing panes or windows will not affect other panes/windows – they continue running unless no panes remain. Using windows and panes effectively allows you to monitor and interact with multiple things at once. For example, you could have one window with several panes tailing different log files, and another window where you run commands or an interactive shell. Or in a development session, one pane could run a text editor, another runs your app server, and another runs tests. All of this in one SSH connection or one terminal window!

## Customizing Tmux

Tmux is very customizable. By editing a configuration file, you can change key bindings, enable features like mouse support, set default behaviors, and even theme the status bar. On Ubuntu (and any Unix-like system), tmux will look for a user configuration file at `~/.tmux.conf` each time it starts. You can create this file in your home directory to override tmux’s defaults or add your own settings. For system-wide settings (affecting all users), there is also a global config at /etc/tmux.conf, but most users will only need to edit their personal `~/.tmux.conf`. To get started, open `~/.tmux.conf` in your favorite text editor (it might not exist yet – create it if needed). Here are a few common customizations that intermediate users often add:

- Remap the prefix from Ctrl+B to Ctrl+A (easier to reach):
  ```
  unbind C-b
  set -g prefix C-a
  bind-key C-a send-prefix
  ```
- Enable mouse support for switching panes/windows and scrolling:
  ```
  set -g mouse on
  ```
- Start window and pane indices at 1 (more intuitive than starting at 0):
  ```
  set -g base-index 1
  set -g pane-base-index 1
  ```

These are just a few examples. You can customize tmux’s appearance (colors, status bar content), behavior (e.g., change timeout for key sequences), and add advanced features via plugins. After editing the config file, apply changes by restarting tmux or by reloading the file. To reload without closing sessions, you can press `Ctrl+B` + `:` to get a command prompt and type `source-file ~/.tmux.conf` to load new settings on the fly. For deeper customization, check out tmux’s manual (man tmux) or community examples. Over time, you can tailor your `~/.tmux.conf` to create a truly powerful terminal environment. Common enhancements include using plugins like the Tmux Plugin Manager (TPM) to add features (for example, a plugin to synchronize panes, or one to restore sessions after reboot). These are more advanced, but keep them in mind as you grow with tmux.

## Real-World Workflows with Tmux

Tmux shines in various real-world use cases. Here are a few scenarios where tmux can boost your productivity and comfort:

- Remote Development: When working on a remote server (via SSH), tmux is a lifesaver. You can open a tmux session on the server and start multiple windows/panes for your tasks. For example, you might have one pane running an editor (like Vim) editing your code, another running your application or server, and a third tailing a log file. All these run in one SSH session. If your network connection drops, no worries – the tmux session (and your work) persists on the server. Just SSH back in and run tmux attach to pick up right where you left off. This makes remote work much more robust against disconnections and enables you to work on several aspects of a project at once without juggling SSH windows.
- Long-Running Processes: For any lengthy process or command, tmux allows you to “fire and forget.” For instance, say you start a database backup or a machine learning training script that will take hours. Run it inside a tmux session on your server (or even your local machine), and you can detach from that session and close your laptop or terminal. The process will continue running in tmux. Later, reattach to see the output or results. This is safer than leaving a normal SSH session open or using nohup, and you also have the benefit of being able to see live output whenever you reconnect. System administrators also use this for running updates or maintenance scripts overnight – start them in tmux and let them run to completion while you’re offline.
- Server Monitoring and Tailing Logs: Tmux is great for keeping an eye on multiple things at once. You can split a window into several panes and run monitoring tools in each. For example, in one pane run top or htop to watch system resource usage, in another pane tail a log file (tail -f /var/log/...), and in a third pane run a shell for interactive commands. This all-in-one dashboard view is possible thanks to tmux’s splits. You might also create multiple windows within the session for different sets of tasks (one window for system logs, another for application logs, another for interactive shell). This kind of setup is extremely useful when troubleshooting an issue – everything you need is on one screen, updated in real time.
- Pair Programming or Collaboration: An often-overlooked feature of tmux is that multiple users can attach to the same session. If you share a user account or have permission, a colleague can attach to your tmux session from another SSH login and you’ll both see the same terminal output and can even share control. This is useful for remote pair programming or joint server debugging sessions. Essentially, tmux can serve as a terminal sharing tool. (For security, you might create a separate user or restrict what that session can access, but it’s a neat feature for collaboration.)

These examples are just the beginning – basically any time you need to run multiple terminal tasks or ensure something stays running, tmux is the answer. It’s a versatile tool that adapts to many workflows.

Tmux on Ubuntu can dramatically improve your command-line productivity. With installation and the basics covered, you’re ready to create resilient terminal sessions, multiplex your windows, and never lose a running process to a dropped connection again.
