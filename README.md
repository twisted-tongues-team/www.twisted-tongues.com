# Static site at www.twisted-tongues.com

## Instructions for editing

For small changes (typos, text updates, etc), you can simply edit on github,
make a pull request, and once it's merged to `main` it will be deployed
automatically.

If you are doing more meaningful edits, you might want to set up a dev
environment. This should be a pretty standard vite environment, using NVM to
pin the node version.

This is approximately the command line workflow I use:

- Check out this repository to wherever you want it.
  `git clone git@github.com:twisted-tongues-team/www.twisted-tongues.com.git $DESTINATION_DIRECTORY`
- [Install nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- enter the directory `cd $DESTINATION_DIRECTORY`
- Ensure you are using the correct version of node: `nvm use` (this uses the node version we pin in .nvmrc)
- Install dependencies: `npm ci`
- Run dev server `npm run dev` (should print a URL you can open in your browser to see a preview)
- If you are proposing changes, prefer to do them in a branch `git checkout -b my_new_update`
- Edit whatever src file you want, it'll live update in the browser.
- When you are done `git add` / `git commit` whatever changes you have done and
  push them to github `git push origin my_new_update`. Make a pull request,
  send out for review or merge. The website is automatically deployed once a
  change is merged to `main` using github actions.
