# Collections for Telegram Torrent Bot

Contains the following roles:
- [Integration with Transmission](https://github.com/fertkir/tg-torrent-bot-node/tree/main/ansible/roles/transmission)

Example
----------------
### Install the collection:

```bash
ansible-galaxy collection install fertkir.tg_torrent_bot
```

### Playbook example

Fill in your telegram bot token (get it from [@BotFather](https://t.me/BotFather) telegram bot) and credentials for rutracker.org.

```yaml
- hosts: all
  roles:
    - role: fertkir.tg_torrent_bot.transmission
      vars:
        telegram_token: <your_telegram_token_here>
        rutracker_username: <rutracker_username>
        rutracker_password: <rutracker_password>
        transmission_settings: { 'rpc-whitelist-enabled': false, 'rpc-authentication-required': false }
```

For a full list of options, [check the docs of the role](https://github.com/fertkir/tg-torrent-bot-node/tree/main/ansible/roles/transmission).