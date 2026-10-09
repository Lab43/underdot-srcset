> [!IMPORTANT]
> Version 2 of `underdot-srcset` is developed in [Lab43/underdot](https://github.com/Lab43/underdot/tree/main/plugins/srcset#readme), alongside Underdot itself. This repository holds version 1 and is archived.

## Paths

Absolute paths (starting with a slash) should be written relative to the source directory. Let's say you're working on a page at `/source/about/team.ejs`. If you use ```<%- srcset('/images/header.jpg'); %>``` it will look for the image file `/source/images/header.jpg`.

Relative pths should be written relative to the current file. Again, let's say you're working on a page at `/source/about/team.ejs`. It you use ```<%- srcset('images/header.jpg'); %>``` it will look for the image file at `/source/about/images/header.jpg`.
