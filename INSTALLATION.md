### How to configure

This application requires configuration to adjust the time according to your place. So make sure the server time matches your local time reference.
Express has a dependency on moment.js to create the `today` time.

To change the time on your server, you can use the command.

`sudo timedatectl set-timezone Asia/Jakarta`

There is another easier way, which is to sync the server with the NTP server according to the geographical area.
You can use [https://ntppool.org](https://www.ntppool.org/en/) or if you are in Indonesia you can use [https://ntp.bmkg.go.id](https://ntp.bmkg.go.id)

After that you can start installing node packages with `yarn`,
create `.env` and generate secret access and refresh token,
and setup the Postgres database services.

On postgres database, you need enable `uuid-oosp` extensions
### Footnote

In my public API, i have deployed on AWS Lightsail and set the server time to **ASIA/JAKARTA (WIB) UTC+7**.
