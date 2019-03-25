# Speed Test

## Installation

Node.js is required. This can be installed with the following command:
`sudo apt-get install nodejs`

The repository can now be cloned.
`git clone https://github.com/igevi/speedtest.git`

Now we need to install the dependencies

`cd speedtest`

`npm install`

The speedtest script needs to be run at regular intervals to provide readings.
In future versions this will be converted into a `systemd` service however until this is implemented
crontab can be used.
The following script will take a reading every 30 minutes.
```bash
#!/bin/sh
while true
do
	node speedtest
	sleep 30m
done
```

`chmod +x script.sh`

The script can then be run in the background with

`./script.sh &`

The server can then be run in the background with

`node index &`

The Node.js/Express.js server is programmed to run on port 8080. This allows it to run without sudo privileges.
To access this on port 80, a simple iptables rule can be written if the device is Linux based.

`iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080`
