# Speed Test

## Introduction

Speedtest is a utility to monitor internet speeds at regular intervals using [speedtest.net](https://speetest.net). 
This project utilizes the [speedtest.net API/CLI tool](https://www.npmjs.com/package/speedtest-net) for Node.js to perform the readings.
This data is then plotted on a [plot.ly](https://plot.ly/) chart hosted on an Express.js webserver running on the local machine.
This webserver can be set up anywhere, such as AWS, as it just displays the embedded plot.ly graph.  

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
a simple `Bash` script can be used, see script.sh.

The Node.js/Express.js server is programmed to run on port 8080. This allows it to run without sudo privileges.
To access this on port 80, a simple iptables rule can be written if the device is Linux based.

`iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080`

If you prefer docker
```
docker build . -t speedtest
docker run -it --env-file ./.env -p 8080:8080 speedtest
```

## Changelog

### [1.0] - 2019/03/22
- Created script to read internet speed data and format the response to plot on plot.ly graph.
- Created initial web interface which contains an embed of the plot.ly graph.

## To Do
- Automate deployment of script to make it run at regular intervals
- Create systemd service for speedtest
- Improve range of analytics beyond download/upload speeds

## License

Copyright 2019 igevi

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.