# Telegraf Fsub
This plugin can help you to force your bot users to subscribe your channel before using the bot.

### Installation
You can install this plugin any Telegraf Bot.

Install the NPM Plugin
```bash
npm i telegraf-fsub
#or
yarn add telegraf-fsub
```

Import and Use in code

```TS (Node)
import fsub from "telegraf-fsub"

const botFsub = fsub({ 
    channels : ["@channel"]
});
bot.use(botFsub)
```

### Advanced Installation
You can pass these options in bot like this
```TS (Node)
import fsub from "telegraf-fsub"

const botFsub = fsub({ 
    channels: [],
    notJoinedMessage: "Hello {user}, You Must Joined <b>{channel}</b>",
    enable_inline: true,
    parse_mode: "HTML"
});
bot.use(botFsub)
```

**Note** : channels option is required without that bot will crash

### Help
You can open a **Issue** for ressolving your problem

### Contribution
You can contribute to this plugin by just opening a pull request.
