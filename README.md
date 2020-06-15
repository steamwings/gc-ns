# Green Curtain NativeScript
Green Curtain with Nativescript: Web, Android, and iOS

## Directories
The top-level (repo) directory is an additional level above the true project directory. `green-curtain` is the project directory, where most commands need to be run.

### green-curtain
contains most configuration files and will contain most untracked build folders like `platforms` and `hooks` for NativeScript and `node_modules` for npm.

### src/app
- **/home**: home module*
- **/modules**: smaller modules
- **/orgs**: orgs module*
- **/search**: search module*
- **/shared**: code shared between modules or outside any particular module

### src/assets
These files are automagically added to iOS and Android assets during build

